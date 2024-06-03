const navbar = document.querySelector(".navbar")
const menubotão = document.querySelector("#menubotão")

menubotão.addEventListener('click', ()=>{
    navbar.classList.toggle("show-menu");
})

var botoes = document.querySelectorAll('.Tamanhos');

botoes.forEach(function(botao){
    botao.addEventListener('click', function(){
        botao.classList.toggle('botaoclicado')
    })
})