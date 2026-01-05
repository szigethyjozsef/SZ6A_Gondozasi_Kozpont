/*───────────────────────────────────────────────────────────────────────────────────────────────────────*/
/*──────────────────────────────────────────── BEJELENTKEZÉS ────────────────────────────────────────────*/
/*───────────────────────────────────────────────────────────────────────────────────────────────────────*/

function ajax_post( urlsor, tipus ) { // json restapi-hoz használjuk
  	var s = "";
  	$.ajax({url: urlsor, type:"post", async:false, cache:false, dataType:tipus===0?'html':'json',
		beforeSend:function(xhr) { },
		success: function(data) { s = data; },
		error: function(jqXHR, textStatus, errorThrown) {üzen(jqXHR.responseText, "danger");},
		complete: function() { }
  	});
  	return s;
};

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

/*─────────────────────────────── JELSZÓ MEZŐ FÓKUSZBAN TARTÁSA ────────────────────────────────*/

/*document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.getElementById('password_kep');

    if (!passwordField || !toggleButton) return;

    toggleButton.addEventListener('mousedown', function(event) {
        event.preventDefault(); 
        toggleVisibility(passwordField, toggleButton);
        passwordField.focus();
    });

    toggleButton.addEventListener('click', function(event) {
        passwordField.focus();
    });
});*/

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
    
    toggleButton.addEventListener('mousedown', function(event) {
        event.preventDefault();
        toggleVisibility(passwordField);
        passwordField.focus();
    });
});

/*───────────────────────────── BEJELENTKEZÉS VISSZALÉPÉS TILTÁSA ──────────────────────────────*/

/*function tiltas(){
  // Vissza/előre kezelés login oldalon
  document.getElementById("password").value = "";
  window.history.pushState(null, "", window.location.href);
  
  // popstate esemény, ha visszalép a user ide
  window.addEventListener("popstate", function () {
      window.history.pushState(null, "", window.location.href);
  });

  // pageshow, ha cache-ből jön vissza
  window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
          window.history.pushState(null, "", window.location.href);
          document.getElementById("password").value = "";
      }
  });
}*/

/*──────────────────────────────────── ENTER TOVÁBBLÉPÉS ───────────────────────────────────────*/

document.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		document.getElementById("tovabb_gomb").click();
	}
});

/*─────────────────────────────── BEJELENTKEZÉS JOGOSULTSÁGOK ──────────────────────────────────*/

// Bejelntkezéshez "TOVABB" gomb BG
function iHopeLogin() {
    var user = felhasz.value;
    //console.log(user);
    var pass = password.value;
    //console.log(pass);
    if (user != "" & pass != "") {
      // console.log("asdafs")
      figyelmeztet.innerHTML = "";
      var be = ajax_post(`/login?user=${user}&passwd=${pass}`, 1);  
      //console.log(be.db)
      if(be.van != ""){
        
        if (be.db == 0){
          window.location.href = "/admin.html";
        }
        else if (be.db == 1){
          window.location.href = "/orvos.html";
        }
        else if (be.db == 2){
          window.location.href = "/nover.html";
        }
        else if (be.db == 3){
          window.location.href = "/rokon.html";
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

/*──────────────────────────────────────────────────────────────────────────────────────────────*/
/*─────────────────────────────────────────── ADMIN ────────────────────────────────────────────*/
/*──────────────────────────────────────────────────────────────────────────────────────────────*/

function menukitolt() {
  	var be = ajax_post(`/betolt`, 1); 

  	for (var asd of be.tablak) {
		var tablaNev = asd['Tables_in_2021SZ_barabas_gergo'];
		
		if (!tablaNev.includes("_") && tablaNev != "Config" && tablaNev != "Naplo") {
			document.getElementById("sidebar").innerHTML += `
			<a href="javascript:void(0)" class="nav-link" data-page="${tablaNev}" name="${tablaNev}" onclick="loadPage(this, '${tablaNev}')"> ${tablaNev} </a>`;
		}
  	}
	// Betöltéskor a legelső menü elemet betölti
    const navLinks = document.getElementById("sidebar").querySelectorAll(".nav-link");
    if (navLinks.length > 0) {
        navLinks[0].classList.add("active");
        loadPage(navLinks[0], navLinks[0].getAttribute('data-page'));
		//console.log(navLinks[0]);
    }
	var be = ajax_post(`/emberadat?`, 1);
	var beb = ajax_post(`/emberjog?`, 1);
	if (be.tablak.length == 0)  window.location.href = "/index.html";
	document.getElementById('txt_felhasznalo').innerHTML = `${Object.values(be.tablak[0])[0]}`;
	document.getElementById('txt_jogosultsag').innerHTML = `${Object.values(beb.tablak[0])[1]}`;
	
}

/*──────────────────────────────────── TELEFON OLDALSÓ MENÜ ────────────────────────────────────*/

function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('show');
	document.getElementById('sidebarOverlay').classList.toggle('show');
}

/*─────────────────────────── TÁBLA BETÖLTÉSE AZ OLDAL MEGNYITÁSAKOR ───────────────────────────*/

var tablaNevesKell;

function loadPage(element, tablaNeve) {
	tablaNevesKell = tablaNeve;
	var be = ajax_post(`/adatlop?tabla=${tablaNeve}`, 1); 
	
	var mezok = Object.keys(be.tablak[0]);
	
	tablaMegcsinal(mezok, be)

	// Aktív osztály
	document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
	element.classList.add('active');
	

	// Sidebar mobilon
	document.getElementById('sidebar')?.classList.remove('show');
	document.getElementById('sidebarOverlay')?.classList.remove('show');

	
}

/*────────────────────────────────────── TÁBLA FELTÖLTÉSE ──────────────────────────────────────*/





function tablaMegcsinal(mezok, be){
	document.querySelector('.tablakIdeTolt').innerHTML ="";	
	var ideges = (Object.values(be.tablak[0])[0] +Object.values(be.tablak[0])[1] +Object.values(be.tablak[0])[2] +Object.values(be.tablak[0])[3]).toString();

	if (tablaNevesKell == "Rokonok" || tablaNevesKell == "Paciensek" || tablaNevesKell == "Koralap") {
		if (ideges != "üres"){
			var html = `<div class="cardtarto">`;
			for (var i = 0; i < be.tablak.length; i++){
				html += `<div class="card tolt" onclick='pacMod(${Object.values(be.tablak[i])[0]})'><div class="card-body">`;
				
					html += `<h5 class="card-title ">${Object.values(be.tablak[i])[1]}</h5>
							<p>${Object.values(be.tablak[i])[7]}</p>
					
					`;
				
				html += `</div></div>`;
			}
			html += "</div>";
			document.querySelector('.tablakIdeTolt').innerHTML = html;
		}
		else{
			document.querySelector('.tablakIdeTolt').innerHTML = "Nincs találat...	";
		}
		
	}
	
		
	
	

	else
	{
		var beb= ajax_post(`/mezonevkel?tabla=${tablaNevesKell}`, 1);
		document.querySelector('.tablakIdeTolt').innerHTML ="";	
		var html = `<table id="tesztelos">`;
		
		if(ideges != "üres") {
			html += `<thead><tr>`;
			for (var mez of beb.tablak) { 
					//console.log(Object.values(mez)[3]);
					html += `<th>${Object.values(mez)[3]}</th>`;
			}
			html += `</tr></thead><tbody>`;
			for (var sor of be.tablak) {
				html += `<tr data-bs-toggle="modal" data-bs-target="#adatad" onclick='pupUPletrehoz(${JSON.stringify(sor)})'>`;
				for (var ertek of Object.values(sor)) {
					if(typeof ertek === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(ertek))
					{
						html += `<td>${ertek.split("T")[0]}</td>`;
					}
					else {
						html += `<td>${ertek}</td>`;
					}
				}
				html += `</tr>`;
			}
			html += `</tbody>`;
		}
		else {
			html += '<thead><tr><td rowspan="2">ÜRES</td><tr></thead>'
		}
		html += `</table>`;
		document.querySelector('.tablakIdeTolt').innerHTML = html;

	}
}



/*─────────────────────────────── BETÖLTÉS AZ OLDAL INDÍTÁSAKOR ────────────────────────────────*/

window.addEventListener('DOMContentLoaded', function () {
    const firstNav = document.querySelector('.nav-link');
    if (firstNav) {
        const page = firstNav.getAttribute('data-page');
        loadPage(null, firstNav, page);
    }
});

/*────────────────────────────────────── KERESÉS TÁBLÁBAN ──────────────────────────────────────*/

async function keres() { //  BG
	try {
		const be = await ajax_post(`/kereses?tabla=${tablaNevesKell}&ertek=${kereso.value}`, 1);
		if (be.tablak && be.tablak[0]) {
			var mezok = Object.keys(be.tablak[0]);
			tablaMegcsinal(mezok, be);
		}
		else {
			tablaMegcsinal([], be);
		}
	}
	catch (err) {
		console.error('Hiba történt:', err);
		tablaMegcsinal([], {});
	}
}

/*────────────────────────────────── Páciens módosítás ──────────────────────────────────*/
/*
function pacKattBetolt(be, oszlopok, tombos) {
    let html = "";

	html += `<table id="datok">`;
    html += `<thead><tr>`;
    for (let idx of tombos) {
        html += `<th>${Object.values(oszlopok.tablak)[idx].DESCRIPTION}</th>`;
		//console.log(Object.values(oszlopok.tablak)[0].DESCRIPTION.split(" ")[0]);	
    }
    html += `</tr></thead><tbody>`;

    for (var sor of be.tablak) {
        html += `<tr>`;
        for (var ertek of Object.values(sor)) {
            html += `<td>${ertek}</td>`;
        }
        html += `</tr>`;
    }

    html += `</tbody></table>
			 <div id="gombsor"><button type="button" data-bs-toggle="modal" data-bs-target="#adatad" onclick="P_adat_hozzaad('${Object.values(oszlopok.tablak)[0].DESCRIPTION.split(" ")[0]}')" class="btn kartya_btn">Adat hozzáadása</button>
			 <button type="button" data-bs-toggle="modal" data-bs-target="#adatad" onclick="P_adat_torlese()" class="btn btn_torles_szin kartya_btn">Adat törlés</button></div>
			 `;
    return html;
}
*/






// MÓDOSÍTOTT FÜGGVÉNY: pacKattBetolt


// 1. MÓDOSÍTÁS: pacKattBetolt
// Frissítsd ezt a függvényt, hogy a Törlés gombnak is átadja a paramétereket!
function pacKattBetolt(be, oszlopok, tombos, pacid) {
    let html = "";

    html += `<table id="datok">`;
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

    // Táblanév helyes képzése
    var singularTableNeve = Object.values(oszlopok.tablak)[0].DESCRIPTION.split(" ")[0];
    var pluralTableNeve = singularTableNeve;

    if (singularTableNeve === 'Betegség') {
        pluralTableNeve = 'Betegsegek';
    } else if (singularTableNeve === 'Gyógyszer') {
        pluralTableNeve = 'Gyogyszerek';
    } else if (singularTableNeve === 'Rokon') {
        pluralTableNeve = 'Rokonok';
    }

    html += `</tbody></table>
             <div id="gombsor">
                <button type="button" data-bs-toggle="modal" data-bs-target="#adatad" onclick="P_adat_hozzaad('${pluralTableNeve}', ${pacid})" class="btn create-btn kartya_btn">Adat hozzáadása</button>
                <!-- JAVÍTÁS ITT: Átadjuk a pluralTableNeve-t és a pacid-t a törlésnek is -->
                <button type="button" data-bs-toggle="modal" data-bs-target="#adatad" onclick="P_adat_torlese('${pluralTableNeve}', ${pacid})" class="btn create-btn delete-btn kartya_btn">Adat törlés</button>
             </div>
             `;
    return html;
}




/*
function pacKattBetolt(be, oszlopok, tombos, pacid) { 
    let html = "";

    html += `<table id="datok">`;
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

    var tableNeve = Object.values(oszlopok.tablak)[0].DESCRIPTION.split(" ")[0]; 

    html += `</tbody></table>
             <div id="gombsor">
                <!-- MÓDOSÍTÁS: pacid (cuccos) átadása a P_adat_hozzaad-nak -->
                <button type="button" data-bs-toggle="modal" data-bs-target="#adatad" onclick="P_adat_hozzaad('${tableNeve}', ${pacid})" class="btn btn_letrehoz_szin ">Adat hozzáadása</button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#adatad" onclick="P_adat_torlese()" class="btn btn_torles_szin ">Adat törlés</button>
             </div>
             `;
    return html;
}
*/



// MÓDOSÍTOTT FÜGGVÉNY: pacMod

function pacMod(cuccos){ 
    var html = "";
    var be = ajax_post(`/pacmod?pacid=${cuccos}`, 1);
    var oszlopok = ajax_post(`/oszlopnev?tabla=Paciensek`, 1);
    html += `<div class="pacSokAdatCard"> `;
    html += `<div class="col-3 card pac"> <h3>Adatok</h3> <button type="button" onclick="P_adat_metes()" class="btn btn_letrehoz_szin">Mentés</button>`
    html += `<table id="datok">`;
    for (var mez of be.tablak) {
        for(var i = 1; i < Object.values(mez).length-1 ; i++){
            html += `<tr><td>${oszlopok.tablak[i].DESCRIPTION}</td><td><input value="${Object.values(mez)[i]}" type="text" class="create-input"></td></tr>`;
        }
    }
    html += `</table>`
    html += `</div>`;

    /******************************************* */
    var tombos = [];

    be = ajax_post(`/pacmod2?pacid=${cuccos}`, 1);
    html += `<div class="col-3 card pac"> <h3>Betegsegek</h3>`
    oszlopok = ajax_post(`/oszlopnev?tabla=Betegsegek`, 1);
    tombos = [0, 1]

    html += pacKattBetolt(be, oszlopok, tombos, cuccos); 
    html += `</div>`;

/********************************************* */
    
    be = ajax_post(`/pacmod3?pacid=${cuccos}`, 1);
    html += `<div class="col-3 card pac"> <h3>Gyogyszerek</h3>`
    oszlopok = ajax_post(`/oszlopnev?tabla=Gyogyszerek`, 1);
    tombos = [0, 1]
    html += pacKattBetolt(be, oszlopok, tombos, cuccos); 
    html += `</div>`;
/****************************************** */

    be = ajax_post(`/pacmod4?pacid=${cuccos}`, 1);
    html += `<div class="col-3 card pac"> <h3>Rokonok</h3>`
    oszlopok = ajax_post(`/oszlopnev?tabla=Rokonok`, 1);
    tombos = [0, 1]

    html += pacKattBetolt(be, oszlopok, tombos, cuccos); 
    html += `</div>`;

    html += `</div>`;
    document.getElementById("sav").innerHTML = html;
}







/*
function pacMod(cuccos){
	var html = "";
	var be = ajax_post(`/pacmod?pacid=${cuccos}`, 1);
	var oszlopok = ajax_post(`/oszlopnev?tabla=Paciensek`, 1);
	html += `<div class="pacSokAdatCard"> `;
	html += `<div class="col-3 card pac"> <h3>Adatok</h3> <button type="button" onclick="P_adat_metes()" class="btn btn_letrehoz_szin">Mentés</button>`
	html += `<table id="datok">`;
  	for (var mez of be.tablak) {
		for(var i = 1; i < Object.values(mez).length-1 ; i++){
			html += `<tr><td>${oszlopok.tablak[i].DESCRIPTION}</td><td><input value="${Object.values(mez)[i]}" type="text" class="create-input"></td></tr>`;
			
		}

	}
	
	
	
  	html += `</table>`
	html += `</div>`;



	var tombos = [];

	be = ajax_post(`/pacmod2?pacid=${cuccos}`, 1);
	html += `<div class="col-3 card pac"> <h3>Betegsegek</h3>`
	oszlopok = ajax_post(`/oszlopnev?tabla=Betegsegek`, 1);
	tombos = [0, 1]

	html += pacKattBetolt(be, oszlopok, tombos);
	html += `</div>`;


	

	be = ajax_post(`/pacmod3?pacid=${cuccos}`, 1);


	html += `<div class="col-3 card pac"> <h3>Gyogyszerek</h3>`
	oszlopok = ajax_post(`/oszlopnev?tabla=Gyogyszerek`, 1);
	tombos = [0, 1]
	html += pacKattBetolt(be, oszlopok, tombos);
	html += `</div>`;



	be = ajax_post(`/pacmod4?pacid=${cuccos}`, 1);
	html += `<div class="col-3 card pac"> <h3>Rokonok</h3>`
	oszlopok = ajax_post(`/oszlopnev?tabla=Rokonok`, 1);
	tombos = [0, 1]

	html += pacKattBetolt(be, oszlopok, tombos);
	html += `</div>`;

	html += `</div>`;
	document.getElementById("sav").innerHTML = html;
	           
}


*/



/*────────────────────────────────── POP-UP ABLAK LÉTREHOZÁSA ──────────────────────────────────*/

function pupUPletrehoz(cuccos) { // BA
	var be = ajax_post(`/oszlopnev?tabla=${tablaNevesKell}`, 1); 
	document.getElementById("idebeteszt").innerHTML = "";
	var html = `<table id="datok">`
	
	for (var i=1; i < Object.values(be.tablak).length; i++){
		if (cuccos == "gomb"){
			//console.log(be.tablak[i].DESCRIPTION);
			html += `<tr><td>${be.tablak[i].DESCRIPTION}</td><td><input type="text" class="create-input"></td></tr>`;
		}
		else{
			html += `<tr><td>${be.tablak[i].DESCRIPTION}</td><td><input value="${Object.values(cuccos)[i]}" type="text" class="create-input"></td></tr>`;
		}
	}


  	html += `</table>`
	
  	document.getElementById("idebeteszt").innerHTML += html;
  	var vege = "";

  	if (cuccos != "gomb") vege +=  `<button type="button" onclick="adathozzaad()" class="btn btn_letrehoz_szin btn_letrehozablak">Mentés</button>
                                    <button type="button" class="btn btn_torles_szin btn_letrehozablak">Törlés</button>`;
                                  
  	else vege += `<button type="button" onclick="adathozzaad()" class="btn btn_letrehoz_szin btn_letrehozablak">Mentés</button>`;

  	document.getElementById("idebeteszt").innerHTML += vege;
}

/*──────────────────────── ADATOK SZERKESZTÉSE ÉS ÚJ ADATOK LÉTREHOZÁSA ────────────────────────*/

function adathozzaad(){
	var tabla = document.getElementById("datok");
	var inputosOszlopok = new Set();
	var oszlopok = "";
	var olszlopadat = "";


	for (var sor of tabla.rows) {
		let cells = sor.cells;
		for (var i = 0; i < cells.length; i++) {
			if (cells[i].querySelector("input")) {
				inputosOszlopok.add(i);
			}
		}
	}


	for (var sor of tabla.rows) {
		let cells = sor.cells;
		for (var i = 0; i < cells.length; i++) {
			if (!inputosOszlopok.has(i)) {
				oszlopok += cells[i].textContent.trim() + ",";
			}
			else{
				let input = cells[i].querySelector("input");
				if (input) {
					olszlopadat += input.value + ",";
				}
				else {
					olszlopadat += ",";
				}
			}
		}
	}
	console.log(oszlopok.substring(0, oszlopok.length-1));
	console.log(olszlopadat.substring(0, olszlopadat.length-1));
}

// ÚJ FÜGGVÉNY: P_adat_hozzaad (A kérésed alapján)

function P_adat_hozzaad(tableNeve, pacid){


    try {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());
        
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    } catch (e) {
        console.error("Hiba történt a proaktív modal takarítás során:", e);
    }



	
    var be = ajax_post(`/getHozzaadniValo?tabla=${tableNeve}&pacid=${pacid}`, 1); 
    
    document.getElementById("idebeteszt").innerHTML = "";
    var html = `<h5>${tableNeve} hozzárendelése</h5>
                <p>Válaszd ki a bal oldali listából a hozzáadni kívánt elemeket, és helyezd át őket a jobb oldali listába.</p>
                
                <div class="dual-listbox-container" style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                    
                    <!-- 1. Listadoboz: Elérhető elemek -->
                    <div style="width: 45%;">
                        <label for="available_list" class="form-label fw-bold">Elérhető:</label>
                        <select id="available_list" class="form-select" multiple size="10">`;

    if (be.tablak && be.tablak.length > 0) {
        for (var item of be.tablak) {
            let id = Object.values(item)[0];
            let nev = Object.values(item)[1];
            html += `<option value="${id}">${nev}</option>`;
        }
    } else {
        html += `<option disabled>Nincs több elem</option>`;
    }
    
    html += `       </select>
                    </div>

                    <!-- Gombok a mozgatáshoz -->
                    <div class="d-flex flex-column" style="gap: 10px;">
                        <button type="button" class="btn btn-secondary" onclick="moveOptions('available_list', 'selected_list')" title="Hozzáad">&gt;&gt;</button>
                        <button type="button" class="btn btn-secondary" onclick="moveOptions('selected_list', 'available_list')" title="Eltávolít">&lt;&lt;</button>
                    </div>

                    <!-- 2. Listadoboz: Hozzáadni kívánt elemek -->
                    <div style="width: 45%;">
                        <label for="selected_list" class="form-label fw-bold">Kiválasztva:</label>
                        <select id="selected_list" class="form-select" multiple size="10">
                            <!-- Kezdetben üres -->
                        </select>
                    </div>
                </div>
                
                <!-- Mentés Gomb -->
                <div class="mt-3">
                    <button type="button" onclick="P_adat_mentes_dual('${tableNeve}', ${pacid})" class="btn btn_letrehoz_szin">Kiválasztottak hozzáadása</button>
                </div>
                <!-- Hibaüzenet helye -->
                <div id="modal_error_uzenet" class="mt-2"></div>
               `;

    document.getElementById("idebeteszt").innerHTML = html;
}






// 2. ÚJ FÜGGVÉNY: P_adat_torlese
// Ez listázza ki a már hozzárendelt elemeket, hogy törölni lehessen őket.
function P_adat_torlese(tableNeve, pacid) {
    
    // Proaktív takarítás (a sötét háttér hiba elkerülésére)
    try {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    } catch (e) { console.error(e); }

    // 1. Backend hívás: kérjük le a JELENLEGI elemeket (amiket törölni lehet)
    var be = ajax_post(`/getTorolniValo?tabla=${tableNeve}&pacid=${pacid}`, 1); 

    document.getElementById("idebeteszt").innerHTML = "";
    
    var html = `<h5>${tableNeve} törlése</h5>
                <p class="text-danger">Jelöld ki azokat az elemeket, amelyeket el szeretnél távolítani a pácienstől.</p>
                
                <div class="form-group">
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
                
                <div class="mt-3">
                    <button type="button" onclick="P_adat_torlese_vegrahajt('${tableNeve}', ${pacid})" class="btn btn-danger">Kijelöltek törlése</button>
                </div>
                <div id="modal_error_uzenet" class="mt-2"></div>`;

    document.getElementById("idebeteszt").innerHTML = html;

    // Modal megjelenítése
    var modalEl = document.getElementById('adatad');
    var modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.show();
}

// 3. ÚJ FÜGGVÉNY: A tényleges törlés végrehajtása
function P_adat_torlese_vegrahajt(tableNeve, pacid) {
    var select = document.getElementById('delete_list');
    var selectedIds = [];
    
    // Kijelölt elemek összegyűjtése
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
        
        // Backend hívás a törléshez
        var be = ajax_post(`/deletePaciensAdat?tabla=${tableNeve}&pacid=${pacid}&ids=${idsString}`, 1);

        if (be.success) {
            var modalEl = document.getElementById('adatad');
            var modalInstance = bootstrap.Modal.getInstance(modalEl);
            
            if (modalInstance) {
                modalEl.addEventListener('hidden.bs.modal', function () {
                    setTimeout(function() {
                        // Takarítás és frissítés
                        const backdrops = document.querySelectorAll('.modal-backdrop');
                        backdrops.forEach(backdrop => backdrop.remove());
                        document.body.classList.remove('modal-open');
                        document.body.style.overflow = '';
                        
                        pacMod(pacid); // Oldal frissítése
                    }, 50);
                }, { once: true });
                modalInstance.hide();
            } else {
                pacMod(pacid);
            }
        } else {
            errorDiv.className = "alert alert-danger";
            errorDiv.textContent = be.error || "Hiba történt a törlés során.";
        }
    } else {
        errorDiv.className = "alert alert-warning";
        errorDiv.textContent = "Nincs kijelölve elem a törléshez.";
    }
}






// ÚJ SEGÉDFÜGGVÉNY: Opciók mozgatása a két lista között
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

            var modalEl = document.getElementById('adatad');
            var modalInstance = bootstrap.Modal.getInstance(modalEl);
            
            if (modalInstance) {
                

                modalEl.addEventListener('hidden.bs.modal', function () {
                    
                    setTimeout(function() {
                        

                        const backdrops = document.querySelectorAll('.modal-backdrop');
                        backdrops.forEach(backdrop => backdrop.remove());
                        

                        document.body.classList.remove('modal-open');
                        document.body.style.overflow = '';
                        document.body.style.paddingRight = '';


                        pacMod(pacid);

                    }, 50); 

                }, { once: true });


                modalInstance.hide();

            } else {

                pacMod(pacid);
            }

        } else {

            errorDiv.className = "alert alert-danger";
            errorDiv.textContent = be.error || "Ismeretlen hiba történt a mentés során.";
        }

        errorDiv.className = "alert alert-warning";
        errorDiv.textContent = "Nincs elem a 'Kiválasztva' listában. Húzzon át elemeket a bal oldalról.";
    }
}