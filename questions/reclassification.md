**Question Reclassification**

This file records how the previous mixed question bank was interpreted and cleaned against the official `SWE-OPS` syllabus pasted in the chat.

Active final themes:

1. `SWE1` Kvalita kódu
2. `SWE2` Softwarové inženýrství
3. `SWE3` Databáze
4. `SWE4` Počítačové sítě
5. `SWE5` Distribuované systémy
6. `OPS1` Vývoj a nasazení softwarových systémů
7. `OPS2` Bezpečná infrastruktura
8. `OPS3` Cloud computing
9. `OPS4` Operační systémy
10. `OPS5` NoSQL databáze

**SWE1_kvalita_kodu.txt**

- `1-37`: kept in `SWE1`
- `38 QoS`: dropped from `SWE1` as off-theme
- `39 loose coupling`: kept, but rewritten toward maintainability
- `40-41 penetrační testování`: moved conceptually to `OPS2`
- `42 výkonnostní testování`: merged into the existing performance-testing question

**SWE2_softwarove_inzenyrstvi.txt**

- `1-27`: kept in `SWE2`
- `28-30`: moved conceptually to `OPS1`
- `31-48`: moved conceptually to `SWE3`
- `49-80`: moved conceptually to `SWE4`
- `81-95`: moved conceptually to `SWE5`
- `96-118`: moved conceptually to `OPS1` or `OPS3` depending on cloud vs deployment focus
- `119-130`: moved conceptually to `OPS4`
- `131-138`: moved conceptually to `OPS2`
- `139-155`: dropped as out-of-scope for the pasted `SWE-OPS` syllabus
- `156-162`: moved conceptually to `OPS1` or `SWE5` depending on architecture focus

**SWE3_databaze.txt**

- All live questions kept in `SWE3`
- Questions were tightened to better reflect the syllabus wording

**SWE4_pocitacove_site.txt**

- Network core kept in `SWE4`
- Detailed protocol list questions were merged into more general routing/protocol questions
- Added explicit high-speed-network coverage to match the syllabus
- Security-related examples were kept only as practical network examples, not as an infrastructure-security replacement

**SWE5_distribuovane_systemy.txt**

- Core distributed-systems questions kept in `SWE5`
- CAP/BASE/sharding-heavy framing was reduced
- Focus was tightened toward centralization vs distribution, replication, data sharing, SOA, web services, and practical technologies

**OPS1_vyvoj_a_nasazeni.txt**

- Kept as `OPS1`
- ORM, persistence, CI/CD, deployment strategies, environments, IaC, and release flow remain here

**OPS2_bezpecna_infrastruktura.txt**

- Kept as `OPS2`
- Infrastructure-level security, network security, vulnerability detection, pentesting, incident analysis, identity, and access control remain here
- Code-level secure-coding questions were not added here

**OPS3_cloud_computing.txt**

- Kept as `OPS3`
- Vendor-specific cloud wording was reduced in favor of syllabus-level service/storage/design questions

**OPS4_operacni_systemy.txt**

- Kept as `OPS4`
- UNIX and Windows administration, kernel, memory, devices, processes, files, I/O, and scripting remain here

**OPS5_nosql_databaze.txt**

- Kept as `OPS5`
- Focus narrowed to taxonomy, consistency, distributed DB context, major NoSQL families, and practical use cases
