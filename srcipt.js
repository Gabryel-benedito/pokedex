const input = document.getElementById("pk");
const but = document.getElementById("but");
const img = document.getElementById("img");
const nome = document.getElementById("nome");
const tipo1 = document.getElementById("tipo1");
const tipo2 = document.getElementById("tipo2");

function gerarPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon/" + input.value.toLowerCase();

    

    fetch(url)
        .then(response => response.json())

        .then((dados) => {

            nome.innerText = dados.name.toUpperCase() + "  #" + dados.id;
            img.src = dados.sprites.other.showdown.front_default
            img.style.height = "200px"
            img.style.width = "200px"
            img.style.cursor = "pointer";
            img.style.padding = "20px";

            nome.style.fontSize = "30px";
            nome.style.textAlign = "center";
            nome.style.color = "black";

            tipo1.src = `imagens/${dados.types[0].type.name}.png `
            tipo1.style.height = "50px"
            tipo1.style.width = "50px"
            tipo1.style.paddingTop = "20px";
            tipo1.title = dados.types[0].type.name;

            if (dados.types.length >= 1) {
                tipo2.src = `imagens/${dados.types[1].type.name}.png`;
                tipo2.style.height = "50px";
                tipo2.style.width = "50px";
                tipo2.style.paddingTop = "20px";
                tipo2.title = dados.types[1].type.name;
            } else {
                tipo2.style.display = "none";
            }


        })




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
                setTimeout(() => {
                    img.src = newSrc;
                    img.style.opacity = 1;
                }, 300);
            }


            img.style.height = "200px";
            img.style.width = "200px";
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



            fadeToImage(imagens[indiceAtual]);
        });

}




input.addEventListener("keypress" , (evento) =>{
    if(evento.key == 'Enter'){
        gerarPokemon()
    }
})
but.addEventListener("click", gerarPokemon)
img.addEventListener("click", () => mudaImagem(-1))
