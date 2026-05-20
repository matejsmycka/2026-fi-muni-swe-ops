#!/usr/bin/env python3
"""Rebuild questions/index.html with embedded question + answer data from topics/ dirs."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TOPICS_DIR = ROOT / "questions" / "topics"
ANSWERS_DIR = TOPICS_DIR / "answers"
INDEX = ROOT / "questions" / "index.html"

TOPIC_FILES = [
    "SWE1_kvalita_kodu.txt", "SWE2_softwarove_inzenyrstvi.txt",
    "SWE3_databaze.txt", "SWE4_pocitacove_site.txt",
    "SWE5_distribuovane_systemy.txt", "OPS1_vyvoj_a_nasazeni.txt",
    "OPS2_bezpecna_infrastruktura.txt", "OPS3_cloud_computing.txt",
    "OPS4_operacni_systemy.txt", "OPS5_nosql_databaze.txt",
]

data = []
for i, f in enumerate(TOPIC_FILES):
    questions = [
        l.strip() for l in (TOPICS_DIR / f).read_text("utf-8").split("\n") if l.strip()
    ]
    try:
        answers = [
            l.strip() for l in (ANSWERS_DIR / f).read_text("utf-8").split("\n") if l.strip()
        ]
    except FileNotFoundError:
        answers = ["No answer available yet."] * len(questions)
    while len(answers) < len(questions):
        answers.append("No answer available yet.")
    answers = answers[:len(questions)]
    data.append({"i": i, "q": questions, "a": answers})

lines = ["const EMBEDDED_DATA = ["]
for entry in data:
    q_json = json.dumps(entry["q"], ensure_ascii=False)
    a_json = json.dumps(entry["a"], ensure_ascii=False)
    lines.append(f"  {{i:{entry['i']},q:{q_json},a:{a_json}}},")
lines.append("];")
data_block = "\n" + "\n".join(lines) + "\n"

html = INDEX.read_text("utf-8")

marker = "let questions=[], answers=[], reviewed={}, marked={}, flipped={}, cursor=0;"
html = re.sub(r"const EMBEDDED_DATA = \[.*?\n\];", "", html, flags=re.DOTALL)
html = html.replace(marker, marker + data_block)

INDEX.write_text(html, "utf-8")
print(f"Written {len(html)} bytes to {INDEX}")
