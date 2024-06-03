// Configura o botão para limpar o carrinho
document.getElementById('clear-cart').addEventListener('click', limparCarrinho);

// Lista de tamanhos disponíveis (pode ser personalizada conforme necessário)
const tamanhosDisponiveis = ['P', 'M', 'G', 'GG'];

// Função para carregar os itens do carrinho do localStorage
function carregarCarrinho() {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    var carrinhoElemento = document.getElementById('carrinho');
    carrinhoElemento.innerHTML = ''; // Limpa o conteúdo atual
    var total = 0;
    var itemCounts = {};

    // Agrupa itens semelhantes
    carrinho.forEach(function(item) {
        if (itemCounts[item.name]) {
            itemCounts[item.name].quantity += 1;
        } else {
            itemCounts[item.name] = { ...item, quantity: 1 };
        }
    });


// Adiciona cada item ao elemento do carrinho e calcula o total
Object.values(itemCounts).forEach(function(item) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name} - R$ ${item.price}</span>
        <input type="number" min="1" value="${item.quantity}" data-name="${item.name}" style="width: 50px; margin-left: 10px;">
        <select data-name="${item.name}" data-current-size="${item.size}">
            ${tamanhosDisponiveis.map(size => `<option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>`).join('')}
        </select>
    `;
    carrinhoElemento.appendChild(listItem);
    total += parseFloat(item.price) * item.quantity; // Adiciona o preço do item ao total
});

// Adiciona o total ao elemento do carrinho
var totalElemento = document.createElement('li');
totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`; // Formata o total para 2 casas decimais
carrinhoElemento.appendChild(totalElemento);


    // Adiciona evento para atualizar a quantidade
    document.querySelectorAll('#carrinho input[type="number"]').forEach(function(input) {
        input.addEventListener('change', function() {
            var name = this.getAttribute('data-name');
            var newQuantity = parseInt(this.value);
            atualizarQuantidade(name, newQuantity);
        });
    });

}

// Função para atualizar a quantidade de um item no carrinho
function atualizarQuantidade(name, newQuantity) {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.name !== name); // Remove todos os itens com esse nome
    for (var i = 0; i < newQuantity; i++) {
        var item = JSON.parse(localStorage.getItem('carrinho')).find(item => item.name === name);
        carrinho.push(item);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}


// Função para limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    carregarCarrinho();
}

// Carrega o carrinho quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();
});
