// botão de limpar o carrinho
document.getElementById('clear-cart').addEventListener('click', limparCarrinho);
//--------------------------------------------------------------------------------

// Lista de tamanhos 
const tamanhosDisponiveis = ['P', 'M', 'G', 'GG'];
//---------------------------------------------------

// Função para carregar os itens
function carregarCarrinho() {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    var carrinhoElemento = document.getElementById('carrinho');
    carrinhoElemento.innerHTML = '';
    var total = 0;
    var itemCounts = {};
    //---------------------------------------------------

    // somar os itens iguais
    carrinho.forEach(function(item) {
        if (itemCounts[item.name]) {
            itemCounts[item.name].quantity += 1;
        } else {
            itemCounts[item.name] = { ...item, quantity: 1 };
        }
    });
    //---------------------------------------------------


// Bota no carrinho e soma
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
    total += parseFloat(item.price) * item.quantity;
});
//--------------------------------------------------------------------------------------------------------------------------------------------------

// mostra o total 
var totalElemento = document.createElement('li');
totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`; // Formata o total para 2 casas decimais
carrinhoElemento.appendChild(totalElemento);
//---------------------------------------------------


    // evento que atualiza a quantidade
    document.querySelectorAll('#carrinho input[type="number"]').forEach(function(input) {
        input.addEventListener('change', function() {
            var name = this.getAttribute('data-name');
            var newQuantity = parseInt(this.value);
            atualizarQuantidade(name, newQuantity);
        });
    });
    //---------------------------------------------------------------------------------------

}

// Função que atualiza a quantidade de um item 
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
//------------------------------------------------------------------------------------------------


// limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    carregarCarrinho();
}
//---------------------------------------

// Carrega o carrinho 
document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();
});
//-------------------------------------------------------------
