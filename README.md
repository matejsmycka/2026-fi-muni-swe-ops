# SWE OPS 2026 FI MU

Flashcards pro přípravu na státnice N‑SWE OPS.

PRs jsou vítány, za správnost neručím.

## Online

[https://matejsmycka.github.io/2026-fi-muni-swe-ops/](https://matejsmycka.github.io/2026-fi-muni-swe-ops/)

## Lokálně

Stačí otevřít `questions/index.html` v prohlížeči — vše je vloženo přímo v HTML.

## Jak to funguje

- 10 témat (SWE1–SWE5, OPS1–OPS5) po 18–38 otázkách = celkem **264 otázek**
- Kliknutím na kartu / klávesou `F` / mezerníkem **překlopíš** otázku na odpověď
- `→`/`↓` další, `←`/`↑` předchozí, `R` označit jako vyřešenou, `M` označit pro pozdější review, `S` zamíchat
- Zatím jsou vyplněny jen odpovědi pro **SWE1 (Kvalita kódu)** a **SWE2 (Softwarové inženýrství)**

## Struktura

```
.
├── .github/workflows/pages.yml
├── index.html                              → přesměrování na /questions/
├── questions/
│   ├── index.html                          → self-contained flashcards
│   └── topics/
│       ├── SWE1_kvalita_kodu.txt           → otázky
│       ├── ...
│       └── answers/
│           ├── SWE1_kvalita_kodu.txt       → odpovědi
│           └── ...
└── README.md
```

## Přidání odpovědí

Uprav `questions/topics/answers/<téma>.txt`. Každý řádek = jedna odpověď. \
Pro zalomení řádku uvnitř odpovědi použij `\n` (na kartě se pak zobrazí jako `<br>`).

Např.:
```
Atributy: performance, maintainability, reliability\nKonflikty:\n• Performance vs Security – šifrování zpomaluje
```

Spusť:
```bash
python3 rebuild.py
```
