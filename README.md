<div align="center">

# SZ6/A
### Zalaegerszegi Gondozási Központ kezelői felület

</div>

<p align="center">
  <img src="https://img.shields.io/badge/Verzió-v0.2.9-green" alt="Release">
</p>

---

Ez a projekt a 2025/26-os tanév folyamán készült a tanév végi érettségi vizsgaremekeként. A projektben részt vevő diákok: Barabás Gergő, Boncz Ákos, Szigethy József.

Feladatul azt kaptuk, hogy a Zalaegerszegi Gondozási Központnak készítsünk egy olyan felületet, amelyen különböző munkakörök alapján jogosultságok kiosztásával kezelhetnek az alkalmazottak adatokat. Emellett feladatunk, hogy a gondozottak hozzátartozói is online hozzáférhessenek a gondozottak állapotához.

További információkért olvassa el a [részletes specifikációt](https://docs.google.com/document/d/129Z8Vif-hkDRUh7ElyJey7fh6k3asQlaMTaOE5kfik4/edit?tab=t.0).

Hasznos tartalmak: [Példa specifikáció](https://awu.ac.in/docs/miscellaneous/2022/web_req_spec.pdf), [Példa kezelői kézikönyv](https://belsotudasbazis.szamvitelirendszer.hu/weboldal_doksi_1_0_0.pdf), [Tesztelési útmutató](https://www.tutorial.hu/weboldal-keszites/weboldal-tesztelesi-eljarasok-teljes-utmutato/)

## Belépési adatok
Minden alábbi adat kizárólag a fejlesztés alatt voltak használva és a gyakorlati használathoz ezeket ajánlott átírnia egy hozzáértő programozonak.
### Weboldal belépési adatok
A weboldalon alapértelmezetten van egy beégetett Admin felhasználó, melynek belépési adatai:
- Felhasználónév: admin
- Jelszó: admin

### HeidiSQL belépési adatok
- Hostnév / IP: 193.227.198.214
- Felhasználó: barabas.gergo
- Jelszó: Csany4181
- Port: 9406

### VS Code MySQL kapcsolat
- host: 10.2.0.11
- user: barabas.gergo
- password: Csany4181
- port: 3306
- database: ADATBAZIS_NEVE

### WinSCP belépési adatok
- Kiszolgáló neve: sexard3-214.tolna.net
- Port száma: 422
- Felhasználónév: barabas.gergo@csany-zeg.local
- Jelszó: Csany4181

### Putty belépési adatok
- Host name: sexard3-214.tolna.net
- Port: 422
- login as: barabas.gergo@csany-zeg.local
- password: Csany4181

## Alkalmazás feltelepítése
Az alábbiakban egy részletes lépésről lépésre útmutatót olvashat, amely lehetővé teszi az alkalmazás feltelepítését és indítását egy teljesen üres számítógépen. A pontokat figyelmesen olvassa el és másolja le a hibátlan futtatás érdekében.

### Projekt letöltése
1. A projektet a https://github.com/szigethyjozsef/SZ6A_Gondozasi_Kozpont linken lehet elérni.
2. Kattintson a jobb oldalon található 'Releases' címre.
3. Kattintson a legfrissebb verzió címére, pl.: 'v0.2.9 - Beta'.
4. Az 'Assets' cím alatt kattintson a 'Source code (zip)' gombra. Ezzel sikeresen letöltötte a projektet egy becsomagolt fájlba.
5. A Windows eszközén nyissa meg a Fájlkezelőt, majd menjen a Letöltések mappába.
7. Keresse meg az 'SZ6A_Gondozasi_Kozpont-x.x.x' fájlt, amely '.zip' kiterjesztésű.
8. Kattintson rá jobb gombbal, majd válassza ki az 'Az összes kibontása' opciót.
9. A 'Tallózás...' gombra kattintva válasszon ki egy olyan mappát, ahol biztonságosan tárolható lesz a projekt, pl.: C:\Documents.
10. Kattintson a 'Mappaválasztás' majd a 'Kibontás' gombra.

### Adatbázis létrehozása és feltöltése
1. Böngészőjében nyissa meg a https://www.heidisql.com/download.php linket.
2. Válassza ki a 'Windows 64 bit Installer' gombot, majd ez letölt egy 'HeidiSQL_x.x.x.x_Setup.exe' fájlt.
3. Kövesse a telepítő utasításait és töltse le a HeidiSQL programot.
4. Nyissa meg a programot és töltse ki a mezőket a szervernek megfelelően: Gazdagép neve, Felhasználó, Jelszó, Port.
5. Kattintson a 'Megnyitás' gombra, majd fent a menüben kattintson a 'Fájl' menügömbra.
6. Válassza az 'SQL fájl futtatása' gombot és válassza ki a projekt mappából az 'Adatbazis_Ures' vagy 'Adatbazis_Teli' fájlt.

### VS Code letöltése és a program beállítása
1. Böngészőjében nyissa meg a https://code.visualstudio.com/download linket.
2. Kattintson a Windows gombra majd a letöltött telepítőt használva telepítse a programot.
3. Az 'Explorer' fülön belül kattintson az 'Open folder' gombra és válassza ki azt a mappábat, amelyikbe korábban kicsomagolta a projektet.
4. Az oldalsó sávban válassza ki a 'java.js' fájlt.
5. A kódban a 'MySQL kapcsolat' alatt lévő adatokat a HeidiSQL-ben megadottak alapján írja át, de a 'database' sort ne bántsa.
6. CTRL + Ö gombkombinációval nyissa meg a terminált, majd írja be az 'npm install' parancsot és futtassa le.

### Projekt felöltése a szerverre
1. Böngészőjében nyissa meg a https://winscp.net/eng/download.php linket.
2. Kattintson a 'Download WinSCP x.x.x' gombra majd kövesse a telepítő utasításait.
3. Nyissa meg a programot és jelentkezzen be a kiszolgáló szerverre.
4. Keresse meg a projekt mappáját és húzza be a jobb oldali sávba.

### Szerver indítása
1. Böngészőjében nyissa meg a https://putty.org/index.html linket.
2. Kattintson a 'Download Putty' gombra és a telepítő lépéseit követve töltse le a programot.
3. Jelentkezzen be a szerver adatainak megfelelően és kattinson az 'Open' gombra.
4. A 'login as:' mezőbe írja be a 'barabas.gergo@csany-zeg.local' szöveget.
5. A 'password:' mezőbe írja be a 'Csany4181' szöveget.
6. Írja be a 'cd PROJEKT_MAPPA' parancsot.
7. A './start.sh' paranccsal eltudja indítani a szervert.
8. A './stop.sh' paranccsal letudja állítani a szervert.
