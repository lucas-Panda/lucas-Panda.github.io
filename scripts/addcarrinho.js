// botões "Adicionar ao Carrinho"
var botoesAdicionar = document.querySelectorAll('.add-to-cart');
//---------------------------------------------------

// Função para adicionar item ao localStorage
function adicionarAoCarrinho(nome, preco, imagem) {
    // Obtém o carrinho do localStorage
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    //---------------------------------------------------
    
    // Adiciona o item ao carrinho
    carrinho.push({ name: nome, price: preco, image: imagem });
    //---------------------------------------------------
    
    // atualizado o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    //---------------------------------------------------
}

// Adiciona um event listener para cada botão "Adicionar ao Carrinho"
botoesAdicionar.forEach(function(botao) {
    botao.addEventListener('click', function() {
        // pega a div do item 
        var item = botao.closest('.produtos');
        //------------------------------------
        
        // Informações do item
        var itemName = item.getAttribute('data-name');
        var itemPrice = item.getAttribute('data-price');
        var itemImage = item.querySelector('img').src;
        //---------------------------------------------------
        
        // manda pro carrinho
        adicionarAoCarrinho(itemName, itemPrice, itemImage);
        //---------------------------------------------------
        
        // aviso
        alert(itemName + " foi adicionado ao carrinho.");
        //---------------------------------------------------
    });
});
