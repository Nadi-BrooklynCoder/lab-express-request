const express = require('express');
const pokemon = require("./models/pokemon.json")
const app = express();


app.get("/", (req, res) => {
    res.send("Welcome to my app")
});

app.get("/bugs", (req, res) => {
    res.send(`<h2>99 little bugs in the code</h2> <a href="/bugs/101">Pull one down, patch it around</a>`);
})

app.get("/bugs/:numberOfBugs", (req, res) => {
    const { numberOfBugs } = req.params;
    let result = `<h3>${Number(numberOfBugs)} little bugs in the code</h3>`;

    if( Number(numberOfBugs) < 200 ) {
        result += `<a href="/bugs/${Number(numberOfBugs) + 2}">Pull one down, patch it around</a>`
    } else {
        result += `<a href="/bugs">Start Over</a>`
    }
    res.send(result);
})

app.get("/pokemon", (req, res) => {
    res.send(pokemon)
})

app.get("/pokemon/search", (req, res) => {
    const { name } = req.query;
    const poke = pokemon.find(p => p.name.toLowerCase() === name.toLowerCase())

    if(poke){
    res.send(poke)
} else {
    res.send(`Sorry, no Pokémon found with the name ${name}`);
}
})


app.get("/pokemon/:indexOfArray", (req, res) => {
    const { indexOfArray } = req.params
    if(pokemon[indexOfArray]){
        res.send(pokemon[indexOfArray]);
    } else {
        res.send(`Sorry no pokemon found at ${indexOfArray} exist`)
    }
})


app.get("/:verb/:adjective/:noun", (req, res) => {
    const { verb, adjective, noun } = req.params;
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}`);
})

module.exports = app;