const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function() {
    fetchTrainers()
})


function fetchTrainers() {
    console.log("we here")
    fetch(TRAINERS_URL)
        .then(function(response) { return response.json() })
        .then(function(trainersArr) {
            eachTrainer(trainersArr);
        })
        .catch(function(errors) {
            alert("turn server on!");
            console.log(error.message)
        })
};

function eachTrainer(array) {
    array.forEach(function(trainer) {
        renderTrainer(trainer)

    })
}


function renderTrainer(trainer) {

    let main = document.querySelector("main");
    let div = document.createElement("div");
    let p = document.createElement("p");
    let button = document.createElement("button");
    let ul = document.createElement("ul");



    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement("li");
        li.innerText = `${pokemon.species} (${pokemon.nickname})`;
        let button1 = document.createElement("button");
        button1.className = "release";
        button1.dataset.pokemonId = pokemon.id;
        button1.innerText = "Release";
        li.append(button1);
        ul.append(li);
        button1.addEventListener("click", function(event) {
            removePokemon(event, pokemon)
        })
    });

    p.innerText = trainer.name;
    div.className = "card";
    div.dataset.id = trainer.id;
    button.dataset.trainerId = trainer.id;
    button.innerText = "Add Pokemon";
    button.addEventListener("click", function(event) {
        addPokemon(event)
    })

    div.append(p, button, ul);
    main.append(div);

};


function addPokemon(event) {
    let trainer_id = event.target.dataset.trainerId
    if (document.querySelector(`[data-id ="${trainer_id}"]`).children[2].childElementCount < 6) {

        let newPoke = {
            trainer_id: trainer_id
        }

        fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },

                body: JSON.stringify(newPoke)
            })
            .then(resp => resp.json())
            .then(function(pokemon) {
                renderPokemon(event, pokemon);
            })
            // debugger
    } else {
        alert("full party")
    }
};

function renderPokemon(event, pokemon) {
    // debugger
    let ul = event.target.parentElement.querySelector("ul")
    let li = document.createElement("li");
    li.innerText = `${pokemon.species } (${pokemon.nickname })`;
    let button1 = document.createElement("button");
    button1.className = "release";
    button1.dataset.pokemonId = pokemon.id;
    button1.innerText = "Release";
    li.append(button1);
    ul.append(li);
    button1.addEventListener("click", function(event) {
        removePokemon(event, pokemon)
    })
};




function removePokemon(event, pokemon) {

    let target = event.target.parentElement
    let pokeId = event.target.dataset.pokemonId
    fetch(POKEMONS_URL + `/${ pokeId }`, {
        method: "DELETE"
    }).then(resp => resp.json()).then(console.log)
    target.remove()
}