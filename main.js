
// Danh sách màu sắc theo type
const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};


// Danh sách dự liệu cần thiết
let all_pokemon_data = [];


// Lấy dự liệu
async function fetchPokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500")
    let data = await response.json();
    let pokemon_links = data.results;


    for(let pokemon of pokemon_links) {
        let pokemon_response = await fetch(pokemon.url);
        let pokemon_data = await pokemon_response.json();
        
        // Lấy dự liệu cần thiết
        let pokemonInfo = {
            id: pokemon_data.id,
            name: pokemon_data.name,
            image: pokemon_data.sprites.front_default,
            types: pokemon_data.types.map(t => t.type.name)
        };

        // console.log(pokemonInfo);
        

        all_pokemon_data.push(pokemonInfo);
    }

    // Hiển thị danh sách Pokemon
    displayPokemon(all_pokemon_data);
    
    
}

// Số lượng pokemon được hiển thị
let count = 30;


const pokemon_list = document.getElementById('pokemon-list');
function displayPokemon(pokemon_display) {
    
    pokemon_list.innerHTML = ""; // Xóa danh sách cũ

    for(let i = 0; i < Math.min(count, pokemon_display.length); i++) {
        let pokemon = pokemon_display[i];
        let li = document.createElement("li"); // tạo thẻ li
        li.classList.add("pokemon"); // thêm class
    
        // Thêm dữ liệu vào thẻ li
        li.innerHTML = `
            <p class="id">#${pokemon.id}</p>
            <img class="pokemon-img" src="${pokemon.image}" alt="${pokemon.name}">
            <h3 class="name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <ul class="type">
                ${pokemon.types.map(type => `<li style="background-color: ${typeColors[type]}">${type.charAt(0).toUpperCase() + type.slice(1)}</li>`).join("")}
            </ul>
        `;
    
        pokemon_list.appendChild(li);
    }
    
}


// Tìm kiếm
const pokemon_search = document.getElementById('pokemon-search')
pokemon_search.addEventListener("input", function () {
    let searchTerm = pokemon_search.value.toLowerCase();

    let filteredPokemon = all_pokemon_data.filter(pokemon =>
        pokemon.name.includes(searchTerm)
    );

    displayPokemon(filteredPokemon);
});


// Load More
document.getElementById("more").addEventListener("click", function () {
    count += 30; // Mỗi lần nhấn, tăng thêm 30 Pokemon
    displayPokemon(all_pokemon_data);
});

fetchPokemon();
