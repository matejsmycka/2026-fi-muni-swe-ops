# Softwarové inženýrství — odpovědi

## 1. Co je softwarové inženýrství a čím se liší od samotného programování?
- Inženýrský obor – systematický přístup k vývoji, provozu, údržbě a náhradě SW
- Programování = psaní kódu
- SW inženýrství = analýza → návrh → implementace → testování → nasazení → údržba
- Zahrnuje dokumentaci, řízení týmu, procesy, komunikaci se zákazníkem
- Chybí jednotná teorie – spíše kolekce osvědčených technik

## 2. Jaké jsou fáze životního cyklu softwaru a jaké výstupy typicky vznikají v jednotlivých fázích?
- Analýza – specifikace požadavků (funkční/nefunkční)
- Návrh – SW architektura, UML diagramy (class, sequence, deployment)
- Implementace – zdrojový kód, unit testy
- Testování – test reporty, bug reporty, certifikace
- Nasazení/údržba – provozní dokumentace, manuály, monitoring

## 3. Jaké existují modely životního cyklu softwaru a kdy se který hodí?
- Waterfall – malé projekty, jasné požadavky, žádné změny
- Inkrementální – velké projekty, poměrně jasné požadavky, postupné dodávky
- Prototyp – menší projekty, nejasné požadavky, průzkum možností
- Výzkumník – trial & error, nejasné požadavky, jen business cíl (např. F1 auto)
- Spirálový – iterativní + inkrementální, silný důraz na analýzu rizik
- Reuse-oriented – maximální využití "off the shelf" modulů

## 4. Co je waterfall model a kdy může být pořád rozumná volba?
- Striktně sekvenční: analýza → návrh → implementace → testování → nasazení
- Nelze se vracet – fáze se nepřekrývají
- Vhodné pro: malé projekty, fixní požadavky, jednoduché systémy
- Výhody: jednoduchý, nízký management overhead, promyšlený design
- Nevýhody: pozdní odhalení chyb = drahé, zákazník dlouho nic nevidí

## 5. Co je inkrementální model vývoje a jaké má výhody oproti waterfallu?
- Vývoj po verzích (inkrementech), každý inkrement je samostatný vodopád
- Každý inkrement nabaluje funkcionalitu
- Výhody oproti waterfallu:
  - Rychlejší nasazení, viditelnost
  - Lepší reakce na změny
  - Dokumentace v menších celcích
  - Zákazník dříve vidí výsledky
- Nevýhody: větší management overhead, riziko nárůstu požadavků

## 6. Co je iterativní vývoj a jak se liší od inkrementálního?
- Iterativní = opakované vylepšování (přepisování/refaktoring) existujícího
- Inkrementální = postupné přidávání nové funkcionality
- Často kombinovány: iterativní-inkrementální (např. UP, Scrum)
- Při iteraci se vrátím a vylepším to, co už existuje
- Při inkrementu přidám novou funkcionalitu

## 7. Co je spirálový model vývoje a proč je silně navázaný na řízení rizik?
- Iterativní + inkrementální proces ve tvaru spirály
- Každý cyklus spirály:
  - Plánování (requirements, lifecycle, development, test plans)
  - Analýza (sběr požadavků)
  - Evaluace alternativ, analýza rizik (risk management), tvorba prototypu
  - Vývoj (koncept → design → detail)
- Risk management je jádrem modelu – každá iterace vyhodnocuje rizika
- Rizika se identifikují a mitigují před pokračováním v cyklu

## 8. Co je Unified Process (UP)?
- Framework SW vývojového procesu – prediktivní (tradiční) přístup
- Iterativní a inkrementální
- Produkt firmy Rational Software (později IBM)
- 4 fáze: Inception → Elaboration → Construction → Transition
- 6 procesů v iteraci: Business modeling, Requirements, Analysis & Design, Implementation, Test, Deployment
- Používá UML: class, use case, activity, sequence, deployment diagramy
- Vhodné: definované požadavky na začátku, potřeba kontroly, fixní rozpočet/čas

## 9. Co je Rational Unified Process (RUP)?
- Komerční implementace UP frameworku od Rational Software (IBM)
- Jde více do hloubky: přesně definuje kdo, co, kdy, jak
- Rozšiřuje UP o: Configuration & Change management, Environment, Project management
- Později evolvován do agilního OpenUP

## 10. Jaké jsou fáze RUP?
- Inception – feasibility study, business case, identifikace rizik, počáteční požadavky
- Elaboration – architektonický základ, všechny požadavky, UML modely, use case diagramy
- Construction – dokončení designu, programování, testování
- Transition – oprava chyb, manuály, dokumentace, školení, handover, release
- Každá fáze = 1+ iterací (max 3 měsíce na iteraci)
- Inkrement = rozdíl mezi dvěma iteracemi

## 11. Jaké role, artefakty a činnosti jsou typické pro jednotlivé fáze RUP?
- Role: architekti (Elaboration), vývojáři (Construction), testeři (Construction/Transition), manažeři (všechny fáze), stakeholder (Inception/Transition)
- Artefakty:
  - Inception: vision document, business case, risk list
  - Elaboration: UML diagramy (class, sequence, use case), architektonický model
  - Construction: zdrojový kód, unit testy, deployment diagram
  - Transition: manuály, release notes, dokumentace
- Činnosti: business modeling, requirements, analysis & design, implementation, test, deployment (každá iterace)

## 12. Co je agilní vývoj softwaru a jaké problémy se snaží řešit?
- Flexibilní přístup založený na řízení lidských zdrojů
- Reaguje na změny požadavků během vývoje (change management)
- Řeší problémy:
  - Neschopnost reagovat na měnící se požadavky
  - Pozdní objevení chyb (včasná zpětná vazba)
  - Zákazník dlouho nevidí výsledky
- Čas a zdroje fixní, mění se funkcionalita (opak prediktivního)
- Minimum plánování napřed, iterativní-inkrementální vývoj
- Důraz na komunikaci se zákazníkem, fungující SW > dokumentace

## 13. Jaké jsou principy agilního vývoje?
- Jednotlivci a interakce před procesy a nástroji
- Fungující software před vyčerpávající dokumentací
- Spolupráce se zákazníkem před vyjednáváním o smlouvě
- Reagování na změny před dodržováním plánu

## 14. Jaké existují agilní metodiky?
- SCRUM – nejpoužívanější, sprinty, 3 role, 5 událostí, 3 artefakty
- Extreme Programming (XP) – extrémní revidování, párové programování, TDD, neustálý refaktoring
- Feature Driven Development (FDD) – vývoj po malých kouscích, 5 fází (3 sekvenční, 2 iterativní)
- Test Driven Development (TDD) – Red-Green-Refactor cyklus, testy jako hlavní fáze vývoje

## 15. Jak funguje Scrum v praxi?
- Založen na "The Scrum Guide" (19 stran, striktní pravidla)
- Fixní délka sprintů (max 1 měsíc)
- 5 událostí:
  - Sprint – vývojový cyklus
  - Sprint Planning – 8h plánování
  - Daily Scrum – denní synchronizace
  - Sprint Review – 4h kontrola inkrementu
  - Sprint Retrospective – 3h zhodnocení procesu
- Planning poker s Fibonacciho čísly pro odhad story pointů

## 16. Jaké role existují ve Scrumu?
- Product Owner – zastupuje stakeholdery, spravuje Product Backlog
- Scrum Master – řídí proces, odstraňuje překážky, chrání tým
- Team of Developers – udržuje a implementuje Sprint Backlog

## 17. Kdo je Product Owner?
- Zástupce stakeholderů/zákazníka
- Vytváří a prioritizuje Product Backlog
- Definuje user stories
- Rozhoduje o funkcionalitě, hodnotě a prioritách
- Není manažer týmu – neřídí jak tým pracuje

## 18. Kdo je Scrum Master?
- Facilitátor Scrum procesu
- Odstraňuje impedimenty (překážky)
- Chrání tým před vnějšími rušivými vlivy
- Koučuje tým v agilních principech
- Není Project Manager – nerozděluje úkoly, nepřebírá odpovědnost za výsledek

## 19. Co je sprint?
- Časový box (max 1 měsíc) pro dokončení definované práce
- Výstup: Product Increment (potenciálně nasaditelný)
- Začíná Sprint Planningem, končí Sprint Review + Retrospective
- Během sprintu: Daily Scrum, implementace Sprint Backlogu
- Sprint nelze prodlužovat – pokud se nestíhá, redukuje se scope

## 20. Co je product backlog?
- Seznam všeho, co má být v produktu implementováno
- Spravován Product Ownerem, prioritizován podle business value
- Skládá se z user stories, ohodnoceno story pointy
- Živý dokument – průběžně se aktualizuje a reprioritizuje
- Product Owner zodpovídá za jeho obsah a pořadí

## 21. Co je sprint backlog?
- Podmnožina Product Backlogu vybraná pro aktuální sprint
- Vytváří se na Sprint Planningu
- Vlastní tým developerů
- Definuje: co se udělá (sprint goal), jak se to udělá (tasks)

## 22. Co jsou user stories a jak poznáte, že jsou napsané špatně?
- Krátký popis funkcionality z pohledu uživatele: "Jako [role] chci [funkce] abych [důvod]"
- Špatně napsané:
  - Příliš vágní, nelze odhadnout effort
  - Technické detaily místo potřeb uživatele
  - Chybí business value (proč)
  - Příliš velké (epic) – nezapadnou do sprintu
  - Nepřijatelné – chybí acceptance criteria
- Dobré: INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable)

## 23. Jak se liší iterativní a inkrementální vývoj?
- Iterativní – vylepšování existujícího, přepracování na základě zpětné vazby
- Inkrementální – postupné přidávání nových částí systému
- Iterace = dělám to lépe, inkrement = dělám toho víc
- UP i Scrum kombinují obojí (každý sprint/iterace = inkrement + možnost iterace)

## 24. Jak se liší agilní a prediktivní metodiky na konkrétním projektu?
- Prediktivní (vodopád, UP):
  - Příklad: jaderná elektrárna
  - Fixní funkcionalita, mění se čas a zdroje
  - Důkladné plánování napřed, dokumentace, UML
  - Formální schvalovací procesy, change requests
- Agilní (Scrum, XP):
  - Příklad: e-shop, podnikový IS
  - Fixní čas a zdroje, mění se funkcionalita
  - Minimální plánování napřed, průběžná komunikace
  - Uživatel vidí výsledky brzy, časté dodávky

## 25. Jaká je role komunikace v softwarovém vývoji a co se pokazí, když nefunguje?
- Komunikace je klíčová v agilních metodikách (daily scrum, review, retro)
- Problémy selhávající komunikace:
  - Nepřesné pochopení požadavků
  - Duplicitní práce
  - Nekoordinovaná práce v týmu
  - Frustrace zákazníka (nevidí co dostane)
  - Neschopnost reagovat na změny
- Agile Manifesto: "spolupráce se zákazníkem před vyjednáváním o smlouvě"

## 26. Co znamená nasazení a provoz softwarových systémů z pohledu životního cyklu?
- Nasazení (deployment) – přechod z vývoje do provozu
- Prostředí: Development → Test → Staging → Production
- CI/CD: automatizované testování (CI) + automatické nasazení (CD)
- Technologie: Docker, Kubernetes/OpenShift, Ansible, Jenkins, GitLab CI, GitHub Actions
- Po nasazení: monitoring (heartbeat), logging, change management, školení, support

## 27. Co je údržba softwarových systémů?
- Modifikace nasazeného SW po předání zákazníkovi
- Účel: oprava chyb, zvýšení výkonu, přizpůsobení změnám
- Může ji dělat jiný tým než vývojový
- Samostatná smlouva a cena od vývoje
- Fáze životního cyklu s nejdelším trváním

## 28. Jaké existují typy údržby softwaru?
- Korektivní – oprava chyb a defektů
- Adaptivní – přizpůsobení změněnému prostředí (OS, HW, legislativa)
- Perfektní (zdokonalovací) – zvýšení výkonu, lepší UX, refaktoring
- Preventivní – prevence budoucích problémů (technický dluh)
- Nouzová – neplánovaná, kritické opravy v produkci

## 29. Co je znovupoužitelnost softwaru?
- Schopnost použít existující artefakty v jiných projektech
- Úrovně:
  - Abstrakce – analytické prvky (UML, specifikace, manuály)
  - Objekty – jednotlivé třídy
  - Komponenty – kolekce tříd, services
  - Systém – kompletní systém
- Overhead: čas hledání, cena za použití, úprava, integrace
- Příklady: IS MUNI, shared library, frameworky
- Reuse-oriented proces – maximálně "off the shelf" moduly, minimum custom kódu

## 30. Co je proces řízení softwarového vývoje?
- Systém plánování, organizace, vedení a kontroly vývojového projektu
- Dvě hlavní paradigmata:
  - Prediktivní – řízení procesů (UP, waterfall), fixní scope, plánování napřed
  - Agilní – řízení lidských zdrojů (Scrum, XP), fixní čas/zdroje, adaptivní scope
- Zahrnuje: plánování, estimace (story pointy vs mandays), risk management, change management, alokace zdrojů
- Klíčový vztah: Time–Functionality–Price (vždy jeden se mění)
