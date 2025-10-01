//-----------------------------------
//Fix, ez kell

const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.static("public"))
const port = 9061; 

// MySQL kapcsolat
const conn = mysql.createConnection({
    host: "193.227.198.214",
    user: "barabas.gergo",          
    password: "Csany4181",   
    port: "9406",     
    database: "2021SZ_barabas_gergo"  
});

//-----------------------------------
 
app.post('/login',(req, res) => { //BG
    const user = req.query.user;
    const passwd = req.query.passwd;
    const sql = `SELECT JOGOSULTSAG, count(F_ID) FROM Felhasznalok WHERE FELHASZNALONEV = '${user}' AND PASSWORD = MD5('${passwd}')`;
    conn.query(sql, (err, results) => {
        if(err){
            console.log(err);
        } 
        if(results) {
            console.log("/login result: " + results[0]["JOGOSULTSAG"])
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'db': results[0]["JOGOSULTSAG"], 'van': results[0]["count(F_ID)"]}));
        res.end();
    })

  });

 


  app.post('/betolt',(req, res) => { //BG
    const sql = `show tables;`;
    conn.query(sql, (err, results) => {
        if(err){
            console.log(err);
        } 
        if(results) {
            console.log("/tablak: " + results[0]['Tables_in_2021SZ_barabas_gergo']);
            console.log(results)
        }
        res.set('Content-Type', 'application/json', 'charset=utf-8');
        res.send(JSON.stringify({ 'tablak': results}));
        res.end();
    })

  });




app.listen(port,() => {console.log("juhééééé")})