document.addEventListener("DOMContentLoaded", function() {
    var imagens = document.querySelectorAll('.produtos_img');
    
    imagens.forEach(function(imagem) {
        imagem.addEventListener('click', function(event) {
            var imagemSrc = this.src;
            var dataName = this.getAttribute('data-name');
            var dataPrice = this.getAttribute('data-price');
            
            localStorage.setItem('imagemSrc', imagemSrc);
            localStorage.setItem('dataName', dataName);
            localStorage.setItem('dataPrice', dataPrice);
        });
    });

    var imagemSrc = localStorage.getItem('imagemSrc');
    var dataName = localStorage.getItem('dataName');
    var dataPrice = localStorage.getItem('dataPrice');

    var imagemProduto = document.getElementById('imagem');
    var nomeProduto = document.getElementById('nome-produto');
    var valorProduto = document.getElementById('valor-produto');

    if (imagemSrc) {
        imagemProduto.src = imagemSrc;
    }
    if (dataName) {
        nomeProduto.textContent = dataName;
    }
    if (dataPrice) {
        valorProduto.textContent = `R$ ${dataPrice}`;
    }
});
