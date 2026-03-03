//-----------------------------------

const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require('express-session');

const fs = require("fs");
const path = require("path");

const { jsPDF } = require('jspdf')

app.use(express.static("public"))
app.use(express.json())
const port = 9061; 

// MySQL kapcsolat
const conn = mysql.createPool({
    host: "193.227.198.214", //local: 10.2.0.11 ||||  193.227.198.214
    user: "barabas.gergo",          
    password: "Csany4181",   
    port: "9406", //local port: 3306 ||||  9406
    database: "2021SZ_barabas_gergo",
    multipleStatements: true,
    dateStrings: true
});

/*  //Localllllllllllllllllllllllll
const conn = mysql.createPool({
    host: "193.227.198.214", //local: 10.2.0.11 ||||  193.227.198.214
    user: "barabas.gergo",          
    password: "Csany4181",   
    port: "9406", //local port: 3306 ||||  9406
    database: "2021SZ_barabas_gergo",
    multipleStatements: true,
    dateStrings: true
});
*/

/*   //SZERoooooooooooooooooooooooo
const conn = mysql.createPool({
    host: "10.2.0.11", //local: 10.2.0.11 ||||  193.227.198.214
    user: "barabas.gergo",          
    password: "Csany4181",   
    port: "3306", //local port: 3306 ||||  9406
    database: "2021SZ_barabas_gergo",
    multipleStatements: true,
    dateStrings: true
});
*/

const sessionadat = session({
	secret: 'replace-with-secure-secret',
	resave: false,
	saveUninitialized: false,
	cookie: {
	  httpOnly: true,
	  secure: false,
	  sameSite: "lax",
	  maxAge: 1000 * 60 * 60  // 1 hour
	}
  });
  
  app.use(sessionadat);
  
const sesionStore = sessionadat.store;
const sessions = new Set();


function sessionCounter(){
    const now = Date.now();
    const maxAge = 1000 * 60 * 60; // 1 hour
    for (const [sid, ts] of sessions) {
      if (now - ts > maxAge) sessions.delete(sid);
    }
    var dbSzam = sessions.size
    //console.log(dbSzam);
    return dbSzam
  }

//-------------Bejelentkezéshez-------------

// Globális változó a legutolsó admin tokenjének
let activeAdminToken = null;

const smartAuth = (req, res, next) => {
    // 1. Ha nincs session, akkor irány a főoldal (kivéve ha háttér-ellenőrzés)
    if (!req.session || !req.session.bejelentkezve) {
        if (req.path === '/check-admin-status') {
            return res.status(401).json({ error: "Nincs bejelentkezve" });
        }
        return res.redirect('/');
    }

    // 2. HA ADMIN: megnézzük, hogy ő-e a legfrissebb
    if (req.session.jogosultsag === "admin") {
        if (req.session.adminToken !== activeAdminToken) {
            req.session.destroy();
            return res.status(401).json({ error: "KIDOBVA" });
        }
    }
    next();
};

// --- ÚTVONALAK ---

// A login-hoz és a statikus fájlokhoz NE tegyél smartAuth-ot!
app.use(express.static("public"));

app.post('/login', (req, res) => {
    const user = req.query.user;
    const passwd = req.query.passwd;

    const sql = `SELECT COUNT(O_ID) AS van, JOGOSULTSAG AS jogosultsag 
                 FROM Operatorok WHERE FELHASZNALONEV LIKE BINARY ? AND PASSWORD = MD5(?)
                 UNION
                 SELECT COUNT(R_ID) AS van, "rokon" AS jogosultsag 
                 FROM Rokonok WHERE FELHASZNALONEV LIKE BINARY ? AND PASSWORD = MD5(?)
                 ORDER BY 1 DESC LIMIT 1;`;

    conn.query(sql, [user, passwd, user, passwd], (err, results) => {
        if (err) return res.status(500).end();

        if (results && results[0]["van"] == 1) {
            const jogosultsag = results[0]["jogosultsag"];
            req.session.bejelentkezve = true;
            req.session.user = user;
            req.session.jogosultsag = jogosultsag;

            if (jogosultsag == "admin") {
                const newToken = Date.now() + "-" + Math.random();
                activeAdminToken = newToken;
                req.session.adminToken = newToken;
            }
            res.json({ 'db': jogosultsag, 'van': 1 });
            naplo_mentes(user, sql, [user, passwd, user, passwd]);
        } else {
            res.json({ 'db': "nincs", 'van': 0 });
        }
    });
});

app.get('/admin', smartAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'admin.html'));
});

app.get('/check-admin-status', smartAuth, (req, res) => {
    res.sendStatus(200);
});

app.post('/logout', (req, res) => {
    // Ha az admin lép ki, töröljük a globális tokent is, hogy más beléphessen
    if (req.session.jogosultsag === "admin") {
        activeAdminToken = null;
    }
    req.session.destroy(err => {
        res.clearCookie('connect.sid');
        res.end();
    });
});

app.post('/opadatok', (req, res) =>{
    const user = req.session.user;
    const sql = `select O_ID, NEV from Operatorok where FELHASZNALONEV = ?`;
    conn.query(sql,[user], (err, results) => {

		if (err) {
			console.log("opadatok");
			console.log(err);
		}
		res.set('Content-Type', 'application/json', 'charset=utf-8');
		res.send(JSON.stringify({ 'tablak': results }));
		res.end();
		});
});

  app.post('/emberadat',(req, res) => { //BG
	const alma = req.session.user;
    console.log("emberadat user: " + alma);
	const sql = `select NEV from Operatorok where FELHASZNALONEV = ?
                 union
                 select NEV from Rokonok where FELHASZNALONEV = ?;`;
	conn.query(sql,[alma, alma], (err, results) => {
		if (err) {
			console.log("emberadat");
			console.log(err);
		}
		if (results) {
			console.log("/tablak: " + results);
			console.log(results);
		}
		res.set('Content-Type', 'application/json', 'charset=utf-8');
		res.send(JSON.stringify({ 'tablak': results }));
		res.end();
		});
	});

	app.post('/emberjog',(req, res) => { //BG
		const alma = req.session.user;
		const sql = `	SELECT
							T1.FELHASZNALONEV AS "Operátor felhasználónév",
							T2.DESCRIPTION AS "Jogosultsági szint"
						FROM
							Operatorok AS T1  
						JOIN
							Config AS T2 
							ON T1.JOGOSULTSAG = T2.VALUE 
							AND T2.FIELD = 'Operatorok_JOGOSULTSAG'
						WHERE
							T1.FELHASZNALONEV = ?
                        union
                        SELECT
                            T1.FELHASZNALONEV AS "Operátor felhasználónév",
                            "Rokon" AS "Jogosultsági szint"
                        from Rokonok as T1
                            where T1.FELHASZNALONEV = ?;`;
		conn.query(sql,[alma, alma], (err, results) => {
			if (err) {
				console.log("eberjog");
				console.log(err);
			}
			if (results) {
				console.log("/tablak: " + results);
				console.log(results);
			}
			res.set('Content-Type', 'application/json', 'charset=utf-8');
			res.send(JSON.stringify({ 'tablak': results }));
			res.end();
			});
		});


//------Bal oldali oszlop táblák megjelnítése------

  app.post('/betolt',(req, res) => { //BG
    var sql = `show tables;`;
    conn.query(sql, (err, results) => {
        if(err){
			console.log("betolt");
            console.log(err);
        } 
        if(results) {
            console.log(results)
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();
    })
  });

//-----------Táblázatok feltöltése-----------

    app.post('/adatlopRokon', (req, res) => { // BG
    const tab = req.query.rokonFelh;
    console.log("asdasd" + tab)
    let sql = `SELECT Paciensek.* FROM Rokonok
                INNER JOIN Paciens_Rokon ON Paciens_Rokon.ROKON_ID = Rokonok.R_ID
                INNER JOIN Paciensek ON Paciens_Rokon.PACIENS_ID = Paciensek.P_ID
                WHERE FELHASZNALONEV = "${tab}"`; 
    conn.query(sql, (err, results) => {
      if (err) {
		console.log("adatlopRokon");	
        console.log(err);
      }
      res.set('Content-Type', 'application/json; charset=utf-8');
      if (results && results.length > 0) {
        res.send(JSON.stringify({ tablak: results }));
		      console.log(results);
      } 
      else {
        res.send(JSON.stringify({ tablak: ['üres'] }));
      }
	  res.end();
    });
  });

  app.post('/adatlop', (req, res) => { // BG
    const tab = req.query.tabla;
    let sql = `SELECT * FROM ${tab};`; 
    conn.query(sql, (err, results) => {
      if (err) {
		console.log("adatlop");	
        console.log(err);
      }
      res.set('Content-Type', 'application/json; charset=utf-8');
      if (results && results.length > 0) {
            res.send(JSON.stringify({ tablak: results }));
		      console.log(results);
              
      } 
      else {
        res.send(JSON.stringify({ tablak: ['üres'] }));
      }
	  res.end();
    });
  });

  app.post('/naplolop', (req, res) => { // BG
    const tab = req.query.tabla;
    let sql = `SELECT Naplo.OP_NEV, Naplo.SQLX, Naplo.DATUMIDO
            FROM Naplo
            ORDER BY 3 desc;`; 
    conn.query(sql, (err, results) => {
      if (err) {
		console.log("naplolop");	
        console.log(err);
      }
      res.set('Content-Type', 'application/json; charset=utf-8');
      if (results && results.length > 0) {
        res.send(JSON.stringify({ tablak: results }));
		      console.log(results);
      } 
      else {
        res.send(JSON.stringify({ tablak: ['üres'] }));
      }
	  res.end();
    });
  });
  

function naplo_mentes(user, sql, ertekek) {
    let i = 0;
    let adatok = Array.isArray(ertekek) ? ertekek : [ertekek];

    
    
    const finalSql = sql.replace(/\?/g, () => {
        // Ellenőrizzük, van-e még elem a tömbben
        if (i >= adatok.length) {
            return '<<HIÁNYZÓ ÉRTÉK>>';
        }
        
        let ertek = adatok[i++]; // Vesszővel elválasztva adjuk át az értékeket, így minden '?'-hoz a megfelelő érték kerül
        console.log("Adatok tömbje: " + ertek);
        if (ertek === null || typeof ertek === 'undefined') {
            return 'NULL';
        }

        if (typeof ertek === 'number' || typeof ertek === 'boolean' || typeof ertek === 'bigint') {
            return ertek.toString();
        }

        // JAVÍTÁS: Escape-elés és rendes behelyettesítés backtick-kel
        let tisztitott = ertek.toString().replace(/'/g, "''");
        return `'${tisztitott}'`; // <-- Itt backtick kell!
    });
    console.log("Final SQL a naplóhoz: " + finalSql);
    const sqll = `INSERT INTO Naplo (OP_NEV, SQLX) VALUES (?, ?)`;

    conn.query(sqll, [user, finalSql], (err, result) => {
        if (err) {
            console.log("Hiba a naplózásnál:", err);
        } else {
            console.log("Naplózás sikeres!");
        }
    });
}



/*
app.post('/naplo_mentes', (req, res) => {
    const user = user;
    const muvelet = sql;

    const sql = `INSERT INTO Naplo (OP_NEV, SQLX) VALUES (?, ?)`;

    conn.query(sql, [user, muvelet], (err, result) => {
        if (err) {
            console.log("Hiba a naplózásnál:", err);
            return res.status(500).json({ statusz: "hiba" });
        }
        res.json({ statusz: "siker" });
    });
});

*/
                                
//-----------Keresés--------------
app.post('/kereses', (req, res) => {
    const tab = req.query.tabla;
    const ert = req.query.ertek;
    const keresettSzoveg = `%${ert.trim()}%`;

    if (!/^[a-zA-Z0-9_]+$/.test(tab)) {
        return res.status(400).json({ error: 'Érvénytelen tábla név!' });
    }

    if (tab === "Naplo") {
        const sql = `
            SELECT OP_NEV, SQLX, DATUMIDO AS Mikor
            FROM Naplo
            WHERE CAST(OP_NEV AS CHAR) LIKE ? 
               OR CAST(SQLX AS CHAR) LIKE ? 
               OR CAST(DATUMIDO AS CHAR) LIKE ?
            ORDER BY DATUMIDO desc;`;

        const values = [keresettSzoveg, keresettSzoveg, keresettSzoveg];

        conn.query(sql, values, (err, results) => {
            if (err) return res.status(500).json({ error: 'Hiba a napló keresésnél!' });
            return res.json({ tablak: results.length ? results : ['üres'] });
        });

    } else {
        // 1. Megnézzük, hogy a bejelentkezett user rokon-e
    conn.query('SELECT R_ID FROM Rokonok WHERE FELHASZNALONEV = ?', [req.session.user], (errRokon, rokonResult) => {
        const isRokon = rokonResult.length > 0;

        // 2. Oszlopok lekérése a dinamikus kereséshez
        conn.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?', [tab], (errCol, columns) => {
            if (errCol || !columns.length) return res.status(500).json({ error: 'Oszlop hiba!' });

            const likeConditions = columns
                .map(col => `CAST(\`${tab}\`.\`${col.COLUMN_NAME}\` AS CHAR) LIKE ?`)
                .join(' OR ');

            let sql = "";
            let queryParams = [];

            // 3. LOGIKA VÁLASZTÁSA: Csak akkor szűrünk, ha a tábla 'Paciensek' ÉS a user egy rokon
            if (tab === "Paciensek" && isRokon) {
                sql = `
                    SELECT \`${tab}\`.* FROM \`${tab}\`
                    INNER JOIN Paciens_Rokon ON \`${tab}\`.P_ID = Paciens_Rokon.PACIENS_ID
                    INNER JOIN Rokonok ON Paciens_Rokon.ROKON_ID = Rokonok.R_ID
                    WHERE Rokonok.FELHASZNALONEV = ? 
                    AND (${likeConditions})`;
                
                queryParams = [req.session.user, ...columns.map(() => keresettSzoveg)];
            } else {
                // Admin, Ápoló, vagy nem páciens tábla: mindent lát
                sql = `SELECT * FROM \`${tab}\` WHERE ${likeConditions}`;
                queryParams = columns.map(() => keresettSzoveg);
            }

            conn.query(sql, queryParams, (err2, results) => {
                if (err2) return res.status(500).json({ error: 'Adatbázis hiba!' });
                res.json({ tablak: results.length ? results : ['üres'] });
            });
        });
    })};
});


//----------Oszlopnevek kiszedése létrehozás menühöz------------

app.post('/oszlopnev',(req, res) => { //BG
    const tab = req.query.tabla;
    const sql = ` SELECT DESCRIPTION FROM Config where	FIELD = ?`;
    conn.query(sql,[tab], (err, results) => {
        if(err){
			console.log("oszlopnev");
            console.log(err);
        } 
        if(results) {
            console.log(results)
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();
    })
  });

  app.post('/mezonevkel', (req, res) => { // BG
    const tab = req.query.tabla;
	const sql = `SELECT * FROM Config where	FIELD = ?;`;
	conn.query(sql,[tab], (err, results) => {
        if(err){
			console.log("mezonevkel");
            console.log(err);
        } 
        if(results) {
            console.log(results)
        }
		res.set('Content-Type', 'application/json', 'charset=utf-8');
		res.send(JSON.stringify({ 'tablak': results}));
		res.end();
	})
  });

  app.post('/pacmod', (req, res) => { // BG
    const id = req.query.pacid;
    const sql = `SELECT * FROM Paciensek WHERE P_ID = ?`;
	conn.query(sql,[id], (err, results) => {
        if(err){
			console.log("pacmod");
            console.log(err);
        } 
        if(results) {
            console.log(results)
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();
    })

  });
  
  app.post('/pacmod2', (req, res) => { // BG
    const id = req.query.pacid;
    const sql = `SELECT Betegsegek.NEV, Betegsegek.BNO
              FROM 
                Paciensek INNER JOIN Paciens_Betegseg ON Paciensek.P_ID = Paciens_Betegseg.PACIENS_ID
                INNER JOIN Betegsegek ON Betegsegek.B_ID = Paciens_Betegseg.BETEGSEG_ID
                WHERE Paciensek.P_ID = ?
              ORDER BY 1`;
	  conn.query(sql,[id], (err, results) => {
        if(err){
			console.log("pacmod2");
            console.log(err);
        } 
        if(results) {
            console.log(results)
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();
    })

  });

app.post('/adatmodositas', (req, res) => {
    const gyogyNev = req.query.gyogyszer;
    const ertek = req.query.ertek;
    const pacid = req.query.pacid;

    // Ez az SQL megkeresi a gyógyszer ID-ját a neve alapján, 
    // és csak annál a páciensnél módosítja a leírást a kapcsolótáblában
    const sql = `
        UPDATE Paciens_Gyogyszer 
        SET ADAGOLAS = ? 
        WHERE PACIENS_ID = ? AND GYOGYSZER_ID = (SELECT G_ID FROM Gyogyszerek WHERE NEV = ? LIMIT 1);
    `;

    conn.query(sql, [ertek, pacid, gyogyNev], (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        } 
        naplo_mentes(req.session.user, sql, [ertek, pacid, gyogyNev]);
        res.json({ 'success': true, 'affectedRows': results.affectedRows });
    });
});

  app.post('/pacmod3', (req, res) => { // BG
    const id = req.query.pacid;
    const sql = ` SELECT GY.NEV AS Név, PGY.ADAGOLAS AS Leírás
                    FROM Paciensek AS P INNER JOIN Paciens_Gyogyszer AS PGY ON P.P_ID = PGY.PACIENS_ID
                    INNER JOIN Gyogyszerek AS GY ON GY.G_ID = PGY.GYOGYSZER_ID
                    WHERE P.P_ID = ?
                    ORDER BY 1;`;
	  conn.query(sql,[id], (err, results) => {
        if(err){
			console.log("pacmod3");
            console.log(err);
        } 
        if(results) {
            console.log(results)
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();
    })

  });

  app.post('/pacmod4', (req, res) => { // BG
    const id = req.query.pacid;
    const sql = ` SELECT Rokonok.NEV, Rokonok.FELHASZNALONEV
                  FROM 
                      Rokonok INNER JOIN Paciens_Rokon ON Rokonok.R_ID = Paciens_Rokon.ROKON_ID
                      INNER JOIN Paciensek ON Paciensek.P_ID = Paciens_Rokon.PACIENS_ID
                  WHERE Paciensek.P_ID = ?
                  ORDER BY 1`;
	  conn.query(sql,[id], (err, results) => {
        if(err){
			console.log("pacmod4");
            console.log(err);
        } 
        if(results) {
            console.log(results)
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();
    })
  });

// Pácienshez még nem hozzárendelt elemek lekérdezése
app.post('/getHozzaadniValo', (req, res) => { // BG
    const tabla = req.query.tabla;
    const pacid = req.query.pacid;
    let sql = "";
    let params = [pacid]; 
    
    switch (tabla) {
        case 'Betegsegek':
            sql = `SELECT B_ID, NEV FROM Betegsegek 
                   WHERE B_ID NOT IN (
                       SELECT BETEGSEG_ID FROM Paciens_Betegseg WHERE PACIENS_ID = ?
                   )
                   ORDER BY NEV`;
            break;
        case 'Gyogyszerek':
            sql = `SELECT G_ID, NEV FROM Gyogyszerek
                   WHERE G_ID NOT IN (
                       SELECT Gyogyszer_ID FROM Paciens_Gyogyszer WHERE PACIENS_ID = ?
                   )
                   ORDER BY NEV`;
            break;
        case 'Rokonok':
            sql = `SELECT R_ID, NEV FROM Rokonok
                   WHERE R_ID NOT IN (
                       SELECT ROKON_ID FROM Paciens_Rokon WHERE PACIENS_ID = ?
                   )
                   ORDER BY NEV`;
            break;
        default:
            console.log("getHozzaadniValo: Érvénytelen tábla név: " + tabla);
            res.json({ error: 'Érvénytelen tábla név!' });
            return;
    }
    
    conn.query(sql, params, (err, results) => {
        if(err){
            console.log("/getHozzaadniValo hiba");
            console.log(err);
            res.json({ error: 'Adatbázis lekérdezési hiba' });
        } else {
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ 'tablak': results }));
            res.end();
        }
    });
});

//Módosított adatok mentése
app.post('/adatmentes', (req, res) => {
    const tabla = req.query.tabla;
    const oszlopok = req.query.oszlopok.split(',');
    const adatok = req.query.adatok.split(',');
    const id = req.query.id;

    const BNO_regex = /^[A-Z][0-9]{2}(\.[0-9]+|\-[A-Z][0-9]{1,2})?$/;
    const Betegseg_nev_regex = /^[A-ZÁÉÍÓÖŐÚÜŰ][^:]{2,59}$/;
    const Gyogyszer_nev_regex = /^[A-ZÁÉÍÓÖŐÚÜŰ][^:]{2,99}$/; // [^:] = bármi, csak kettőspont ne
    const Hatoanyag_regex = /^[A-ZÁÉÍÓÖŐÚÜŰ][^:]{2,99}$/;
    const Mennyiseg_regex = /^[0-9]+([.][0-9]+)?$/;
    const Nev_regex = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]*(?:[\s-][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]*)*$/;
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const felhasznalonev_regex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]{4,20}$/;
    const jelszo_regex = /^[a-zA-Z\d.\-]{4,}$/; // Ebben eddig sem volt benne a :
    const taj_regex = /^(?:\d{9}|\d{3}\s\d{3}\s\d{3})$/;
    const iranyitoszam_regex = /^[1-9][0-9]{3}$/;
    const telepules_regex = /^[A-ZÁÉÍÓÖŐÚÜŰ][^:]{2,59}$/; // [^:]-ra cserélve
    const cim_regex = /^[A-ZÁÉÍÓÖŐÚÜŰ][^:]{4,99}$/;       // [^:]-ra cserélve
    const datum_regex = /^\d{4}-\d{2}-\d{2}$/; // Ezzel nem foglalkozunk
    const telefon_regex = /^(?:\+36|06|36)(?:\s|-)?(?:1|20|30|31|50|70|[2-9][2-9])(?:\s|-)?\d{3}(?:\s|-)?\d{3,4}$/;
    const nyugdij_regex = /^[1-9][0-9]*$/;
    const most = new Date().toISOString().split('T')[0];

    if(tabla == "Betegsegek"){
        if(!Betegseg_nev_regex.test(adatok[0])){
            
            res.json({
                statusz: "hiba",
                hiba: "Hibás betegség név formátum! (Nagybetűvel kell kezdődni, legalább 2 karakter)" });
            res.end();
        }
        else if(!BNO_regex.test(adatok[1])){
            
            res.json({ 
                statusz: "hiba",
                hiba: "Hibás BNO kód formátum! (pl.: I10 vagy M54.5)" });
            res.end();
        }
        else{
            Adat_mentes(tabla, oszlopok, adatok, id, tabla[0], res, req);
            
        }
    }
    else if(tabla == "Gyogyszerek"){
        if(!Gyogyszer_nev_regex.test(adatok[0])){
            
            res.json({ statusz: "hiba", hiba: "Hibás gyógyszer név formátum! (Nagybetűvel kell kezdődni, legalább 2 karakter)" });
            res.end();
        }
        else if(!Hatoanyag_regex.test(adatok[1])){
            res.json({ statusz: "hiba", hiba: "Hibás hatóanyag formátum! (Nagybetűvel kell kezdődni, legalább 2 karakter)" });
            res.end();
        }
        else if(!Mennyiseg_regex.test(adatok[2])){
            res.json({ statusz: "hiba", hiba: "Hibás mennyiség formátum! (Pozitív szám, tizedesvesszővel is lehet)" });
            res.end();
        }
        else{
            Adat_mentes(tabla, oszlopok, adatok, id, tabla[0], res, req);
        }
    }
    else if(tabla == "Operatorok"){
        if(!Nev_regex.test(adatok[0])){
            
            res.json({ statusz: "hiba", hiba: "Hibás név formátum! (Tagoknak nagybetűvel kell kezdődni, köztük szóköz vagy '-' jel)" });
            res.end();
        }
        else if(!email_regex.test(adatok[1])){
            res.json({ statusz: "hiba", hiba: "Hibás e-mail formátum! (Helyes: pl.: valami@valami.valami, ékezetes nem megengedett)" });
            res.end();
        }
        else if(!felhasznalonev_regex.test(adatok[2])){
            res.json({ statusz: "hiba", hiba: "Hibás felhasználónév formátum! (Legalább 4 karakter, csak betűk)" });
            res.end();
        }
        else if(!jelszo_regex.test(adatok[3])){
            res.json({ statusz: "hiba", hiba: "Hibás jelszó formátum! (Legalább 4 karakter, csak betűk, számok '.' és '-')" });
            res.end();
        }
        else{
            Adat_mentes(tabla, oszlopok, adatok, id, tabla[0], res,req);
        }
    }
    else if(tabla == "Paciensek"){
        if(!Nev_regex.test(adatok[0])){
            
            res.json({ statusz: "hiba", hiba: "Hibás név formátum! (Tagoknak nagybetűvel kell kezdődni, köztük szóköz vagy '-' jel)" });
            res.end();
        }
        else if(!Nev_regex.test(adatok[2])){
            res.json({ statusz: "hiba", hiba: "Hibás születési név formátum! (Tagoknak nagybetűvel kell kezdődni, köztük szóköz vagy '-' jel)" });
            res.end();
        }
        else if(!Nev_regex.test(adatok[3])){
            res.json({ statusz: "hiba", hiba: "Hibás formátum az anyja név cellában! (Tagoknak nagybetűvel kell kezdődni, köztük szóköz vagy '-' jel)" });
            res.end();
        }
        else if(!telepules_regex.test(adatok[4])){
            res.json({ statusz: "hiba", hiba: "Hibás születés hely formátum! (Nagybetűvel kell kezdődni, legalább 2 karakter)" });
            res.end();
        }
        else if(!datum_regex.test(adatok[5])){
            res.json({ statusz: "hiba", hiba: `Hibás születési idő formátum! (Helyes: ${most})` });
            res.end();
        }
        else if(!taj_regex.test(adatok[6])){
            res.json({ statusz: "hiba", hiba: "Hibás TAJ szám formátum! (Kötelezően 9 szám pl.: 123456789 vagy 123 456 789)" });
            res.end();
        }
        else if(!datum_regex.test(adatok[8])){
            res.json({ statusz: "hiba", hiba: `Hibás ellátási idő formátum! (Helyes: ${most})` });
            res.end();
        }
        else if(adatok[9] && adatok[9] !== "NULL" && !datum_regex.test(adatok[9])){
            res.json({ statusz: "hiba", hiba: `Hibás távozási idő formátum! (Helyes: ${most})` });
            res.end();
        }
        else if(!iranyitoszam_regex.test(adatok[10])){
            res.json({ statusz: "hiba", hiba: "Hibás iranyítószám formátum! (Első nagyobb mint 0 és 4 számnak kell lennie pl.: 8992)" });
            res.end();
        }
        else if(!telepules_regex.test(adatok[11])){
            res.json({ statusz: "hiba", hiba: "Hibás születés hely formátum! (Nagybetűvel kell kezdődni, legalább 2 karakter)" });
            res.end();
        }
        else if(!cim_regex.test(adatok[12])){
            res.json({ statusz: "hiba", hiba: "Hibás cím formátum! (Nagybetűvel kell kezdődni, legalább 4 karakter)" });
            res.end();
        }
        else if(!telefon_regex.test(adatok[13])){
            res.json({ statusz: "hiba", hiba: "Hibás telefonszám formátum! (Magyar telefonszám pl.: 36 30 123 4567 vagy 06 1 123 4567)" });
            res.end();
        }
        else if(!email_regex.test(adatok[14])){
            res.json({ statusz: "hiba", hiba: "Hibás e-mail formátum! (Helyes: pl.: valami@valami.valami, ékezetes nem megengedett)" });
            res.end();
        }
        else if(!nyugdij_regex.test(adatok[15])){
            res.json({ statusz: "hiba", hiba: "Hibás nyugdíj formátum! (Nem kezdődhet nullával)" });
            res.end();
        }
        else{
            Adat_mentes(tabla, oszlopok, adatok, id, tabla[0], res, req);
        }
    }
    else if(tabla == "Rokonok"){
        if(!Nev_regex.test(adatok[0])){
            
            res.json({ statusz: "hiba", hiba: "Hibás formátum az anyja név cellában! (Tagoknak nagybetűvel kell kezdődni, köztük szóköz vagy '-' jel)" });
            res.end();
        }
        else if(!email_regex.test(adatok[1])){
            res.json({ statusz: "hiba", hiba: "Hibás e-mail formátum! (Helyes: pl.: valami@valami.valami, ékezetes nem megengedett)" });
            res.end();
        }
        else if(!felhasznalonev_regex.test(adatok[2])){
            res.json({ statusz: "hiba", hiba: "Hibás felhasználónév formátum! (Legalább 4 karakter, csak betűk)" });
            res.end();
        }
        else if(!jelszo_regex.test(adatok[3])){
            res.json({ statusz: "hiba", hiba: "Hibás jelszó formátum! (Legalább 4 karakter, csak betűk, számok '.' és '-')" });
            res.end();
        }
        else if(!iranyitoszam_regex.test(adatok[4])){
            res.json({ statusz: "hiba", hiba: "Hibás iranyítószám formátum! (Első nagyobb mint 0 és 4 számnak kell lennie pl.: 8992)" });
            res.end();
        }
        else if(!telepules_regex.test(adatok[5])){
            res.json({ statusz: "hiba", hiba: "Hibás születés hely formátum! (Nagybetűvel kell kezdődni, legalább 2 karakter)" });
            res.end();
        }
        else if(!cim_regex.test(adatok[6])){
            res.json({ statusz: "hiba", hiba: "Hibás cím formátum! (Nagybetűvel kell kezdődni, legalább 4 karakter)" });
            res.end();
        }
        else if(!telefon_regex.test(adatok[7])){
            res.json({ statusz: "hiba", hiba: "Hibás telefonszám formátum! (Magyar telefonszám pl.: 36 30 123 4567 vagy 06 1 123 4567)" });
            res.end();
        }
        
        else{
            Adat_mentes(tabla, oszlopok, adatok, id, tabla[0], res, req);
        }
    }
});


function Adat_mentes(tabla, oszlopok, adatok, id, main_id, res, req) {
    if (id === "new") {
        conn.query(`SHOW COLUMNS FROM ${tabla}`, (err, cols) => {
        if (err) {
        console.error(err);
        return res.json({ statusz: "hiba", hiba: "Adatbázis hiba vagy ilyen már létezik!" });
        }

    // Az oszlopnevek a beszúráshoz
    const columnNames = cols.map(c => c.Field);

    const placeholders = [];
    const queryParams = [];

    oszlopok.forEach((col, index) => {
        let rawValue = adatok[index];

        if (rawValue === "" || rawValue === "NULL" || rawValue === undefined) {
            rawValue = null; 
        }

        if (col.toUpperCase() === "PASSWORD" && (tabla === "Operatorok" || tabla === "Rokonok")) {
            console.log(`DEBUG: MD5 kódolás alkalmazva az oszlopra: ${col}`);
            // MD5 kódolás közvetlenül SQL-be
            placeholders.push(`MD5(${conn.escape(rawValue)})`);
        } else {
            placeholders.push("?");
            queryParams.push(rawValue);
        }
    });

    const sql = `INSERT INTO ${tabla} (${oszlopok.join(", ")}) VALUES (${placeholders.join(", ")})`;

    console.log("DEBUG Futtatandó SQL:", sql);

    conn.query(sql, queryParams, (err, results) => {
        valasz(res, err, results, sql,req, queryParams);
    });
});   
    } 
    else {
    conn.query(`SHOW COLUMNS FROM ${tabla}`, (err, cols) => {
        if (err) {
            console.error(err);
            return res.json({ statusz: "hiba", hiba: "Adatbázis hiba 806" });
        }

        // Az oszlopnevek a frissítéshez (UPDATE-nél "oszlop = ?" formátum kell)
        const setClauses = [];
        const queryParams = [];

        oszlopok.forEach((col, index) => {
            let rawValue = adatok[index];
            if (rawValue === "" || rawValue === "NULL" || rawValue === undefined) {
                rawValue = null; 
            }
            if (col.toUpperCase() === "PASSWORD" && (tabla === "Operatorok" || tabla === "Rokonok")) {
                console.log(`DEBUG: MD5 kódolás alkalmazva az oszlopra: ${col}`);
                setClauses.push(`${col} = MD5(${conn.escape(rawValue)})`);
            } else {
                setClauses.push(`${col} = ?`);
                queryParams.push(rawValue);
            }
        });
        console.log(oszlopok);
        
        const sql = `UPDATE ${tabla} SET ${setClauses.join(", ")} WHERE ${main_id}_ID = ?`;

        queryParams.push(id);
        console.log("DEBUG Futtatandó SQL:", sql);
        console.log(queryParams);
        conn.query(sql, queryParams, (err, results) => {
            valasz(res, err, results, sql, req, queryParams);
        });
    });
}
}

//adat törlése
app.post('/adattorlese', (req, res) => {
    const tabla = req.query.tabla;
    const id = req.query.id;
    
     conn.query(`SHOW COLUMNS FROM ${tabla}`, (err, cols) => {
            if (err) {
                console.error(err);
                return res.json({ statusz: "hiba", hiba: "Adatbázis hiba" });
            }
            const firstCol = cols[0].Field;
            const sql = `DELETE FROM ${tabla} WHERE ${firstCol} = ?;`;
            conn.query(sql, [id], (err, cols) => {
            if (err) {
                console.error(err);
                return res.json({ statusz: "hiba", hiba: "Adatbázis hiba" });
            }
            naplo_mentes(req.session.user, sql, [id]);
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ statusz: "siker" }));
            res.end();
            
            }
        );
    });
    
});

// Segédfüggvény a válaszhoz
function valasz(res, err, results, sql, req, datok) {
    if (err) {
        console.error(err);
        return res.json({ statusz: "hiba", hiba: "Adatbázis hiba vagy ilyen már létezik!", error: err }); 
    }
    naplo_mentes(req.session.user, sql, datok);
    console.log("Sikeres művelet");
    res.json({ statusz: "siker", error: "", hiba: "" });
    res.end();
}

// Kiválasztott elemek mentése
app.post('/saveHozzaadottAdat', (req, res) => { // BG
    const tabla = req.query.tabla;
    const pacid = req.query.pacid;
    const idsString = req.query.ids;
    
    const felhasznalonev = req.session.user;
    
    if (!idsString || !pacid || !tabla) {
        return res.json({ success: false, error: 'Hiányzó paraméterek (tabla, pacid, ids).' });
    }

    const ids = idsString.split(',')
                         .map(id => parseInt(id.trim()))
                         .filter(id => !isNaN(id));
    if (ids.length === 0) {
        return res.json({ success: false, error: 'Érvénytelen vagy üres ID lista.' }); res.end();
    }

    conn.query('SELECT O_ID FROM Operatorok WHERE FELHASZNALONEV = ?', [felhasznalonev], (errOp, opResults) => {
        
        if (errOp || opResults.length === 0) {
            console.log("/saveHozzaadottAdat hiba: Operátor ID nem található a név alapján: " + felhasznalonev);
            console.log(errOp);
            return res.json({ success: false, error: 'Operátor azonosító nem található a munkamenet alapján.' });
        }
        
        const operatorId = opResults[0].O_ID; 
        console.log(`Műveletet végez: Operator ID ${operatorId} (${felhasznalonev})`);

        let sql = "";
        let values = [];

        switch (tabla) {
            case 'Betegsegek':
                sql = `INSERT INTO Paciens_Betegseg (PACIENS_ID, BETEGSEG_ID, OPERATOR_ID) VALUES ?`;
                values = ids.map(id => [pacid, id, operatorId]);
                break;
            case 'Gyogyszerek':
                sql = `INSERT INTO Paciens_Gyogyszer (PACIENS_ID, Gyogyszer_ID, OPERATOR_ID) VALUES ?`;
                values = ids.map(id => [pacid, id, operatorId]);
                break;
            case 'Rokonok':
                sql = `INSERT INTO Paciens_Rokon (PACIENS_ID, ROKON_ID) VALUES ?`;
                values = ids.map(id => [pacid, id]);
                break;
            default:
                console.log("saveHozzaadottAdat: Érvénytelen tábla név: " + tabla);
                res.json({ success: false, error: 'Érvénytelen tábla név!' });
                return;
        }

        conn.query(sql, [values], (errInsert, results) => {
            if (errInsert) {
                console.log("/saveHozzaadottAdat hiba (INSERT)");
                console.log(errInsert); 
                res.json({ success: false, error: 'Adatbázis hiba mentéskor.', details: errInsert.sqlMessage });
            } else {
                naplo_mentes(req.session.user, sql, [values]);
                res.set('Content-Type', 'application/json', 'charset=utf-8');
                res.send(JSON.stringify({ success: true, 'affectedRows': results.affectedRows, error : "null" }));
                res.end();
            }
        });
    });
});

//Törölhető (már hozzárendelt) elemek lekérdezése
app.post('/getTorolniValo', (req, res) => {
    const tabla = req.query.tabla;
    const pacid = req.query.pacid;
    let sql = "";
    
    if (!pacid || !tabla) {
        return res.json({ error: 'Hiányzó paraméterek!' });
    }

    switch (tabla) {
        case 'Betegsegek':
            sql = `SELECT B_ID, NEV FROM Betegsegek 
                   WHERE B_ID IN (SELECT BETEGSEG_ID FROM Paciens_Betegseg WHERE PACIENS_ID = ?)
                   ORDER BY NEV`;
            break;
        case 'Gyogyszerek':
            sql = `SELECT G_ID, NEV FROM Gyogyszerek
                   WHERE G_ID IN (SELECT Gyogyszer_ID FROM Paciens_Gyogyszer WHERE PACIENS_ID = ?)
                   ORDER BY NEV`;
            break;
        case 'Rokonok':
            sql = `SELECT R_ID, NEV FROM Rokonok
                   WHERE R_ID IN (SELECT ROKON_ID FROM Paciens_Rokon WHERE PACIENS_ID = ?)
                   ORDER BY NEV`;
            break;
        default:
            return res.json({ error: 'Érvénytelen tábla név!' });
    }
    
    conn.query(sql, [pacid], (err, results) => {
        if(err){
            console.log("/getTorolniValo hiba", err);
            res.json({ error: 'Adatbázis hiba a lekérdezéskor.' });
        } else {
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ 'tablak': results }));
            res.end();
        }
    });
});

// Kapcsolatok törlése
app.post('/deletePaciensAdat', (req, res) => {
    const tabla = req.query.tabla;
    const pacid = req.query.pacid;
    const idsString = req.query.ids; 


    if (!req.session.user) {
        return res.json({ success: false, error: 'Nincs bejelentkezve.' });
    }

    if (!idsString || !pacid || !tabla) {
        return res.json({ success: false, error: 'Hiányzó paraméterek.' });
    }


    const ids = idsString.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    
    if (ids.length === 0) {
        return res.json({ success: false, error: 'Nincs kijelölve elem a törléshez.' });
    }

    let sql = "";

    switch (tabla) {
        case 'Betegsegek':
            sql = `DELETE FROM Paciens_Betegseg WHERE PACIENS_ID = ? AND BETEGSEG_ID IN (?)`;
            break;
        case 'Gyogyszerek':
            sql = `DELETE FROM Paciens_Gyogyszer WHERE PACIENS_ID = ? AND Gyogyszer_ID IN (?)`;
            break;
        case 'Rokonok':
            sql = `DELETE FROM Paciens_Rokon WHERE PACIENS_ID = ? AND ROKON_ID IN (?)`;
            break;
        default:
            return res.json({ success: false, error: 'Érvénytelen tábla név!' });
    }

    conn.query(sql, [pacid, ids], (err, results) => {
        if (err) {
            console.log("/deletePaciensAdat hiba", err);
            res.json({ success: false, error: 'Adatbázis hiba törléskor.' });
        } else {
            naplo_mentes(req.session.user, sql, [pacid, ids]);
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ success: true, 'affectedRows': results.affectedRows }));
            res.end();
        }
    });
});

app.post('/mertekMezok', (req, res) =>{
    const sql = `SELECT Config.VALUE FROM Config WHERE Config.FIELD = "gyogyi"`
    conn.query(sql, (err, results) =>{
        if(err){
            console.log("mertekMezok")
            console.log(err)
        }
        else{
            res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'mezok': results}));
        res.end();
        }
    })
});

app.post('/pacnev', (req, res) => {
    const sql = `SELECT P_ID, NEV FROM Paciensek;`;
    conn.query(sql, (err, results) => {
        if(err){
            console.log("pacnev");
            console.log(err);
        }
       else{
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();

       }
    })
});

app.post('/pacnev2', (req, res) => {
    const id = req.query.pac_id;
    const sql = `SELECT NEV FROM Paciensek where P_ID like ${id};`;
    conn.query(sql, (err, results) => {
        if(err){
            console.log("pacnev2");
            console.log(err);
        }
       else{
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();

       }
    })
});

app.post('/opnev', (req, res) => {
    const sql = `SELECT O_ID, NEV FROM Operatorok where;`;
    conn.query(sql, (err, results) => {
        if(err){
            console.log("pacnev");
            console.log(err);
        }
       else{
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();

       }
    })
});

app.post('/korlaplop', (req, res) => {
    const id = req.query.pacid;
    const sql = `SELECT * FROM Korlap where Paciens_ID like ?;`;
    conn.query(sql,[id], (err, results) => {
        if(err){
            console.log("korlaplop");
            console.log(err);
        }
        else{
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ 'tablak': results}));
            res.end();
        }
    })
});

app.post(`/korlap_adatok`, (req, res) => {
    const paciensId = req.query.pac_id;

    const sql = `
        SELECT 
            p.NEV, 
            p.SZUL_IDO, 
            p.TAJ, 
            p.NEM,
            CONCAT(p.IRANYITOSZAM, ' ', p.TELEPULES, ', ', p.CIM) AS LAKCIM,
            p.ELLAT_IDO,
            p.ALLAPOT AS STATUSZ,
            GROUP_CONCAT(DISTINCT b.NEV SEPARATOR ', ') AS BETEGSEGEK,
            GROUP_CONCAT(DISTINCT g.NEV SEPARATOR ', ') AS Gyogyszerek,
            o.JOGOSULTSAG as OP_NEV
        FROM Paciensek AS p
        LEFT JOIN Paciens_Betegseg AS pb ON p.P_ID = pb.PACIENS_ID
        LEFT JOIN Betegsegek AS b ON pb.BETEGSEG_ID = b.B_ID
        LEFT JOIN Paciens_Gyogyszer AS pgy ON p.P_ID = pgy.PACIENS_ID
        LEFT JOIN Gyogyszerek AS g ON pgy.GYOGYSZER_ID = g.G_ID
        LEFT JOIN Korlap as k on p.P_ID = k.Paciens_ID
        LEFT JOIN Operatorok as o on k.Operator_ID = o.O_ID
        where p.P_ID = ?
    `;
   
    conn.query(sql, [paciensId], (err, results) => {
    if(err){
        console.log("korlapmod");
        console.log(err);
    }
    
    res.set('Content-Type', 'application/json', 'charset=utf-8');
    res.send(JSON.stringify({ 'tablak': results}));
    res.end();
    })
});

app.post('/generate_pdf', async (req, res) => {
    try {
        const { PAC_ID, OP_ID, OP_NEV, be } = req.body;
        const doc = new jsPDF();

        // ===== DÁTUM =====
        const most = new Date();
        const datumResz = most.toISOString().split('T')[0];
        const idoResz = most.toTimeString().split(' ')[0];
        const idobelyeg = `${datumResz} ${idoResz}`;
        const tisztaFajlnevIdo = idobelyeg.replaceAll(":", "-").replace(" ", "_");
        const fajlNev = `korlap_${PAC_ID}_${tisztaFajlnevIdo}.pdf`;

        // ===== FONT (ékezet miatt) =====
        try {
            const fontUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf";
            const fontRes = await fetch(fontUrl);
            const arrayBuffer = await fontRes.arrayBuffer();
            const base64Font = Buffer.from(arrayBuffer).toString('base64');
            doc.addFileToVFS("Roboto-Regular.ttf", base64Font);
            doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
            doc.setFont("Roboto");
        } catch (e) {}

        const pageWidth = 210;
        const marginLeft = 20;
        const maxWidth = pageWidth - (marginLeft * 2);
        let y = 20;

        // ===== SEGÉD =====
        const sectionHeader = (text) => {
            doc.setFillColor(220, 220, 220);
            doc.rect(marginLeft, y - 6, maxWidth, 8, "F");
            doc.setFontSize(12);
            doc.text(text, marginLeft + 2, y);
            y += 12;
        };

        const twoColLine = (label, value) => {
            doc.setFontSize(11);
            doc.text(`${label}:`, marginLeft, y);
            doc.text(String(value ?? ""), marginLeft + 55, y);
            y += 8;
        };

        // ===== FEJLÉC =====
        doc.setFontSize(16);
        doc.text("KÓRLAP", pageWidth / 2, y, { align: "center" });
        y += 8;

        doc.setFontSize(11);
        doc.text("Zalaegerszegi Idősek Gondozó Háza", pageWidth / 2, y, { align: "center" });
        y += 6;

        doc.setFontSize(10);
        doc.text(`Dokumentum azonosító: FK-${datumResz}-${PAC_ID}`, pageWidth / 2, y, { align: "center" });
        y += 5;

        doc.text(`Generálva: ${idobelyeg}`, pageWidth / 2, y, { align: "center" });
        y += 15;

        // ===== BETEG ADATAI =====
        sectionHeader("Beteg adatai");
        twoColLine("Név", be.NEV);
        twoColLine("Születési dátum", be.SZUL_IDO);
        twoColLine("TAJ", be.TAJ);
        twoColLine("Nem", be.NEM);
        twoColLine("Lakcím", be.LAKCIM);
        y += 5;

        // ===== FELVÉTEL =====
        sectionHeader("Felvétel");
        twoColLine("Felvétel ideje", be.ELLAT_IDO);

        doc.text("Panasz:", marginLeft, y);
        y += 7;

        const panaszLines = doc.splitTextToSize(be.BETEGSEGEK || "", maxWidth);
        doc.text(panaszLines, marginLeft, y);
        y += (panaszLines.length * 6) + 5;

        doc.text("Státusz:", marginLeft, y);
        doc.text(be.STATUSZ || "", marginLeft + 55, y);
        y += 10;

        // ===== GYÓGYSZEREK =====
        sectionHeader("Gyógyszerek");
        doc.text("Gyógyszerek:", marginLeft, y);
        y += 8;

         const gyogyLines = doc.splitTextToSize(be.Gyogyszerek || "", maxWidth);
        doc.text(gyogyLines, marginLeft, y);
        y += (gyogyLines.length * 6) + 5;

        // ===== KIÁLLÍTÓ =====
        sectionHeader("Kiállító");
        twoColLine("Kiállító neve", OP_NEV);

        // ===== ALÁÍRÁS =====
        const signatureY = 270;
        doc.line(130, signatureY, 190, signatureY);
        doc.text("Aláírás", 150, signatureY + 6);

        // ===== MENTÉS =====
        const outputDir = path.join(__dirname, 'public', 'korlap');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

        const filePath = path.join(outputDir, fajlNev);
        fs.writeFileSync(filePath, Buffer.from(doc.output('arraybuffer')));

        const dbPath = `korlap/${fajlNev}`;
        const sql = `INSERT INTO Korlap (Paciens_ID, Operator_ID, LEIRAS) VALUES (?, ?, ?)`;

        conn.query(sql, [PAC_ID, OP_ID, dbPath], (err) => {
            if (err) return res.status(500).json({ success: false });
            naplo_mentes(req.session.user, sql, [PAC_ID, OP_ID, dbPath]);
            res.json({ success: true, path: dbPath });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.listen(port,() => {console.log("********************************juhééééé********************************")});