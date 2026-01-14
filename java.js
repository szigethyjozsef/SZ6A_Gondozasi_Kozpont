
//-----------------------------------
//Fix, ez kell



const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require('express-session');

app.use(express.static("public"))
const port = 9061; 

// MySQL kapcsolat
const conn = mysql.createConnection({
    host: "193.227.198.214",
    user: "barabas.gergo",          
    password: "Csany4181",   
    port: "9406",     
    database: "2021SZ_barabas_gergo",
    multipleStatements: true,
    dateStrings: true
});



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



//-----------------------------------




//-------------Bejelentkezéshez-------------
/*
app.post('/login',(req, res) => { //BG
    const user = req.query.user;
    const passwd = req.query.passwd;

	req.session.user = user;
  
    const sql = `SELECT 
                COUNT(O_ID) AS van,
                FELHASZNALONEV AS user,
                JOGOSULTSAG AS jogosultsag
                FROM Operatorok
                WHERE FELHASZNALONEV LIKE  "${user}" AND PASSWORD = MD5("${passwd}")

                UNION

                SELECT 
                COUNT(R_ID) AS van,
                FELHASZNALONEV AS user,
                3 AS jogosultsag
                FROM Rokonok
                WHERE FELHASZNALONEV LIKE "${user}" AND PASSWORD = MD5("${passwd}")
                ORDER BY 1 desc
                LIMIT 1;`;
    conn.query(sql, (err, results) => {
        if(err){
            console.log(err);
        } 
        if(results) {
            console.log("/logina result: " + results[0]["jogosultsag"])
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'db': results[0]["jogosultsag"], 'van': results[0]["van"]}));
        res.end();
    })
  });
**/





app.post('/login',(req, res) => { //BG

    const user = req.query.user;
    const passwd = req.query.passwd;

    req.session.user = user;
    
    console.log("*********************************************");
    console.log(sessionCounter());
    
    
    const sql = `SELECT 
                COUNT(O_ID) AS van,
                FELHASZNALONEV AS user,
                JOGOSULTSAG AS jogosultsag
                FROM Operatorok
                WHERE FELHASZNALONEV LIKE ? AND PASSWORD = MD5(?)

                UNION

                SELECT 
                COUNT(R_ID) AS van,
                FELHASZNALONEV AS user,
                3 AS jogosultsag
                FROM Rokonok
                WHERE FELHASZNALONEV LIKE ? AND PASSWORD = MD5(?)
                ORDER BY 1 desc
                LIMIT 1;`; 

  
    conn.query(sql, [user, passwd, user, passwd], (err, results) => {
        if(err){
			console.log("login");
            console.log(err);
        } 

        if(results) {
            console.log("/logina result: " + results[0]["user"]) 
             
        }
        if(results[0]["jogosultsag"] == 0){
            if(sessionCounter() == 0){
                if(results[0]["van"] == 1){
                    sessions.add(req.sessionID);
                }
                res.set('Content-Type', 'application/json', 'charset=utf-8');
                res.send(JSON.stringify({ 'db': results[0]["jogosultsag"], 'van': results[0]["van"]}));
                res.end();
                
            }
            else{
                res.set('Content-Type', 'application/json', 'charset=utf-8');
                res.send(JSON.stringify({ 'db': results[0]["jogosultsag"], 'van': 7567}));
                res.end();
            }
        }
        else{
		res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'db': results[0]["jogosultsag"], 'van': results[0]["van"]}));
        res.end();
        }  
    })
});

app.post('/logout', (req, res) => {
    const sessionId = req.sessionID;
    req.session.destroy(err => {
        if (err) return res.send("Logout error");

        sessions.delete(sessionId);
        console.log("bejelentkezett user count: ")
        res.clearCookie('connect.sid');
        sessionCounter()
        res.end()
  });
});



  app.post('/emberadat',(req, res) => { //BG
	const alma = req.session.user;
	const sql = `select NEV from Operatorok where FELHASZNALONEV = ?`;
	console.log(sql);
	conn.query(sql,[alma], (err, results) => {
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
							T1.FELHASZNALONEV = ?;`;
		//           console.log(sql);
		conn.query(sql,[alma], (err, results) => {
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
  
                                
//-----------Keresés--------------
app.post('/kereses', (req, res) => {
    const tab = req.query.tabla;
    const ert = req.query.ertek;
    if (!/^[a-zA-Z0-9_]+$/.test(tab)) {
        res.status(400).json({ error: 'Érvénytelen tábla név!' });
        return;
    }


conn.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ?',[tab],(err, columns) => {
        if (err || !columns.length) {
            res.status(500).json({ error: 'Oszlopok lekérdezése sikertelen!' });
            return;
        }

        const likeConditions = columns
            .map(col => `CAST(IFNULL(\`${col.COLUMN_NAME}\`, '') AS CHAR) LIKE ?`)
            .join(' OR ');
           
        const likeValues = columns.map(() => `%${ert.trim()}%`);

        const sql = `SELECT * FROM \`${tab}\` WHERE ${likeConditions}`;

        conn.query(sql, likeValues, (err2, results) => {
            if (err2) {
                res.status(500).json({ error: 'Adatbázis lekérdezési hiba!' });
                return;
            }
            if (!results.length) {
                res.set('Content-Type', 'application/json', 'charset=utf-8');
                res.send(JSON.stringify({ tablak: ['üres'] }));
                res.end();
                
            } else {
                res.set('Content-Type', 'application/json', 'charset=utf-8');
                res.send(JSON.stringify({ 'tablak': results}));
                res.end();
                console.log(results);
            }
        });
    }
);
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

  
  app.post('/pacmod3', (req, res) => { // BG
    const id = req.query.pacid;
    const sql = ` SELECT Gyogyszerek.NEV, CONCAT(Gyogyszerek.MENNYISEG, ' ', Gyogyszerek.MERTEKEGYSEG) AS Mennyiség
                  FROM 
                      Paciensek INNER JOIN Paciens_Gyogyszer ON Paciensek.P_ID = Paciens_Gyogyszer.PACIENS_ID
                      INNER JOIN Gyogyszerek ON Gyogyszerek.GY_ID = Paciens_Gyogyszer.Gyogyszer_ID
                  WHERE Paciensek.P_ID = ?
                  ORDER BY 1`;
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



  /*
  app.post('/oszlopadatai',(req, res) => { //BG
    const tab = req.query.tabla;
    const adat = req.query.sandor;
    const sql = ` `;
    conn.query(
        `SELECT COLUMN_NAME 
         FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_NAME = 'Rokonok' 
           AND TABLE_SCHEMA = 'adatbazis_nev' 
         ORDER BY ORDINAL_POSITION 
         LIMIT 1`,
        (err, results) => {
          if (err) throw err;
      
          const oszlop = results[0].COLUMN_NAME;
      
          // 2. Lefuttatod a valódi lekérdezést
          const sql = `SELECT * FROM Rokonok WHERE \`${oszlop}\` = ?`;
          conn.query(sql, [`${adat}`], (err2, rows) => {
            if (err2) throw err2;
            if(results) {
            
                console.log(results)
            }
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ 'tablak': results}));
            res.end();
          });
        }
      );
 
  });
*/



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
            sql = `SELECT GY_ID, NEV FROM Gyogyszerek
                   WHERE GY_ID NOT IN (
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

    if (id === "new") {
        const sql = `INSERT INTO ${tabla} (${oszlopok.join(', ')}) VALUES (?)`;
        
        conn.query(sql, [adatok], (err, results) => {
            valasz(res, err, results);
        });
    } 
    else {
        conn.query(`SHOW COLUMNS FROM ${tabla}`, (err, cols) => {
            if (err) {
                console.error(err);
                return res.json({ hiba: "Adatbázis hiba" });
            }
            const firstCol = cols[0].Field;
            const setClause = oszlopok.map(col => `${col} = ?`).join(', ');
            const sql = `UPDATE ${tabla} SET ${setClause} WHERE ${firstCol} = ?`;
            
            const queryParams = [...adatok, id];

            conn.query(sql, queryParams, (err, results) => {
                valasz(res, err, results);
            });
        });
    }
});


//adat törlése
app.post('/adattorlese', (req, res) => {
    const tabla = req.query.tabla;
    const id = req.query.id;
    
     conn.query(`SHOW COLUMNS FROM ${tabla}`, (err, cols) => {
            if (err) {
                console.error(err);
                return res.json({ hiba: "Adatbázis hiba" });
            }
            const firstCol = cols[0].Field;
            const sql = `DELETE FROM ${tabla} WHERE ${firstCol} = ?;`;
            conn.query(sql, [id], (err, cols) => {
            if (err) {
                console.error(err);
                return res.json({ hiba: "Adatbázis hiba" });
            }
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ tablak: "siker" }));
            res.end();
    }
    );
        });
    
});


// Segédfüggvény a válaszhoz
function valasz(res, err, results) {
    if (err) {
        console.error(err);
        return res.json({ hiba: "Adatbázis hiba", error: err }); res.end();
    }
    console.log("Sikeres művelet");
    res.json({ tablak: "siker", error: "" });
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
            sql = `SELECT GY_ID, NEV FROM Gyogyszerek
                   WHERE GY_ID IN (SELECT Gyogyszer_ID FROM Paciens_Gyogyszer WHERE PACIENS_ID = ?)
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
            res.set('Content-Type', 'application/json', 'charset=utf-8');
            res.send(JSON.stringify({ success: true, 'affectedRows': results.affectedRows }));
            res.end();
        }
    });
});




app.listen(port,() => {console.log("********************************juhééééé********************************")});