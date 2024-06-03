document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('myModal').style.display = "block";
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = "none";
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
});

document.getElementById('divForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário e o recarregamento da página

    // Obtém os valores dos campos de entrada
    var title = document.getElementById('title').value;
    var imageFile = document.getElementById('imageFile').files[0];
    var dataName = document.getElementById('dataName').value;
    var dataPrice = document.getElementById('dataPrice').value;
    //----------------------------------------------------//

    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Cria um novo elemento div
            var newDiv = document.createElement('div');
            newDiv.classList.add('produtos');
            newDiv.setAttribute('data-name', dataName); 
            newDiv.setAttribute('data-price', dataPrice);

            // Cria um elemento de título e define seu conteúdo
            var newTitle = document.createElement('h2');
            newTitle.textContent = title;

            // Cria um elemento de imagem e define seu src
            var newImage = document.createElement('img');
            newImage.src = e.target.result;

            var buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            function toggleColor(button) {
                button.addEventListener('click', function() {
                    if (button.style.backgroundColor === 'blue') {
                        button.style.backgroundColor = ''; // Cor padrão
                    } else {
                        button.style.backgroundColor = 'blue'; // Cor clicada
                    }
                });
            }

            var button1 = document.createElement('button');
            button1.textContent = 'Adicionar ao Carrinho';
            button1.classList.add('add-to-cart');
            toggleColor(button1);

            buttonContainer.appendChild(button1);

            // Adiciona o título e a imagem à nova div
            newDiv.appendChild(newImage);
            newDiv.appendChild(newTitle);
            newDiv.appendChild(buttonContainer);

            // Adiciona a nova div ao container existente
            document.getElementById('container').appendChild(newDiv);

            // Fecha o modal
            document.getElementById('myModal').style.display = "none";

            // Limpa os campos do formulário
            document.getElementById('divForm').reset();
        }
        reader.readAsDataURL(imageFile);
    }
});



