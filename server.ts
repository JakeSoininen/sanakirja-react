//const express = require("express");
import express from "express";
import fs from "fs";
import type { Request, Response, NextFunction } from "express";
//const fs = require("fs");

const app = express();

const port = 3000;

const sanakirja: { fin: string; eng: string }[] = [];

const data = fs.readFileSync("./sanakirja.txt", {
  encoding: "utf8",
  flag: "r",
});

const splitLines = data.split(/\r?\n/); //jaetaan merkkijono rivin vaihtojen perusteella

splitLines.forEach((line) => {
  const sanat = line.split(" "); //jaetaan yhden rivin merkkijono kahteen osaan

  const sana = {
    fin: sanat[0],
    eng: sanat[1],
  };

  sanakirja.push(sana);
});

console.log(sanakirja);

app.use(express.json()); //käytetään json -muotoista dataa

app.use(express.urlencoded({ extended: true })); //käytetään tiedonsiirrossa laajennettua muotoa

//CORS -määrittely
app.use(function (req: Request, res: Response, next: NextFunction) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token",
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-type", "application/json");

  next();
});

//GET: Kaikki sanakirjan sanat
app.get("/sanakirja", (req, res) => {
  res.json(sanakirja);
});

//GET: Hae englanninkielinen vastine
//Esim. GET /sanakirja/auto
app.get("/sanakirja/:fin", (req, res) => {
  const fin = req.params.fin;
  const sana = sanakirja.find((sana) => sana.fin === fin);
  if (sana) {
    res.json({ eng: sana.eng });
  } else {
    res.status(404).json({ message: "Sanaa ei löytynyt sanakirjasta" });
  }
});

//POST: Lisää uusi sana
app.post("/sanakirja", (req, res) => {
  const { fin, eng } = req.body;
  if (!fin || !eng) {
    res.status(400).json({
      message: "Anna sekä suomenkielinen että englanninkielinen sana",
    });
    return;
  }
  const uusiSana = { fin: fin, eng: eng };
  //Lisätään sana muistiin
  sanakirja.push(uusiSana);
  //Lisätään sana tiedoston uudelle riville
  fs.appendFileSync("./sanakirja.txt", `\n${fin} ${eng}`);
  res.status(201).json(uusiSana);
});

app.listen(port, () => {
  console.log(`Kuunnellaan portissa ${port}`);
});
