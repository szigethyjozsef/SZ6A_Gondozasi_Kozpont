function ajax_get( urlsor, hova, tipus, aszinkron ) { // html oldalak beszúrására használjuk
	$.ajax({url: urlsor, type:"get", async:aszinkron, cache:false, dataType:tipus===0?'html':'json',
		beforeSend:function(xhr) { },
		success: function(data) { $(hova).html(data); },
		error: function(jqXHR, textStatus, errorThrown) {üzen(jqXHR.responseText, "danger");},
		complete: function() { }
	});
	return true;
};

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


//-----------------------------------


// Jelszó megtekintés SZJ
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

function focusField(targetId, requiredActiveId) {
    const activeElement = document.activeElement;
    const tragetElement = document.getElementById('password');
    if (activeElement.id === 'password') {
        targetElement.focus();
    }
}


/*
function focusField(id) {
    const targetElement = document.getElementById('password');
    if (targetElement) {
        targetElement.focus();
    }
}*/



//Bejelentkezés fülön titlja a visszalépést.
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
}
*/



//ENTER tovabbgombra lépés
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("tovabb_gomb").click();
  }
});




//-----------------------------------


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
      if(be.van > 0){
        
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


/*
<div id="ablak" class="d-flex vh-100 bg-dark">
        <div id="login" class="container py-4 col-sm-12">
            <div class="h3 mb-5 mt-5 sm-4" id="befel">Bejelentkezés</div>
            <form >
                <div class="mx-auto w-lg-auto form-group my-2" style="max-width: 400px;">
                    <input type="text" id="felhasz" class="form-control" placeholder="Felhasználónév">
                </div>
                <div class="mx-auto my-3" style="max-width: 400px; position: relative;">
                    <input type="password" id="password" class="form-control" placeholder="Jelszó">
                    <button class="btn" type="button" id="password_gomb" style="position: absolute; right: 0; top: 0; bottom: 0; border: none; background: transparent;">
                        <img id="password_kep" class="filter-feher" src="kepek/view.svg" alt="Jelszó mutatása/elrejtése" style="height: 100%;">
                    </button>
                </div>
                <div id="figyelmeztet" class="mx-auto my-3 text-danger"></div>
            </form>
            <button id="tovabb-gomb" onclick="iHopeLogin()" type="submit" class=" btn my-2 py-2 px-5">Tovább</button>
        </div>
    </div>
*/

//--------------------------ADMIN----------------------------------

function menukitolt(){
  var be = ajax_post(`/betolt`, 1); 
 // console.log(be.tablak[1]['Tables_in_2021SZ_barabas_gergo']) 
 for (asd of be.tablak){
    //console.log(asd['Tables_in_2021SZ_barabas_gergo'])
    document.getElementById("sidebar").innerHTML += `<a href="#" class="nav-link" data-page="${asd['Tables_in_2021SZ_barabas_gergo']}">${asd['Tables_in_2021SZ_barabas_gergo']}</a>`
  }
}



function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
  document.getElementById('sidebarOverlay').classList.toggle('show');
}

const contentMap = {
  home: `
    <h2>Főoldal</h2>
    <p>Üdvözlünk az admin felületen!</p>
  `,
  fonts: `
    <h2>Betűtípusok</h2>
    <p>Itt találhatók az elérhető betűtípusok:</p>
    <ul>
      <li>Kaushan Script</li>
      <li>Lexend</li>
      <li>Lato</li>
      <li>Inter</li>
      <li>Ubuntu</li>
      <li>Noto Sans Telugu</li>
    </ul>
  `,
  settings: `
    <h2>Beállítások</h2>
    <p>Itt módosíthatod az oldal beállításait.</p>
  `,
  contact: `
    <h2>Kapcsolat</h2>
    <p>Elérhetőségeink: <a href="mailto:admin@valami.hu">admin@valami.hu</a></p>
  `,
  Felhasznalok: `
    itt talalhatók a feljhasznalok
  `
  
};

$(document).ready(function () {
  // ESEMÉNY DELEGÁLÁS – MŰKÖDIK DINAMIKUS ELEMEKKEL IS
  $('#sidebar').on('click', '.nav-link', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    const content = contentMap[page] || '<p>A tartalom nem található.</p>';
    $('.scrollable-content').html(content);

    // Aktív menüpont kijelölés
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    // Sidebar bezárása mobilon
    $('#sidebar').removeClass('show');
    $('#sidebarOverlay').removeClass('show');
  });
});