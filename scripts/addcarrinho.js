// Seleciona todos os botões "Adicionar ao Carrinho"
var botoesAdicionar = document.querySelectorAll('.add-to-cart');

// Função para adicionar item ao localStorage
function adicionarAoCarrinho(nome, preco, imagem) {
    // Obtém o carrinho do localStorage ou cria um novo array se não existir
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Adiciona o novo item ao carrinho
    carrinho.push({ name: nome, price: preco, image: imagem });
    
    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Adiciona um event listener para cada botão "Adicionar ao Carrinho"
botoesAdicionar.forEach(function(botao) {
    botao.addEventListener('click', function() {
        // Obtém a div do item correspondente
        var item = botao.closest('.produtos');
        
        // Obtém os dados do item
        var itemName = item.getAttribute('data-name');
        var itemPrice = item.getAttribute('data-price');
        var itemImage = item.querySelector('img').src;
        
        // Adiciona o item ao carrinho
        adicionarAoCarrinho(itemName, itemPrice, itemImage);
        
        // Feedback para o usuário
        alert(itemName + " foi adicionado ao carrinho.");
    });
});
