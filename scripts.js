const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
    if (input.value == '') {
        alert("Digite um tarefa!")
    } else {
        minhaListaDeItens.push({
            tarefa: input.value,
            concluida: false
        });
    }

    input.value = '';

    mostrarTarefas();
}

function mostrarTarefas() {

    let novaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `
        <li class="task ${item.concluida && "concluido"}">
            <img src="img/checked.png" alt="Concluir-Tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="img/trash.png" alt="Excluir-Tarefa" onclick="deletarItem(${posicao})">
        </li>
        `
    });

    listaCompleta.innerHTML = novaLi;

    //Salvar as tarefas no Local Storage
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    
    mostrarTarefas();
}

//Função que busca as tarefas salvas do Local Storage
function recaregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    //Carrega as tarefas salvas
    if (tarefasDoLocalStorage) {
        // Transforma os itens do Local Storage de JSON para Objeto
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }
    mostrarTarefas();
}

recaregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);