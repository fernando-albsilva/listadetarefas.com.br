//inicia uma Classe para controlar os eventos da pagina
const tarefaController = new TarefaController();
// insere os eventos nos elementos para que nao precise pesquisar toda vez
document.querySelector('#formInsercaoTarefa').addEventListener('submit', tarefaController.adicionaTarefaNaLista.bind(tarefaController));
