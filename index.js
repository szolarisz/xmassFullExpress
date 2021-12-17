const express = require('express');
const path = require('path');

const fs = require('fs');
const port = 4405;

const app = express();


app.get("/", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/index.html"));
})

app.get("/bootstrap.css", (req, res) =>{
    res.sendFile( path.join(__dirname, "./node_modules/bootstrap/dist/css/bootstrap.min.css"));
})

app.get("/xmass.css", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/xmass.css"));
})       

app.get("/xmassdata", (req, res) =>{
    res.sendFile( path.join(__dirname, "./data/xmassdata.json"));
})         
        
app.get("/munkas.js", (req, res) =>{
    res.sendFile( path.join(__dirname, "./public/munkas.js"));
}) 
       
app.post("/xmassdata", (req, res) =>{
    let adatom = '';
    req.on('data', (chunk) => {
        adatom += chunk.toString();
    });
    req.on('end', () => {
        const ujFuggo = JSON.parse(adatom);



        fs.readFile('./data/xmassdata.json', (err, data) => {
            let adatok = JSON.parse(data);
            adatok.push({
                "atmero": ujFuggo.atmero,
                "piros": ujFuggo.piros,
                "alakzat": ujFuggo.alakzat
            });
            fs.writeFile('./data/xmassdata.json', JSON.stringify(adatok), () => {
                res.end(JSON.stringify(adatok));
            })
        })
    })
})

       
            

app.get("/", (req, res) => {
    res.redirect("/");
})           

app.listen(port);

function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü_-\s\.,]/gim, "");
    return str.trim();
}


