const pokemonName = window.document.querySelector('.pokemon_name')
const pokemonNumber = window.document.querySelector('.pokemon_number')
const pokemonImg = window.document.querySelector('.pokemon_image')
const inputID = window.document.getElementById('inputID')
const btnPrev = window.document.querySelector('.btn-prev')
const btnNext = window.document.querySelector('.btn-next')

const form = window.document.querySelector('.form')
const input = window.document.querySelector('.input_search')

let searchPokemnon = 1

const fetchPokemon = async function(pokemon) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status == 200) {
        const data = await APIResponse.json()
        return data
    }

}

const renderPokemon = async function(pokemon) {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImg.style.display = 'block'
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default']
        input.value = ''
        inputID.placeholder = 'Nome ou número...'
        searchPokemnon = data.id
    } else {
        pokemonImg.style.display = 'none'
        input.value = ''
        pokemonName.innerHTML = ''
        pokemonNumber.innerHTML = ''
        inputID.placeholder = 'Não encontrado, tente outro valor..'
    }
}

form.addEventListener('submit', function(event){
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener('click', function(){
    searchPokemnon ++
    renderPokemon(searchPokemnon)
})

btnPrev.addEventListener('click', function(){
    if (searchPokemnon > 1) {
       searchPokemnon --
        renderPokemon(searchPokemnon) 
    }
})

renderPokemon(searchPokemnon)