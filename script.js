
    

        // window.addEventListener('domcontentloaded', () => {})
        // window.onload = fetchPokenmonType

        const pokenmonTypeURL = 'https://pokeapi.co/api/v2/type/'

        const pokemonSearchURL = 'https://pokeapi.co/api/v2/pokemon' + 'pokemonName'

        const NameURLMap = {}

        // get all pokemon types and add to select tag
        async function fetchPokenmonType () {

            const response = await fetch(pokenmonTypeURL)

            const parsedResponse = await response.json()
            
            console.log(parsedResponse)
            const select = document.getElementById('pokemon-types')

            for (let i = 0; i < parsedResponse.results.length; i++) {
                
                const type = parsedResponse.results[i];
                const typeName = type.name
                const typeURL = type.url
                NameURLMap[typeName] = typeURL

                const option = document.createElement('option')
                option.innerText = typeName
                option.setAttribute('value', typeName)
                option.setAttribute('data-url', typeURL)
                select.append(option)

            }  

        }

        // this function fetches 10 pokemons based on the type
        async function fetchPokemonOnType () {

            const selectValue = document.getElementById('pokemon-types').value

            const response = await  fetch(NameURLMap[selectValue])
            const parsedResponse = await response.json()

            const pokemonsData = parsedResponse.pokemon

            const pokemonsListLength = pokemonsData.length > 10 ? 10 : pokemonsData.length
            const pokemonBox = document.getElementById('pokemons-list')
            pokemonBox.innerHTML = ''

            for (let i = 0; i < pokemonsListLength; i++) {

                const pokemon = pokemonsData[i].pokemon;
                const pokemonName = pokemon.name
                const pokemonURL = pokemon.url
                let imageSrcData = ''

                const imageSrc = await fetchPokemonData(pokemonURL)

                const pokemonDiv = document.createElement('div')
                const pokemonFrontPicture = document.createElement('img')
                const pokemonNameSpan = document.createElement('span')

                pokemonFrontPicture.setAttribute('src', imageSrc)

                pokemonNameSpan.innerText = pokemonName
                pokemonDiv.append(pokemonFrontPicture,  pokemonNameSpan)

                pokemonBox.append(pokemonDiv)
                
            }


        }

        console.log("after await")


        // this will return pokemon image based on the URL...
        async function fetchPokemonData (pokemonURL) {

            const response = await fetch(pokemonURL)

            const parsedResponse = await response.json()

            return parsedResponse.sprites.front_default

        }
 

    
    
