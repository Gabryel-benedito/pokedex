const input = document.getElementById("pk");
const but = document.getElementById("but");
const img = document.getElementById("img");
const imgCostas = document.getElementById("img2");
const nome = document.getElementById("nome");
const nomeCostas = document.getElementById("nome2");
const tipo1 = document.getElementById("tipo1");
const tipo2 = document.getElementById("tipo2");
const tipo1Costas = document.getElementById("Tipo1");
const tipo2Costas = document.getElementById("Tipo2");
const hp = document.getElementById("hp");
const ataque = document.getElementById("ataque");
const defesa = document.getElementById("defesa");
const sp_ata = document.getElementById("sp-ata");
const sp_def = document.getElementById("sp-def");
const speed = document.getElementById("velocidade");

var pokemonAtual = 0;


function gerarPokemon(valor) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + valor



    fetch(url)
        .then(response => response.json())

        .then((dados) => {

            nome.innerText = dados.name.toUpperCase() + "  #" + dados.id;
            nomeCostas.innerText = dados.name.toUpperCase() + "  #" + dados.id;

            if (dados.sprites.other.showdown.front_default == null) {
                img.src = dados.sprites.other.home.front_default
                imgCostas.src = dados.sprites.other.home.front_default
            } else {
                img.src = dados.sprites.other.showdown.front_default
                imgCostas.src = dados.sprites.other.showdown.front_default
            }

            pokemonAtual = dados.id;
            input.value = dados.id
            img.style.height = "200px"
            img.style.width = "200px"
            img.style.cursor = "pointer";
            img.style.padding = "20px";

            imgCostas.style.height = "150px"
            imgCostas.style.width = "150px"
            imgCostas.style.cursor = "pointer";
            imgCostas.style.padding = "20px";

            nome.style.fontSize = "30px";
            nome.style.textAlign = "center";
            nome.style.color = "black";

            nomeCostas.style.fontSize = "30px";
            nomeCostas.style.textAlign = "center";
            nomeCostas.style.color = "black";


            hp.innerText = " HP: " + dados.stats[0].base_stat
            hp.style.border = " 0.5px solid black ";

            ataque.innerText = " ATAQUE: " + dados.stats[1].base_stat
            ataque.style.border = " 0.5px solid black ";

            defesa.innerText = " DEFESA: " + dados.stats[2].base_stat
            defesa.style.border = " 0.5px solid black ";

            sp_ata.innerText = " ATAQUE-ESPECIAL: " + dados.stats[3].base_stat
            sp_ata.style.border = " 0.5px solid black ";

            sp_def.innerText = " DEFESA-ESPECIAL: " + dados.stats[4].base_stat
            sp_def.style.border = " 0.5px solid black ";

            speed.innerText = " VELOCIDADE: " + dados.stats[5].base_stat
            speed.style.border = " 0.5px solid black ";



            tipo1.src = `imagens/${dados.types[0].type.name}.png `
            tipo1.style.height = "50px"
            tipo1.style.width = "50px"
            tipo1.style.paddingTop = "20px";
            tipo1.title = dados.types[0].type.name;
            tipo1Costas.src = `imagens/${dados.types[0].type.name}.png `
            tipo1Costas.style.height = "35px"
            tipo1Costas.style.width = "35px"
            tipo1Costas.style.paddingTop = "5px";
            tipo1Costas.title = dados.types[0].type.name;

            if (dados.types.length >= 1) {
                tipo2.src = `imagens/${dados.types[1].type.name}.png`;
                tipo2.style.height = "50px";
                tipo2.style.width = "50px";
                tipo2.style.paddingTop = "20px";
                tipo2.title = dados.types[1].type.name;

                tipo2Costas.src = `imagens/${dados.types[1].type.name}.png`;
                tipo2Costas.style.height = "35px";
                tipo2Costas.style.width = "35px";
                tipo2Costas.style.paddingTop = "5px";
                tipo2Costas.title = dados.types[1].type.name;
            } else {
                tipo2.style.display = "none";
            }

           
        })


}


function Proximo() {
    pokemonAtual++
    gerarPokemon(pokemonAtual)
}

function Anterior() {
    if (pokemonAtual > 1) {
        pokemonAtual--;
        gerarPokemon(pokemonAtual);
    }

} 



function mudaImagem(direcao) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + input.value.toLowerCase();
    fetch(url)
        .then(response => response.json())
        .then((dados) => {
            // Armazena as URLs das imagens em um array
            let imagens = [
                dados.sprites.other.showdown.front_default, // Corrigido para dream_world
                dados.sprites.other.showdown.back_default,
                dados.sprites.other.showdown.front_shiny,
                dados.sprites.other.showdown.back_shiny,
            ];


            function fadeToImage(newSrc) {
                img.style.transition = "opacity 0.3s ease";
                img.style.opacity = 0;

                imgCostas.style.transition = "opacity 0.3s ease";
                imgCostas.style.opacity = 0;
                setTimeout(() => {
                    imgCostas.src = newSrc;
                    imgCostas.style.opacity = 1;

                    img.src = newSrc;
                    img.style.opacity = 1;

                }, 300);
            }


            img.style.height = "200px";
            img.style.width = "200px";

            imgCostas.style.height = "150px";
            imgCostas.style.width = "150px";

            // Verifica o índice da imagem atual
            let indiceAtual = imagens.indexOf(img.src);
            if (indiceAtual === -1) {
                // Se a imagem atual não estiver no array, comece com a primeira imagem
                indiceAtual = 0;
            }
            // Avança ou retrocede na lista de imagens
            if (direcao < 0) {
                indiceAtual = (indiceAtual + 1) % imagens.length; // Avança para a próxima imagem
            } else {
                indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length; // Volta para a imagem anterior
            }
            img.src = imagens[indiceAtual];
            imgCostas.src = imagens[indiceAtual];



            fadeToImage(imagens[indiceAtual]);
        });

}


const flipCard = document.getElementById('flipCard');
const virar = document.getElementById('virar');
const virarCostas = document.getElementById('virarCostas');
const prox = document.getElementById('proximo');
const ante = document.getElementById('anterior');

function toggleFlip() {
    const isFlipped = flipCard.classList.toggle('is-flipped');
    flipCard.setAttribute('aria-pressed', isFlipped);
}


function trocarFundo() {
    const body = document.body;
    body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp3214959.jpg')";
}

function voltarFundo() {
    const body = document.body;
    body.style.backgroundImage = "url('https://cdna.artstation.com/p/assets/images/images/008/310/098/large/joaquin-ponce-vives-garchomp-final-joaquin-ponce-baja.jpg?1511916410')";
}




virar.addEventListener('click', toggleFlip);
prox.addEventListener('click', Proximo);
ante.addEventListener('click', Anterior);
input.addEventListener("keypress", (evento) => {
    if (evento.key == 'Enter') {
        gerarPokemon(input.value.toLowerCase())
    }
})
but.addEventListener("click", () => gerarPokemon(input.value.toLowerCase()));
img.addEventListener("click", () => mudaImagem(-1))
imgCostas.addEventListener("click", () => mudaImagem(-1))
virar.addEventListener("click", trocarFundo)
virarCostas.addEventListener('click', voltarFundo);
virarCostas.addEventListener("click", toggleFlip);  