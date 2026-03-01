document.addEventListener('focusin', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
        // Kijelöljük az ÖSSZES mentés gombot az osztályuk alapján
        const gombok = document.querySelectorAll('.mentes_gomb');
        gombok.forEach(gomb => {
            gomb.disabled = true;
            gomb.style.opacity = "0.5";
            gomb.style.cursor = "not-allowed";
        });
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
        const gombok = document.querySelectorAll('.mentes_gomb');
        
        // Itt is hagyjuk meg a pici késleltetést a biztos kattintásért
            gombok.forEach(gomb => {
                gomb.disabled = false;
                gomb.style.opacity = "1";
                gomb.style.cursor = "pointer";
            });
    }
});

/*───────────────────────────────────────────────────────────────────────────────────────────────────────*/
/*──────────────────────────────────────────── BEJELENTKEZÉS ────────────────────────────────────────────*/
/*───────────────────────────────────────────────────────────────────────────────────────────────────────*/

function ajax_post( urlsor, tipus ) { // json restapi-hoz használjuk
  	var s = "";
  	$.ajax({url: urlsor, type:"post", async:false, cache:false, dataType:tipus===0?'html':'json',
		beforeSend:function(xhr) { },
		success: function(data) { s = data; },
		error: function(jqXHR, textStatus, errorThrown) {console.log(jqXHR); console.log(textStatus); console.log(errorThrown);},
		complete: function() { }
  	});
  	return s;
};

/*──────────────────────────────────── Modal nagyból kicsi és fordítva ─────────────────────────────────────*/

function modalMeretValtozato(size){
    const modalDialog = document.querySelector("#adatad .modal-dialog");

    if (size == "nagy") {
        modalDialog.classList.replace("modal-md", "modal-xl");
        } 
    else {
        modalDialog.classList.replace("modal-xl", "modal-md");
    }
}

/*──────────────────────────────────── JELSZÓ MEGTEKINTÉSE ─────────────────────────────────────*/

document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('password');
  const passwordToggle = document.getElementById('password_gomb');
  const passwordImage = document.getElementById('password_kep');

  if (passwordToggle && passwordInput && passwordImage) {
      passwordToggle.addEventListener('click', function() {
          if (passwordInput.type === 'password') {
              passwordInput.type = 'text';
              passwordImage.src = 'kepek/hidden.svg';
              passwordImage.alt = 'Hide Password';
          } else {
              passwordInput.type = 'password';
              passwordImage.src = 'kepek/view.svg';
              passwordImage.alt = 'Show Password';
          }
      });
  }
});

/*───────────────────────────────────── JELSZÓ KÉP SZÍNE ───────────────────────────────────────*/

document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password');
    const passwordIcon = document.getElementById('password_kep');

    if (!passwordField || !passwordIcon) return;

    passwordField.addEventListener('focus', function() {
        passwordIcon.classList.add('focused');
    });

    passwordField.addEventListener('blur', function() {
        if (document.activeElement !== passwordField) {
            passwordIcon.classList.remove('focused');
        }
    });

    const toggleButton = document.getElementById('togglePassword');
});

/*──────────────────────────────────── ENTER TOVÁBBLÉPÉS ───────────────────────────────────────*/

document.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		document.getElementById("tovabb_gomb").click();
	}
});

/*─────────────────────────────── BEJELENTKEZÉS JOGOSULTSÁGOK ──────────────────────────────────*/

// Bejelntkezéshez "TOVABB" gomb
async function iHopeLogin() {
    var user = felhasz.value;
    var pass = password.value;
    if (user != "" && pass != "") {
        figyelmeztet.innerHTML = "";
        var be = await ajax_post(`/login?user=${user}&passwd=${pass}`, 1);  
        //var be = await fetch(`/login?user=${user}&passwd=${pass}`, {method: 'POST'});
        if(be.van > 0){ //ÁTÍRNI == 1 RE
            sessionStorage.setItem("paciens_neve", felhasz.value);
            if (be.db == "admin"){
            
            window.location.href = "/admin";
            }
            else if (be.db == "apolo"){
            window.location.href = "/admin";
            }
            else if (be.db == "rokon"){
            
            window.location.href = "/admin";
            }
        }
        else{
            figyelmeztet.innerHTML = "Hibás felhsználónév vagy jelszó!"
        }
  	}
    else if(user == "" || pass == ""){
      figyelmeztet.innerHTML = "A mezőket ki kell tölteni!"
    }
}

// Kijelentkezés
function iHopeLoginOut() {
    window.location.href = "/index.html";
    ajax_post(`/logout`, 1);
    
}

/*──────────────────────────────────────────────────────────────────────────────────────────────*/
/*─────────────────────────────────────────── ADMIN ────────────────────────────────────────────*/
/*──────────────────────────────────────────────────────────────────────────────────────────────*/

// Bejelentkezett user nevének lekérése
var bejelentkezettUser = sessionStorage.getItem("paciens_neve");

// Menü feltöltése a jogosultság alapján
async function menukitolt() {

    var bea = await ajax_post(`/emberadat?`, 1); // Megvárjuk a választ
    console.log(bea); // Ellenőrizzük a választ a konzolon
    if (!bea || !bea.tablak || bea.tablak.length == 0) {
        window.location.href = "/index.html";
    }

  	var be = ajax_post(`/betolt`, 1); 
    
    var jog = ajax_post(`/emberjog?`, 1);
    var jogos = Object.values(jog.tablak[0])[1];

    if (jogos == "Ápoló") {
        document.getElementById("gep_plus").innerHTML = "";
        document.getElementById("mobile_plus").innerHTML = "";

        document.getElementById("gep_plus").remove();
        document.getElementById("mobile_plus").remove();
    }
    else if (jogos == "Admin"){
        document.getElementById("gep_plus").innerHTML = `<button type="button" id="btn_plus" class="blue_btn btn mx-3"  onclick="pupUPletrehoz('gomb')">
                    <img id="btn_plus_icon" src="kepek/plusicon.svg" alt="Jelszó mutatása/elrejtése" style="height: 60%;">
                </button>`;

        document.getElementById("mobile_plus").innerHTML = `<button type="button" id="btn_mobile_plus" class="blue_btn btn"  onclick="pupUPletrehoz('gomb')">
                    <img id="btn_plus_icon" src="kepek/plusicon.svg" alt="Adatok hozzáadása" style="height: 60%;">
                </button>`;
    }
    else if (jogos == "Rokon"){
        document.getElementById("gep_plus").innerHTML = "";
        document.getElementById("mobile_plus").innerHTML = "";
        
        document.getElementById("gep_plus").remove();
        document.getElementById("mobile_plus").remove();
    }

  	for (var asd of be.tablak) {
		var tablaNev = asd['Tables_in_2021SZ_barabas_gergo'];
		
		if (!tablaNev.includes("_") && tablaNev != "Config" && tablaNev != "Korlap" && jogos == "Admin") {
			document.getElementById("sidebar").innerHTML += `
			<a href="javascript:void(0)" class="nav-link" data-page="${tablaNev}" name="${tablaNev}" onclick="loadPage(this, '${tablaNev}')"> ${tablaNev} </a>`;
		}
        else if (tablaNev == "Paciensek" && jogos == "Ápoló"){
            document.getElementById("sidebar").innerHTML += `
			<a href="javascript:void(0)" class="nav-link" data-page="${tablaNev}" name="${tablaNev}" onclick="loadPage(this, '${tablaNev}')"> ${tablaNev} </a>`;
        }
        else if (tablaNev == "Paciensek" && jogos == "Rokon"){
            document.getElementById("sidebar").innerHTML += `
			<a href="javascript:void(0)" class="nav-link" data-page="${tablaNev}" name="${tablaNev}" onclick="loadPage(this, '${tablaNev}')"> ${tablaNev} </a>`;
        }
    }
    
    document.getElementById("sidebar").innerHTML += `
    <div id="segit-doboz">
    <button id="segitsegGomb" data-bs-toggle="modal" data-bs-target="#adatad" onclick="infok()">
        <img id="segit-icon" src="kepek/helpicon.svg" alt="Help">
        <span id="segit-szoveg">Információ</span>
    </button>
    </div>`

	// Betöltéskor a legelső menü elemet betölti
    const navLinks = document.getElementById("sidebar").querySelectorAll(".nav-link");
    if (navLinks.length > 0) {
        navLinks[0].classList.add("active");
        loadPage(navLinks[0], navLinks[0].getAttribute('data-page'));
    }
	
    // Felhasználónév és jogosultság megjelenítése a profil dropdownban
	document.getElementById('txt_felhasznalo').innerHTML = `${Object.values(bea.tablak[0])[0]}`;
	document.getElementById('txt_jogosultsag').innerHTML = `${jogos}`;
	
}

// Információk a segítő gombra kattintva
function infok(asd){
    var jog = ajax_post(`/emberjog?`, 1);
    var jogos = Object.values(jog.tablak[0])[1];

    modalMeretValtozato("nagy");

    if (asd == "korlapos"){
        fejlec = "<h5>Korlap Információk</h5>";
        html = `<p class="intro">Ezen a részen a korlapokat kezelheti.</p>
        <h5>🛠️ Kezelőfelület</h5>
        <ul>
            <li>Első gombbal visszatud menni a pácienskártyához.</li>
            <li>Második gombbal új korlapot tud létrehozni az adott páciensnek.</li>
        </ul>
        `
    }
    else if (asd == "koros"){
        if (jogos == "Admin"){
        fejlec = "<h4>Admin Információk</h4>";
        html = `<p class="intro">Ezen a részen a paciensek adatait kezelheti</p>
        <h5>🛠️ Kezelőfelület</h5>
        <ul>
            <li>Első gombbal visszatud menni a pácienskártyához.</li>
            <li>Második gombbal megtekinteni az adott ember korlapjait.</li>
            <li>Harmadik gombbal új korlapot tud létrehozni az adott páciensnek.</li>
        </ul>
        <h5>👤 Páciensek kezelése</h5>
        <ul>
            <li>Első kártyán láthatja a páciens adatait, azokoat tudja szerkezteni, menteni és törölni.</li>
            <li>Betegségek kártyában láthatj a betegségeket azokhoz tud hozzáadni új betegséget vagy törölni a meglévőt.</li>
            <li>Gyógyszerek kártyában láthatj a gyógyszereket azokhoz tud hozzáadni új gyógyszert vagy törölni a meglévőt. Azok adagolását is tudja szerkezteni: beirja az adatot és automatikusan elmenti.</li>
            <li>Rokonok kártyában láthatj a rokonokat azokhoz tud hozzáadni új rokont vagy törölni a meglévőt.</li>
        </ul>`;
        }
        else if (jogos == "Ápoló"){
        fejlec = "<h4>Admin Információk</h4>";
        html = `<p class="intro">Ezen a részen a paciensek adatait kezelheti</p>
        <h5>🛠️ Kezelőfelület</h5>
        <ul>
            <li>Első gombbal visszatud menni a pácienskártyához.</li>
            <li>Második gombbal megtekinteni az adott ember korlapjait.</li>
            <li>Harmadik gombbal új korlapot tud létrehozni az adott páciensnek.</li>
        </ul>
        <h5>👤 Páciensek kezelése</h5>
        <ul>
            <li>Itt láthatja a páciensek adatait.</li>
        </ul>`;
        }

        }

    else{
    if (jogos == "Admin"){
        fejlec = "<h4>Admin Információk</h4>";
        if (window.innerWidth <= 1081){
            html = `<p class="intro">
        Üdvözöljük az adminisztrációs felületen! Az alábbiakban rövid segítséget talál a hatékony munkavégzéshez:
    </p>

    <h5>🛠️ Navigáció és Kezelőfelület</h5>
    <ul>
        <li>
            <strong>Oldalsáv:</strong> A bal oldali oldalsáv megjelenítéséhez a bal felső sarokban kékkel jelzett ikonnal jeleníthető meg.
        </li>
        <li>
            Menüben válthat a különböző adatbázisok (<strong>Betegségek, Gyógyszerek, Operátorok, Páciensek, Rokonok</strong>) között. Az aktív menüpontot kék szín jelzi.
        </li>
        <li>
            <strong>Megjelenítés:</strong> Az adatok a választott menüponttól függően átlátható <strong>táblázatos formában</strong> vagy modern <strong>kártyás nézetben</strong> jelennek meg.
        </li>
    </ul>

    <h5>🔍 Keresés és Szűrés</h5>
    <ul>
        <li>
            <strong>Intelligens Kereső:</strong> A fejléc közepén található keresőmezővel valós időben szűrhet. Minden leütött billentyű után szűr. A rendszer <strong>minden oszlopban és mezőben</strong> egyszerre keres, legyen szó névről, azonosítóról vagy bármilyen egyéb adatról.
        </li>
    </ul>

    <h5 class="icon-purple">➕ Adatkezelés</h5>
    <ul>
        <li>
            A <strong>naplóban</strong> láthatja az eddig elvégzett mentéseket, módosításokat és törléseket.
        </li>
        <li>
            <strong>Új adat hozzáadása:</strong> A kereső melletti kék <span class="blue-btn">[ + ] gombra</span> kattintva vehet fel új rekordot (pl. új pácienst vagy operátort) az aktuálisan megnyitott táblázathoz. Ezt követően megjelenik egy ablak az adott tábla adataival és tud újat felvenni.
        </li>
        <li>
            <strong>Módosítás:</strong> Meglévő adat szerkesztéséhez kattintson az adott táblázat sorára vagy a pácienskártyára. Ezt követően megjelenik egy ablak az az adott táblán belül a kiválasztott sor adataival és lehet módosítani és <strong>törölni</strong>.
            <div class="warning-box">
                ◦ <i>Figyelem:</i> A rendszergazdai (<span class="admin-text">admin</span>) adatok biztonsági okokból zároltak, nem módosíthatók 🔒.
            </div>
            <div class="warning-box">
                ◦ <i>Figyelem:</i> A beviteli mezők mentése során nem tud rossz adatot elmenteni, alul kis ablakban figyelmeztetés jelenik meg.
            </div>
        </li>
    </ul>

    <h5>👤 Felhasználói információk</h5>
    <ul>
        <li>
            A felhasználói információ megtekintéséhez és a kijelentkezéshez nyomja meg a <strong>jobb felső piros ikont</strong>.
        </li>
        <li>
            <strong>Profil:</strong> Itt láthatja a saját nevét és aktuális <strong>jogosultsági szintjét</strong>.
        </li>
        <li>
            <strong>Kijelentkezés:</strong> A név alatti pirossal jelzett kijelentkezésre nyomva biztonságosan elhagyhatja a rendszert.
        </li>
    </ul>`;
        }
        else{
            html = `

    <p class="intro">Üdvözöljük az adminisztrációs felületen! Az alábbiakban rövid segítséget talál a hatékony munkavégzéshez:</p>

    <h5>🛠️ Navigáció és Kezelőfelület</h5>
    <ul>
        <li><strong>Oldalsáv:</strong> A bal oldali menüben válthat a különböző adatbázisok (<strong>Betegségek, Gyógyszerek, Operátorok, Páciensek, Rokonok</strong>) között. Az aktív menüpontot kék szín jelzi.</li>
        <li><strong>Megjelenítés:</strong> Az adatok a választott menüponttól függően átlátható <strong>táblázatos formában</strong> vagy modern <strong>kártyás nézetben</strong> jelennek meg.</li>
    </ul>

    <h5>🔍 Keresés és Szűrés</h5>
    <ul>
        <li><strong>Intelligens Kereső:</strong> A fejléc közepén található keresőmezővel valós időben szűrhet. Minden leütött billentyű után szűr. A rendszer <strong>minden oszlopban és mezőben</strong> egyszerre keres, legyen szó névről, azonosítóról vagy bármilyen egyéb adatról.</li>
    </ul>

    <h5 class="icon-purple">💜 Adatkezelés</h5>
    <ul>
        <li>A <strong>naplóban</strong> láthatja az eddig elvégzett mentéseket, módosításokat és törléseket.</li>
        <li><strong>Új adat hozzáadása:</strong> A kereső melletti kék <span class="blue-btn">[ + ] gombra</span> kattintva vehet fel új rekordot (pl. új pácienst vagy operátort) az aktuálisan megnyitott táblázathoz. Ezt követően megjelenik egy ablak az adott tábla adataival és tud újat felvenni.</li>
        <li><strong>Módosítás:</strong> Meglévő adat szerkesztéséhez kattintson az adott táblázat sorára vagy a pácienskártyára. Ezt követően megjelenik egy ablak az az adott táblán belül a kiválasztott sor adataival és lehet módosítani és <strong>törölni</strong>.
            <div class="warning-box">
                ◦ <i>Figyelem:</i> A rendszergazdai (<span class="admin-text">admin</span>) adatok biztonsági okokból zároltak, nem módosíthatók 🔒.
            </div>
            <div class="warning-box">
                ◦ <i>Figyelem:</i> A beviteli mezők mentése során nem tud rossz adatot elmenteni, alul kis ablakban figyelmeztetés jelenik meg.
            </div>
        </li>
    </ul>

    <h5>👤 Felhasználói információk</h5>
    <ul>
        <li><strong>Profil:</strong> A jobb felső sarokban láthatja a saját nevét és aktuális <strong>jogosultsági szintjét</strong>.</li>
        <li><strong>Kijelentkezés:</strong> A név melletti piros ikonnal biztonságosan elhagyhatja a rendszert.</li>
    </ul>`;
        }

    }
    else if (jogos == "Ápoló" || jogos == "Rokon"){
        fejlec= "<h4>Információk Információk</h4>";
        if (window.innerWidth <= 1081){
            html = `<p class="intro">
        Üdvözöljük az adminisztrációs felületen! Az alábbiakban rövid segítséget talál a hatékony munkavégzéshez:
    </p>

    <h5>🛠️ Navigáció és Kezelőfelület</h5>
    <ul>
        <li>
            <strong>Kártyák:</strong> Kártyákon láthatja a páciens nevét és TAJ számát. Kattintással megjelenik a páciens adatai.
        </li>
        <li>
            <strong>Oldalsáv:</strong> A bal oldali oldalsáv megjelenítéséhez a bal felső sarokban kékkel jelzett ikonnal jeleníthető meg.
        </li>
        <li>
            <strong>Megjelenítés:</strong> Az adatok a választott menüponttól függően átlátható <strong>táblázatos formában</strong> vagy modern <strong>kártyás nézetben</strong> jelennek meg.
        </li>
    </ul>

    <h5>🔍 Keresés és Szűrés</h5>
    <ul>
        <li>
            <strong>Intelligens Kereső:</strong> A fejléc közepén található keresőmezővel valós időben szűrhet. Minden leütött billentyű után szűr. A rendszer <strong>minden oszlopban és mezőben</strong> egyszerre keres, legyen szó névről, azonosítóról vagy bármilyen egyéb adatról.
        </li>
    </ul>

    <h5>👤 Felhasználói információk</h5>
    <ul>
        <li>
            A felhasználói információ megtekintéséhez és a kijelentkezéshez nyomja meg a <strong>jobb felső piros ikont</strong>.
        </li>
        <li>
            <strong>Profil:</strong> Itt láthatja a saját nevét és aktuális <strong>jogosultsági szintjét</strong>.
        </li>
        <li>
            <strong>Kijelentkezés:</strong> A név alatti pirossal jelzett kijelentkezésre nyomva biztonságosan elhagyhatja a rendszert.
        </li>
    </ul>`;
        }
        else{
            html = `

    <p class="intro">Üdvözöljük az adminisztrációs felületen! Az alábbiakban rövid segítséget talál a hatékony munkavégzéshez:</p>

    <h5>🛠️ Navigáció és Kezelőfelület</h5>
    <ul>
        <li><strong>Az aktív menüpontot kék szín jelzi.</li>
        <li><strong>Megjelenítés:</strong> Az adatok a választott menüponttól függően átlátható <strong>táblázatos formában</strong> vagy modern <strong>kártyás nézetben</strong> jelennek meg.</li>
    </ul>

    <h5>🔍 Keresés és Szűrés</h5>
    <ul>
        <li><strong>Intelligens Kereső:</strong> A fejléc közepén található keresőmezővel valós időben szűrhet. Minden leütött billentyű után szűr. A rendszer <strong>minden oszlopban és mezőben</strong> egyszerre keres, legyen szó névről, azonosítóról vagy bármilyen egyéb adatról.</li>
    </ul>

    <h5>👤 Felhasználói információk</h5>
    <ul>
        <li><strong>Profil:</strong> A jobb felső sarokban láthatja a saját nevét és aktuális <strong>jogosultsági szintjét</strong>.</li>
        <li><strong>Kijelentkezés:</strong> A név melletti piros ikonnal biztonságosan elhagyhatja a rendszert.</li>
    </ul>`;
        }

    }

}


    lablec = "";
    document.getElementById("cimHelye").innerHTML = fejlec;
    document.getElementById("idebeteszt").innerHTML = html;
    document.getElementById("gombokHelye").innerHTML = lablec;
}

/*──────────────────────────────────── TELEFONOS kijelentkezés ────────────────────────────────────*/

// Profil ikonra kattintva megjelenő dropdown menü
function toggleMenu() {
    const dropdown = document.getElementById("myDropdown");

    if (!dropdown.classList.contains("is-open")) {
        const be = ajax_post(`/emberadat?`, 1);
        const beb = ajax_post(`/emberjog?`, 1);

        document.getElementById('txt_felhasznalo_m').textContent = Object.values(be.tablak[0])[0];
        document.getElementById('txt_jogosultsag_m').textContent = Object.values(beb.tablak[0])[1];
        document.getElementById('avatar_betu').textContent = Object.values(be.tablak[0])[0].toUpperCase().charAt(0);

        dropdown.classList.add("is-open");
    } else {
        dropdown.classList.remove("is-open");
    }
}

//Kijelentkezés mező bezár amikor máshova kattint
document.addEventListener('click', (e) => {
    const cucc = document.getElementById("myDropdown");
    const masik = document.getElementById("btn_profile");

    if (document.getElementById("login_ellenor") == null){
        if (cucc.classList.contains("is-open") && !cucc.contains(e.target) && !masik.contains(e.target)) {
            cucc.classList.remove('is-open');
         
        }
    }
});

/*──────────────────────────────────── TELEFON OLDALSÓ MENÜ ────────────────────────────────────*/

// Hamburger ikonra kattintva megjelenő oldalsó menü
function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('show');
	document.getElementById('sidebarOverlay').classList.toggle('show');
}

/*─────────────────────────── TÁBLA BETÖLTÉSE AZ OLDAL MEGNYITÁSAKOR ───────────────────────────*/

// Globális változó a jelenleg megjelenített tábla nevének tárolására
var tablaNevesKell;

// Menüelemekre kattintva meghívódó függvény, ami betölti a megfelelő táblát
function loadPage(element, tablaNeve) {
    var jog = ajax_post(`/emberjog?`, 1);
    var jogos = Object.values(jog.tablak[0])[1];

    tablaNevesKell = tablaNeve;

    if (jogos == "Admin"){
        if (tablaNevesKell == "Naplo"){
            document.getElementById("gep_plus").innerHTML = "";
            document.getElementById("mobile_plus").innerHTML = "";
        }
        else{
        document.getElementById("gep_plus").innerHTML = `<button type="button" id="btn_plus" class="blue_btn btn mx-3"  onclick="pupUPletrehoz('gomb')">
                    <img id="btn_plus_icon" src="kepek/plusicon.svg" alt="Jelszó mutatása/elrejtése" style="height: 60%;">
                </button>`;

        document.getElementById("mobile_plus").innerHTML = `<button type="button" id="btn_mobile_plus" class="blue_btn btn"  onclick="pupUPletrehoz('gomb')">
                    <img id="btn_plus_icon" src="kepek/plusicon.svg" alt="Adatok hozzáadása" style="height: 60%;">
                </button>`;
        }
    }

    document.getElementById("kor").innerHTML = "";

    document.body.classList.remove("pac-view");
    document.getElementById("kereso").value = "";
    document.getElementById("mobile_kereso").value = "";

    var be = "";
    
    if (jogos == "Rokon"){
        be = ajax_post(`/adatlopRokon?rokonFelh=${bejelentkezettUser}`, 1); 
    }
    else if (jogos == "Admin" && tablaNevesKell == "Naplo"){
        be = ajax_post(`/naplolop`, 1); 
    }
    else{
        be = ajax_post(`/adatlop?tabla=${tablaNeve}`, 1); 
    }
	
	tablaMegcsinal( be)

	// Aktív osztály
	document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
	element.classList.add('active');
	
	// Sidebar mobilon
	document.getElementById('sidebar')?.classList.remove('show');
	document.getElementById('sidebarOverlay')?.classList.remove('show');
}

/*────────────────────────────────────── TÁBLA FELTÖLTÉSE ──────────────────────────────────────*/

// Globális változó a jelenleg megjelenített tábla adatainak tárolására (pl. páciens módosításnál)
var jelenelegiTaj;

// A táblázatot feltöltő függvény, amit a loadPage és a keresés is meghívhat, hogy frissítse a táblát a keresési eredményekkel vagy a módosítások után
function tablaMegcsinal(be) {
    document.getElementById("kor").innerHTML = "";
    document.querySelector('.tablakIdeTolt').innerHTML = "";
    
    // Ellenőrizzük, hogy az első sor tartalma "üres"-e
    var ideges = (Object.values(be.tablak[0])[0] + Object.values(be.tablak[0])[1] + Object.values(be.tablak[0])[2] + Object.values(be.tablak[0])[3]).toString();

    if (tablaNevesKell == "Naplo") {
        var html = `<table id="tesztelos">`;
        if (ideges != "üres") {
                html += `<thead>
                    <tr>
                        <th>Felhasználó</th>
                        <th>Időpont</th>
                        <th>Művelet (SQL)</th>
                    </tr>
                </thead>
                <tbody>`;

            for (var i = 0; i < be.tablak.length; i++) {
                html += `<tr>
                    <td style="color: #00bfff; font-weight: bold;">${Object.values(be.tablak[i])[0]}</td>
                    <td style="white-space: nowrap;">${Object.values(be.tablak[i])[2]}</td>
                    <td style="font-family: monospace; font-size: 0.85rem; color: #ccc;">
                        <code>${Object.values(be.tablak[i])[1]}</code>
                    </td>
                </tr>`;
            }
            html += `</tbody></table>`;
            document.querySelector('.tablakIdeTolt').innerHTML = html;
        } 
        else {
            html += '<thead><tr><td colspan="100">ÜRES</td></tr></thead>';
            html += `</table>`;
        }
        document.querySelector('.tablakIdeTolt').innerHTML = html;
    }

    else if (tablaNevesKell == "Paciensek") {
        if (ideges != "üres") {
            var html = `<div class="cardtarto">`;
            for (var i = 0; i < be.tablak.length; i++) {
                html += `<div class="card tolt" onclick='pacMod(${Object.values(be.tablak[i])[0]}, "${Object.values(be.tablak[i])[7]}")'><div class="card-body">`;
                html += `<h5 class="card-title ">${Object.values(be.tablak[i])[1]}</h5>
                         <p>${Object.values(be.tablak[i])[7]}</p>`;
                html += `</div></div>`;
            }
            html += "</div>";
            document.querySelector('.tablakIdeTolt').innerHTML = html;
        } else {
            document.querySelector('.tablakIdeTolt').innerHTML = "Nincs találat...  ";
        }
    } 
    else {
        var beb = ajax_post(`/mezonevkel?tabla=${tablaNevesKell}`, 1);
        var html = `<table id="tesztelos">`;

        if (ideges != "üres") {
            html += `<thead><tr>`;
            for (var mez of beb.tablak) {
                html += `<th>${Object.values(mez)[3]}</th>`;
            }
            html += `</tr></thead><tbody>`;

            for (var sor of be.tablak) {
                // A képed alapján FELHASZNALONEV a kulcs
                const isAdmin = (tablaNevesKell === "Operatorok" && sor["FELHASZNALONEV"] === "admin");

                if (isAdmin) {
                    // Tiltott sor stílusa
                    html += `<tr style="background-color: #383838; cursor: not-allowed; color: #ffffff;" title="A rendszergazda nem módosítható">`;
                } else {
                    html += `<tr onclick='pupUPletrehoz(${JSON.stringify(sor)})'>`;
                }

                for (let [kulcs, ertek] of Object.entries(sor)) {
                    // Dátum formázás
                    if (typeof ertek === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(ertek)) {
                        html += `<td>${ertek.split("T")[0]}</td>`;
                    } 
                    else {
                        // Ha az admin nevét írjuk ki, tegyünk mellé egy lakatot
                        let tartalom = (isAdmin && kulcs === "NEV") ? `🔒 ${ertek}` : ertek;
                        html += `<td>${tartalom}</td>`;
                    }
                }
                html += `</tr>`;
            }
            html += `</tbody>`;
        } else {
            html += '<thead><tr><td colspan="100">ÜRES</td></tr></thead>';
        }
        html += `</table>`;
        document.querySelector('.tablakIdeTolt').innerHTML = html;
    }
}

/*─────────────────────────────── BETÖLTÉS AZ OLDAL INDÍTÁSAKOR ────────────────────────────────*/

// Amikor az oldal betöltődik, automatikusan meghívjuk a loadPage függvényt az első menüelemmel, hogy megjelenjen egy tábla
window.addEventListener('DOMContentLoaded', function () {
    const firstNav = document.querySelector('.nav-link');
    if (firstNav) {
        const page = firstNav.getAttribute('data-page');
        loadPage(null, firstNav, page);
    }
});

/*────────────────────────────────────── KERESÉS TÁBLÁBAN ──────────────────────────────────────*/

// Keresés gombra kattintva meghívódó függvény, ami elküldi a keresési kifejezést az AJAX-nak, és frissíti a táblát a találatokkal
async function keres() { //  BG
	const desktop = document.getElementById("kereso");
    const mobile  = document.getElementById("mobile_kereso");

    const dVal = desktop ? desktop.value.trim() : "";
    const mVal = mobile ? mobile.value.trim() : "";

    const value = dVal !== "" ? dVal : mVal;

    const be = await ajax_post(`/kereses?tabla=${tablaNevesKell}&ertek=${encodeURIComponent(value)}`, 1);

    tablaMegcsinal(be);
}

/*────────────────────────────────── Páciens módosítás ──────────────────────────────────*/

// páciens kattintás betöltése 
function pacKattBetolt(be, oszlopok, tombos, pacid) {
    var jog = ajax_post(`/emberjog?`, 1);
    var jogos = Object.values(jog.tablak[0])[1];

    let html = "";

    html += `<div class="tesztGorget"><table id="datok">`;
    html += `<thead><tr>`;
    for (let idx of tombos) {
        html += `<th>${Object.values(oszlopok.tablak)[idx].DESCRIPTION}</th>`;
    }
    html += `</tr></thead><tbody>`;

    for (var sor of be.tablak) {
        html += `<tr>`;
        for (var ertek of Object.values(sor)) {
            html += `<td>${ertek}</td>`;
        }
        html += `</tr>`;
    }

    var singularTableNeve = Object.values(oszlopok.tablak)[0].DESCRIPTION.split(" ")[0];
    var pluralTableNeve = singularTableNeve;

    if (singularTableNeve === 'Betegség') {
        pluralTableNeve = 'Betegsegek';
    } else if (singularTableNeve === 'Gyógyszer') {
        pluralTableNeve = 'Gyogyszerek';
    } else if (singularTableNeve === 'Rokon') {
        pluralTableNeve = 'Rokonok';
    }

    html += `</tbody></table></div>`;

    if (jogos == "Admin"){
        html += `<div id="gombsor">
                    <button type="button" onclick="P_adat_hozzaad('${pluralTableNeve}', ${pacid})" class="btn blue_btn btn_card">Adat hozzáadása</button>
                    <button type="button" onclick="P_adat_torlese('${pluralTableNeve}', ${pacid})" class="btn red_btn btn_card">Adat törlés</button>
                </div>`;
    }
    return html;
}

// Páciens módosítás fő függvénye

function pacMod(cuccos, taj) { 

        jelenelegiTaj = taj;

        var jog = ajax_post(`/emberjog?`, 1);
        var jogos = Object.values(jog.tablak[0])[1];

        if (window.innerWidth >= 822) {
            document.body.classList.add("pac-view");
        }

        if (jogos == "Admin") {
            document.getElementById("gep_plus").innerHTML = "";
            document.getElementById("mobile_plus").innerHTML = "";
        }

        /******************************************* */

        var op = ajax_post(`/opadatok?`, 1);
        var bec = ajax_post(`/adatlop?tabla=${tablaNevesKell}`, 1); 

        if (jogos == "Admin" || jogos == "Ápoló"){
            document.getElementById("kor").innerHTML = `<div id="Korlap_gomb">
                <button type="button" id="visszaGomb" class="vissza-gomb"><img id="vissza-icon" src="kepek/visszaicon.svg" alt="Help"></button>
                <button type="button" id="balKorGomb" onclick="Korlap_Open(${cuccos})" class="btn blue_btn btn_card">Kórlapok</button>
                <button type="button" id="jobbKorGomb" onclick="uj_korlap(${cuccos}, ${Object.values(op)[0][0].O_ID}, '${Object.values(op)[0][0].NEV}')" class="btn red_btn">Kórlap létrehozása</button>
                <button id="sugo" type="button" data-bs-toggle="modal" data-bs-target="#adatad" onclick="infok('koros')" class="btn blue_btn btn_card">?</button>
                </div>`;
                    
            const vGomb = document.getElementById("visszaGomb");
                if (vGomb) {
                    vGomb.onclick = function() {
                            if (jogos == "Admin"){
                                document.getElementById("gep_plus").innerHTML = `<button type="button" id="btn_plus" class="blue_btn btn mx-3"  onclick="pupUPletrehoz('gomb')">
                                            <img id="btn_plus_icon" src="kepek/plusicon.svg" alt="Jelszó mutatása/elrejtése" style="height: 60%;">
                                        </button>`;

                                document.getElementById("mobile_plus").innerHTML = `<button type="button" id="btn_mobile_plus" class="blue_btn btn"  onclick="pupUPletrehoz('gomb')">
                                            <img id="btn_plus_icon" src="kepek/plusicon.svg" alt="Adatok hozzáadása" style="height: 60%;">
                                        </button>`;
                        }
                        tablaMegcsinal(bec);
                    };
                document.getElementById("Korlap_gomb").style.display = "block";
            }
        }   

        var html = "";
        var be = ajax_post(`/pacmod?pacid=${cuccos}`, 1);
        var oszlopok = ajax_post(`/oszlopnev?tabla=Paciensek`, 1);
        html += `<div class="pacSokAdatCard"> `;
        html += `<div class="col-3 card pac"> <h3>Adatok</h3> `
        html += `<div class="tesztGorget"><table id="datok">`;
        
        for (var mez of be.tablak) {
            for(var i = 1; i < Object.values(mez).length ; i++){

                let mezoLeiras = oszlopok.tablak[i].DESCRIPTION;
                let aktualisErtek = Object.values(mez)[i];

                let beviteliMezo = generaljMezoHTML(mezoLeiras, aktualisErtek);

                html += `<tr><td>${mezoLeiras}</td><td>${beviteliMezo}</td></tr>`;
            }
        }

        html += `</table></div>`
        if (jogos == "Admin"){
            html += `<div id="gombsor">
                <button type="button" onclick="adathozzaad(${cuccos})" class="btn blue_btn btn_card mentes_gomb">Mentés</button>
                <button type="button" onclick="adat_torlese(${cuccos})" class="btn red_btn">Törlés</button>
                </div>`;
        }
        html += `</div>`;
        
        /********************Betegsegek Kártya********************** */

        var tombos = [];

        be = ajax_post(`/pacmod2?pacid=${cuccos}`, 1);
        html += `<div class="col-3 card pac"> <h3 class="kartya_cim">Betegsegek</h3>`
        oszlopok = ajax_post(`/oszlopnev?tabla=Betegsegek`, 1);
        tombos = [1, 2]

        html += pacKattBetolt(be, oszlopok, tombos, cuccos); 
        html += `</div>`;

        /********************Gyogyszerek Kártya********************** */
        
        be = ajax_post(`/pacmod3?pacid=${cuccos}`, 1);
        html += `<div class="col-3 card pac"> <h3 class="kartya_cim">Gyogyszerek</h3>`
        oszlopok = ajax_post(`/oszlopnev?tabla=Gyogyszerek`, 1);

        html += `<div class="tesztGorget"><table id="datok"> <thead><tr><th>Név</th><th>Adagolás</th></tr></thead><tbody>`;
        for (var mez of be.tablak){
            html += `<tr><td>${Object.values(mez)[0]}</td><td><input onblur="adatModositas('${Object.values(mez)[0]}', this.value, ${cuccos})" value="${Object.values(mez)[1]}" type="text" class="create-input"></td></tr>`;
        }

        html += `</tbody></table></div>`;
        if (jogos == "Admin"){
            html += `<div id="gombsor">
                <button type="button" onclick="P_adat_hozzaad('Gyogyszerek', ${cuccos})" class="btn blue_btn btn_card">Adat hozzáadása</button>
                        <button type="button" onclick="P_adat_torlese('Gyogyszerek', ${cuccos})" class="btn red_btn btn_card">Adat törlés</button>
                </div>`;
        }
        html += `</div>`;

        /********************Rokonok Kártya********************** */

        be = ajax_post(`/pacmod4?pacid=${cuccos}`, 1);
        html += `<div class="col-3 card pac"> <h3 class="kartya_cim">Rokonok</h3>`
        oszlopok = ajax_post(`/oszlopnev?tabla=Rokonok`, 1);
        tombos = [1, 3]

        html += pacKattBetolt(be, oszlopok, tombos, cuccos); 
        html += `</div>`;

        /****************************************** */
        
        html += `</div>`;
        document.getElementById("sav").innerHTML = html;
        
        if (jogos == "Ápoló" || jogos == "Rokon"){
            const inputs = document.querySelectorAll('.create-input');

            inputs.forEach(input => {
                input.disabled = true;
            });
        }
}

/*────────────────────────────────── POP-UP ABLAK LÉTREHOZÁSA ──────────────────────────────────*/

function pupUPletrehoz(cuccos) { // BA
    modalMeretValtozato("kicsi")
    
    $('#adatad').modal('show');

	var be = ajax_post(`/oszlopnev?tabla=${tablaNevesKell}`, 1); 
	document.getElementById("idebeteszt").innerHTML = "";

    var html = `<table id="datok">`

	for (var i=1; i < Object.values(be.tablak).length; i++){
        
        let mezoLeiras = be.tablak[i].DESCRIPTION;

        let aktualisErtek = Object.values(cuccos)[i];

        let beviteliMezo = generaljMezoHTML(mezoLeiras, aktualisErtek);

		if (cuccos == "gomb"){
                aktualisErtek = "";
                beviteliMezo = generaljMezoHTML(mezoLeiras, aktualisErtek);
                html += `<tr><td>${mezoLeiras}</td><td>${beviteliMezo}</td></tr>`;
		}
		else{
			html += `<tr><td>${mezoLeiras}</td><td>${beviteliMezo}</td></tr>`;
		}
	}

  	html += `</table>`
	
  	document.getElementById("idebeteszt").innerHTML += html;
  	var vege = "";
    var lablec = "";
    var fejlec = "";
  	if (cuccos != "gomb"){
        fejlec = "<h4>Modosítás</h4>";
        lablec +=  `<button type="button" onclick="adathozzaad('${Object.values(cuccos)[0]}')" class="btn blue_btn">Mentés</button>
                                    <button type="button" onclick="adat_torlese('${Object.values(cuccos)[0]}')" class="btn red_btn">Törlés</button>`;
    }
                                  
  	else{
        fejlec = `<h4>Adat hozzáadás</h4>`;
        lablec += `<button type="button" onclick="adathozzaad('new')" class="btn blue_btn btn_letrehozablak mentes_gomb">Mentés</button>`;
    }

    document.getElementById("cimHelye").innerHTML = fejlec;
  	document.getElementById("idebeteszt").innerHTML += vege;
    document.getElementById("gombokHelye").innerHTML = lablec;
}

/*──────────────────────── ADATOK SZERKESZTÉSE ÉS ÚJ ADATOK LÉTREHOZÁSA ────────────────────────*/

function adatModositas(gyogyszer, ertek, pacid){
    var be = ajax_post(`/adatmodositas?gyogyszer=${gyogyszer}&ertek=${ertek}&pacid=${pacid}`, 1);
    var szoveg = `Módosította a ${jelenelegiTaj} tajszámú páciens ${gyogyszer} gyógyszerének adagolását.`;
    ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);
    console.log(bejelentkezettUser + " Módosította a " + jelenelegiTaj + " tajszámú páciens " + gyogyszer + " gyógyszerének adagolását.");
}

function adathozzaad(allapot){
    
	var tabla = document.getElementById("datok");
	var oszlopok = "";
	var olszlopadat = "";
    var jonevek = ajax_post(`/mezonevkel?tabla=${tablaNevesKell}`, 1);

    for (let i = 0; i < tabla.rows.length; i++) {
        const sor = tabla.rows[i];
        const oszlopInfo = jonevek.tablak[i + 1];
        if (oszlopInfo) {
            oszlopok += oszlopInfo.VALUE + ",";
        }

        const input = sor.cells[1].querySelector("input, select");
        
        if (input) {
            olszlopadat += input.value.trim() + ",";
        } 
        else {
            olszlopadat += ",";
        }
	}
    
    var be = ajax_post(`/adatmentes?id=${allapot}&tabla=${tablaNevesKell}&oszlopok=${oszlopok.substring(0, oszlopok.length-1)}&adatok=${olszlopadat.substring(0, olszlopadat.length-1)}`, 1);
    
    if(be.statusz == "hiba"){
        Something_very_bad_happened(be.hiba);
    }
    
    var beb = ajax_post(`/adatlop?tabla=${tablaNevesKell}`, 1); 
    if (be.statusz == "siker") {
            document.getElementById("kereso").value = "";
            document.getElementById("mobile_kereso").value = "";
            Something_very_bad_happened(be.statusz)
            $('#adatad').modal('hide');
            tablaMegcsinal( beb);
            if(allapot != "new"){
                if (tablaNevesKell === "Paciensek"){
                    var szoveg = `Módosította a ${jelenelegiTaj} tajszámú páciens személyes adatait.`;
                    ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);
                    console.log(bejelentkezettUser + " Módosította a " + jelenelegiTaj + " tajszámú páciens személyes adatait.");
                } 

                else{
                    var szoveg = `Módosította a(z) ${allapot} azonosítójú adatot a(z) ${tablaNevesKell} táblában.`;
                    ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);
                    console.log(bejelentkezettUser + " Módosította a(z) " + allapot + " azonosítójú adatot a(z) " + tablaNevesKell + " táblában.");
                } 
            }
            else{
                var szoveg = `Új adatot hozott létre a(z) ${tablaNevesKell} táblában.`;
                ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);
                console.log(bejelentkezettUser + " Új adatokat hozott létre a(z) " + tablaNevesKell + " táblában.");
            }
        } 
}

//Táblázat adatának törlése az adott táblázatokból
function adat_torlese(id){
    var be = ajax_post(`/adattorlese?id=${id}&tabla=${tablaNevesKell}`, 1);
    var beb = ajax_post(`/adatlop?tabla=${tablaNevesKell}`, 1); 
    if(be.statusz == "siker"){
        Something_very_bad_happened(be.statusz);
        $('#adatad').modal('hide');
        tablaMegcsinal( beb);
        var szoveg = `Törölt egy adatot a(z) ${tablaNevesKell} táblából.`;
        ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);
        console.log(bejelentkezettUser + " Törölt egy adatot a(z) " + tablaNevesKell + " táblából.");
    }
}

//Páciens adat hozzáadás (személyes adatai nem ide tartoznak)
function P_adat_hozzaad(tableNeve, pacid){
    modalMeretValtozato("nagy");
    
    $('#adatad').modal('show');

    var be = ajax_post(`/getHozzaadniValo?tabla=${tableNeve}&pacid=${pacid}`, 1); 
    
    document.getElementById("idebeteszt").innerHTML = "";
    var html = `
                <div class="dual-listbox-container" style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                    <div style="width: 45%;">
                        <label for="available_list" class="form-label fw-bold">Elérhető:</label>
                        <select id="available_list" class="form-select kivalaszt_lista" multiple size="10">`;
                            if (be.tablak && be.tablak.length > 0) {
                                for (var item of be.tablak) {
                                    let id = Object.values(item)[0];
                                    let nev = Object.values(item)[1];
                                    html += `<option value="${id}">${nev}</option>`;
                                }
                            } else {
                                html += `<option disabled>Nincs több elem</option>`;
                            }
                            html += `
                        </select>   
                    </div>
                    <!-- Gombok a mozgatáshoz -->
                    <div class="d-flex flex-column" style="gap: 10px;">
                        <button type="button" class="btn blue_btn" onclick="moveOptions('available_list', 'selected_list')" title="Hozzáad">&gt;&gt;</button>
                        <button type="button" class="btn blue_btn" onclick="moveOptions('selected_list', 'available_list')" title="Eltávolít">&lt;&lt;</button>
                    </div>
                    <!-- 2. Listadoboz: Hozzáadni kívánt elemek -->
                    <div style="width: 45%;">
                        <label for="selected_list" class="form-label fw-bold">Kiválasztva:</label>
                        <select id="selected_list" class="form-select kivalaszt_lista" multiple size="10">
                            <!-- Kezdetben üres -->
                        </select>
                    </div>
                </div>
                <!-- Hibaüzenet helye -->
                <div id="modal_error_uzenet" class="mt-2"></div>
                <!-- Mentés Gomb -->
               `;
    var fejlec = `<h4>${tableNeve} hozzárendelése</h4>
                <p>Válaszd ki a bal oldali listából a hozzáadni kívánt elemeket, és helyezd át őket a jobb oldali listába.</p>
                `;
    var lablec = `<button type="button" onclick="P_adat_mentes_dual('${tableNeve}', ${pacid})" class="btn blue_btn modal_btn">Kiválasztottak hozzáadása</button>`;
    document.getElementById("cimHelye").innerHTML = fejlec;
    document.getElementById("idebeteszt").innerHTML = html;
    document.getElementById("gombokHelye").innerHTML = lablec;
}

//Páciens adat törlése (személyes adatai nem ide tartoznak)
function P_adat_torlese(tableNeve, pacid) {
    
    modalMeretValtozato("nagy");
    var be = ajax_post(`/getTorolniValo?tabla=${tableNeve}&pacid=${pacid}`, 1); 
    document.getElementById("idebeteszt").innerHTML = "";
    var html = `<div class="form-group">
                    <label for="delete_list" class="form-label fw-bold">Jelenleg hozzárendelve:</label>
                    <select id="delete_list" class="form-select" multiple size="10">`;

    if (be.tablak && be.tablak.length > 0) {
        for (var item of be.tablak) {
            let id = Object.values(item)[0];
            let nev = Object.values(item)[1];
            html += `<option value="${id}">${nev}</option>`;
        }
    } else {
        html += `<option disabled>Nincs törölhető adat</option>`;
    }

    html += `   </select>
                </div>
                
                <div id="modal_error_uzenet" class="mt-2"></div>`;

    var fejlec = "";
    var lablec = "";

    fejlec = `<h5>${tableNeve} törlése</h5>
                <p class="text-danger">Jelöld ki azokat az elemeket, amelyeket el szeretnél távolítani a pácienstől.</p>`;

    lablec = `<button  type="button" onclick="P_adat_torlese_vegrahajt('${tableNeve}', ${pacid})"  class="btn red_btn modal_btn">Kijelöltek törlése</button>`

    document.getElementById("cimHelye").innerHTML = fejlec;
    document.getElementById("idebeteszt").innerHTML = html;
    document.getElementById("gombokHelye").innerHTML = lablec;

    var modalEl = document.getElementById('adatad');
    var modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.show();
}

//Páciens adat törlése (popup gomb)
function P_adat_torlese_vegrahajt(tableNeve, pacid) {
    $('#adatad').modal('show');
    var select = document.getElementById('delete_list');
    var selectedIds = [];
    
    for (var option of select.options) {
        if (option.selected) {
            selectedIds.push(option.value);
        }
    }
    
    var errorDiv = document.getElementById("modal_error_uzenet");
    errorDiv.className = ""; 
    errorDiv.textContent = "";

    if (selectedIds.length > 0) {
        var idsString = selectedIds.join(',');
        
        var be = ajax_post(`/deletePaciensAdat?tabla=${tableNeve}&pacid=${pacid}&ids=${idsString}`, 1);

        if (be.success) {
           $('#adatad').modal('hide');
            pacMod(pacid, jelenelegiTaj);
            var szoveg = "Törölt egy adatot a(z) " + jelenelegiTaj + " tajszámú páciens " + tableNeve + " adataiból.";

            ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);

            console.log(bejelentkezettUser + " Törölt egy adatot a(z) " + jelenelegiTaj + " tajszámú páciens " + tableNeve + " adataiból.");

        } else {
            errorDiv.className = "mx-auto my-3 text-danger";
            errorDiv.textContent = be.error || "Hiba történt a törlés során.";
        }
    } 
    else {
        errorDiv.className = "mx-auto my-3 text-danger";
        errorDiv.textContent = "Nincs kijelölve elem a törléshez.";
    }
}

// Opciók mozgatása a két lista között
function moveOptions(fromSelectId, toSelectId) {
    var from = document.getElementById(fromSelectId);
    var to = document.getElementById(toSelectId);
    if (!from || !to) return; 

    var optionsToMove = [];
    for (var option of from.options) {
        if (option.selected) {
            optionsToMove.push(option);
        }
    }
    
    for (var option of optionsToMove) {
        to.appendChild(option); 
        option.selected = false; 
    }
}

//Páciens adat mentés (popup gomb)
function P_adat_mentes_dual(tableNeve, pacid) {

    var select = document.getElementById('selected_list'); 
    var selectedIds = [];

    for (var option of select.options) {
        selectedIds.push(option.value);
    }
    
    var errorDiv = document.getElementById("modal_error_uzenet");
    errorDiv.className = ""; 
    errorDiv.textContent = "";

    if (selectedIds.length > 0) {
        var idsString = selectedIds.join(',');
        
        var be = ajax_post(`/saveHozzaadottAdat?tabla=${tableNeve}&pacid=${pacid}&ids=${idsString}`, 1);

        if (be.success) {
            $('#adatad').modal('hide');
            pacMod(pacid, jelenelegiTaj);

            var szoveg = "Hozzáadott egy adatot a(z) " + jelenelegiTaj + " tajszámú páciens " + tableNeve + " adataihoz.";

            ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);

            console.log(bejelentkezettUser + " Hozzáadott egy adatot a(z) " + jelenelegiTaj + " tajszámú páciens " + tableNeve + " adataihoz.");

        } else {
            errorDiv.className = "mx-auto my-3 text-danger";
            errorDiv.textContent = be.error || "Ismeretlen hiba történt a mentés során.";
        }
    }

    if(document.getElementById("selected_list").length < 1){
        errorDiv.className = "mx-auto my-3 text-danger";
        errorDiv.textContent = "Nincs elem a 'Kiválasztva' listában. Húzzon át elemeket a bal oldalról.";
    }
    
}

// Ezeket a függvényen kívül hozd létre!
let snackbar_sor = [];
let snackbar_folyamatban = false;

function Something_very_bad_happened(hiba_kod) {
    // 1. Berakjuk az új üzenetet a várólistába
    snackbar_sor.push(hiba_kod);

    // 2. Ha épp nem látszik semmi, elindítjuk a megjelenítést
    if (!snackbar_folyamatban) {
        snackbar_megjelenites();
    }
}

function snackbar_megjelenites() {
    if (snackbar_sor.length === 0) {
        snackbar_folyamatban = false;
        return;
    }

    snackbar_folyamatban = true;
    var x = document.getElementById("snackbar");
    var aktualis_kod = snackbar_sor.shift(); // Kiveszi a legelső elemet a listából

    if (aktualis_kod == "siker") {
        x.innerHTML = "Sikeres művelet!";
        x.style.borderColor = "#00ff00";
        x.style.boxShadow = "0 0 5px rgba(0, 255, 0, 0.5)";
    } else {
        x.innerHTML = aktualis_kod;
        x.style.borderColor = "#ff0000";
        x.style.boxShadow = "0 0 5px rgba(255, 0, 0, 0.5)";
    }
    x.className = "show";

    setTimeout(function() {
        x.className = x.className.replace("show", "");
        setTimeout(snackbar_megjelenites, 100);
    }, 4400);
}

/*--------------------------------------------KORLAP PDF GENERÁLÁS----------------------------------------------------------------- */
function Korlap_Open(pacid){
    document.getElementById("sugo").onclick = infok("korlapos")
    
    var be = ajax_post(`/korlaplop?pacid=${pacid}`, 1);
    var beb = ajax_post(`/pacnev2?pac_id=${pacid}`, 1);
    if(be.tablak.length != 0){
        var html = "<div class='cardtarto'>";
            for(var i = 0; i < be.tablak.length; i++){
                html += `<div class="card tolt"  onclick="window.open('${Object.values(be)[0][i].LEIRAS}'), '_blank'"> <div class="card-body">`
                html += `<h3>${Object.values(beb)[0][0].NEV}</h3><p>Keletkezés ideje: ${be.tablak[i].DATUM} <br> Kórlap azonosító: ${be.tablak[i].K_ID} </p>`;
                html += `</div></div>`;
            }
            html += "</div>";
            document.getElementById("sav").innerHTML = html;
    }
    else{
        document.getElementById("sav").innerHTML = "Nincs kólapja a páciensnek!";
    }

    const vGomb = document.getElementById("visszaGomb");
    if (vGomb) {
    vGomb.onclick = function() {
       pacMod(pacid, jelenelegiTaj);
    };

    document.getElementById("Korlap_gomb").style.display = "block";
    if (document.getElementById("balKorGomb") != null){
        document.getElementById("balKorGomb").remove();
    }
}
}



async function uj_korlap(PAC_ID, OP_ID, OP_NEV) {
  try {
    var b = await ajax_post(`/korlap_adatok?pac_id=${PAC_ID}`, 1);
    console.log(b);
    const payload = {
      PAC_ID,
      OP_ID,
      OP_NEV,       
      be: Object.values(b)[0][0]
    };
    
    const response = await fetch('/generate_pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
   
    if (result.success) {
        alert(`PDF mentve a szerveren: ${result.path}`);
        Korlap_Open(PAC_ID);

        var szoveg = "Létrehozott egy új kórlapot a " + jelenelegiTaj + " tajszámú páciensnek.";

        ajax_post(`/naplo_mentes?user=${bejelentkezettUser}&muvelet=${encodeURIComponent(szoveg)}`, 1);

        console.log(bejelentkezettUser + " Létrehozott egy új kórlapot a " + jelenelegiTaj + " tajszámú páciensnek.");
    } 
    else {
        alert("Hiba történt a PDF generálás közben!");
    }
  } catch (err) {
    console.error(err);
    alert("Hiba történt a PDF generálás közben!");
  }
}

function generaljMezoHTML(leiras, ertek) {
    const datumMezok = ["Ellátás kezdete", "Születési idő", "Távozás ideje", "Dátum"];
    const allapotMezok = ["Járóbeteg", "Fekvőbeteg", "Kontrollvizsgálat"];
    const nemMezok = ["Férfi", "Nő"];
    const szamosMezok = ["Mennyiség", "Nyugdíjas", "Irányítószám"]
    const jogosultMezok = ["admin", "apolo"]

    const mertekegysegMezok = ajax_post("/mertekMezok?", 1)

    if (leiras === "Jogosultság"){
        let options = jogosultMezok.map(a => `<option value="${a}" ${a === ertek ? 'selected' : ''}>${a}</option>`).join('');
        return `<select class="create-input custom-select">${options}</select>`;
    }

    else if (leiras === "Mértékegység") {
        var dolgok = "";
        for(var i = 0; i < mertekegysegMezok.mezok.length; i++){
            var asd = mertekegysegMezok.mezok[i].VALUE;
             dolgok += `<option value="${asd}" ${asd === ertek ? 'selected' : ''}>${asd}</option>`;
        }
        return `<select class="create-input custom-select">${dolgok}</select>`;
    }

    else if (leiras === "Állapot") {
        let options = allapotMezok.map(a => `<option value="${a}" ${a === ertek ? 'selected' : ''}>${a}</option>`).join('');
        return `<select class="create-input custom-select">${options}</select>`;
    }

    else if (leiras === "Neme") {
        let options = nemMezok.map(n => `<option value="${n}" ${n === ertek ? 'selected' : ''}>${n}</option>`).join('');
        return `<select class="create-input custom-select">${options}</select>`;
    }

    let tipus = "";

    if (datumMezok.includes(leiras)){
        tipus = "date";
        return `<input id="${leiras[0]}_DATUM" onblur="vizsgalat(this, '${leiras}')" value="${ertek}" type="${tipus}" class="create-input custom-date-input">`;
    }

    else if (szamosMezok.includes(leiras)){
        tipus = "number";
        return `<input onblur="vizsgalat(this, '${leiras}')" value="${ertek}" type="${tipus}" min="0" max="100000000" class="create-input input-with-arrows">`;
    }

    else tipus = "text";
    return `<input value="${ertek}" type="${tipus}" class="create-input">`;
}

function vizsgalat(elem, leiras){
    let elk;
    let tav;
    let szul;

    if (elem.type == "date"){
        elk = new Date(E_DATUM.value);
        tav = new Date(T_DATUM.value);
        szul = new Date(S_DATUM.value);
    }

    if (leiras === "Születési idő"){
        if (szul > Date.now()){
            elem.value = null;
            Something_very_bad_happened("A születési idő nem lehet későbbi, mint a jelenlegi dátum!");
        }
        else if (szul > elk){
            E_DATUM.value = null;
            T_DATUM.value = null;
            Something_very_bad_happened("Az ellátás kezdete nem lehet korábbi, mint a születési idő!");
        }
    }

    if (leiras === "Ellátás kezdete"){
        if (szul > elk){
            elem.value = null;
            Something_very_bad_happened("Az ellátás kezdete nem lehet korábbi, mint a születési idő!");
        }
        else if (elk > tav){
            elem.value = null;
            Something_very_bad_happened("Az ellátás kezdete nem lehet későbbi, mint a távozás ideje!");
        }
        else if (elk > Date.now()){
            elem.value = null;
            Something_very_bad_happened("Az ellátás kezdete nem lehet későbbi, mint a jelenlegi dátum!");
        }
    }

    if (leiras === "Távozás ideje"){
        if(szul > tav){
            elem.value = null;
            Something_very_bad_happened("A születési idő nem lehet későbbi, mint a távozás ideje!");
        }
        else if (elk > tav){
        elem.value = null;
        Something_very_bad_happened("A távozás ideje nem lehet korábbi, mint az ellátás kezdete!");
        }
    }
    
    if (leiras === "Nyugdíjas" && parseInt(elem.value) < 0){
        elem.value = 0;
        Something_very_bad_happened("A nyugdíj nem lehet kisebb mint nulla!");
    }

    else return;
}