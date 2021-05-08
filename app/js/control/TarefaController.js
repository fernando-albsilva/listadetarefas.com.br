class TarefaController {
    constructor() {
        this._inputNome = document.querySelector('#nomeTarefa');
        this._inputPrioridade = document.querySelector('#prioridadeTarefa');
        this._inputDescricao = document.querySelector('#descricaoTarefa');
        this._inputDivContainerTabela = document.querySelector('#containerListaDeTarefas');
        this._inputDivContainerTabelaConcluida = document.querySelector('#containerListaDeTarefasConcluida');
        this._inputPopUpEditaItemDaLista = document.querySelector('#popUpEditaItemDaLista');
        this._inputRelogioTarefa = document.querySelector('#relogioTarefa');
        this._listaDeTarefa = [];
        this._listaDeTarefaConcluida = [];
    }
    // Metodo adiciona uma tarefa na lista de tarefas quando clicado em adicionar
    adicionaTarefaNaLista(event) {
        event.preventDefault();
        let tarefa = new Tarefa(this._inputNome.value, parseInt(this._inputPrioridade.value), this._inputDescricao.value, 0, 0, 0);
        this._listaDeTarefa.push(tarefa);
        this.ordenaListaPorPrioridade();
        this.criaListaDeTarefaHtml();
        this.insereEventoBotaoIniciar();
        this.insereEventoBotaoPausar();
        this.insereEventoBotaoFinalizar();
        this.insereEventoBotaoEditar();
        this.insereEventoBotaoExcluir();
    }
    ordenaListaPorPrioridade() {
        this._listaDeTarefa.sort(function (a, b) {
            return a.prioridade < b.prioridade ? -1 : a.prioridade > b.prioridade ? 1 : 0;
        });
    }
    //Metodo cria o codigo html da lista de tarefas para ser inserido na pagina html
    criaListaDeTarefaHtml() {
        let listaDeTarefaView = new ListaDeTarefaView();
        let tabela = listaDeTarefaView.criaListaTemplate(this._listaDeTarefa);
        this._inputDivContainerTabela.innerHTML = tabela;
        let tabelaConcluida = listaDeTarefaView.criaListaConcluidaTemplate(this._listaDeTarefaConcluida);
        this._inputDivContainerTabelaConcluida.innerHTML = tabelaConcluida;
    }
    insereEventoBotaoIniciar() {
        this._inputBotaoIniciar = document.querySelectorAll('.botaoIniciar');
        this._inputBotaoIniciar.forEach(element => {
            element.addEventListener('click', tarefaController.iniciaCronometroItemTarefa.bind(tarefaController));
        });
    }
    insereEventoBotaoPausar() {
        this._inputBotaoPausar = document.querySelectorAll('.botaoPausar');
        this._inputBotaoPausar.forEach(element => {
            element.addEventListener('click', tarefaController.pausaCronometroItemTarefa.bind(tarefaController));
        });
    }
    insereEventoBotaoFinalizar() {
        this._inputBotaoFinalizar = document.querySelectorAll('.botaoFinalizar');
        this._inputBotaoFinalizar.forEach(element => {
            element.addEventListener('click', tarefaController.finalizaItemListaDeTarefa.bind(tarefaController));
        });
    }
    insereEventoBotaoEditar() {
        this._inputBotaoEditar = document.querySelectorAll('.botaoEditar');
        this._inputBotaoEditar.forEach(element => {
            element.addEventListener('click', tarefaController.editaItemListaDeTarefa.bind(tarefaController));
        });
    }
    //metodo insere um EventListener para cada botao excluir da lista de Tarefas
    insereEventoBotaoExcluir() {
        this._inputBotaoExcluir = document.querySelectorAll('.botaoExcluir');
        this._inputBotaoExcluir.forEach(element => {
            element.addEventListener('click', tarefaController.excluiItemListaDeTarefa.bind(tarefaController));
        });
    }
    //Metodo finaliza item de uma lista
    finalizaItemListaDeTarefa(event) {
        event.preventDefault();
        let elemento = event.target;
        let indiceLista = elemento.value;
        let relogioHtml = this._inputRelogioTarefa;
        let informacaoView = new InformacaoView();
        let htmlString = informacaoView.tarefaFinalizadaTemplateInformacao(this._listaDeTarefa[parseInt(indiceLista)]);
        relogioHtml.innerHTML = htmlString;
        this._listaDeTarefaConcluida.push(this._listaDeTarefa[parseInt(indiceLista)]);
        this._listaDeTarefa.splice(parseInt(indiceLista), 1);
        clearInterval(this._relogioTarefa);
        this.criaListaDeTarefaHtml();
        this.insereEventoBotaoIniciar();
        this.insereEventoBotaoPausar();
        this.insereEventoBotaoFinalizar();
        this.insereEventoBotaoEditar();
        this.insereEventoBotaoExcluir();
    }
    //Metodo que edita um item da lista
    editaItemListaDeTarefa(event) {
        event.preventDefault();
        this.pausaCronometroItemTarefa(event);
        let elementoBotaoEditar = event.target;
        let indiceLista = elementoBotaoEditar.value;
        let informacaoView = new InformacaoView();
        let relogioHtml = this._inputRelogioTarefa;
        let htmlString = informacaoView.tarefaEdicaoTemplateInformacao(this._listaDeTarefa[parseInt(indiceLista)], parseInt(indiceLista));
        relogioHtml.innerHTML = htmlString;
        this._formEdicaoItemTarefa = document.querySelector("#formEdicaoTarefa");
        this._formEdicaoItemTarefa.addEventListener('submit', tarefaController.confirmaEdicaoDeItemListaDeTarefa.bind(tarefaController));
    }
    confirmaEdicaoDeItemListaDeTarefa(event) {
        event.preventDefault();
        let _inputNomeEdicao = document.querySelector('#nomeTarefaEdicao');
        let _inputPrioridadeTarefaEdicao = document.querySelector('#prioridadeTarefaEdicao');
        let _inputDescricaoTarefaEdicao = document.querySelector('#descricaoTarefaEdicao');
        let _inputIndiceEdicao = document.querySelector('#indiceEdicao');
        let nomeEdicao = _inputNomeEdicao.value;
        let prioridadeEdicao = parseInt(_inputPrioridadeTarefaEdicao.value);
        let idescricaoEdicao = _inputDescricaoTarefaEdicao.value;
        let indiceListaDeTarefas = parseInt(_inputIndiceEdicao.value);
        let tarefa = new Tarefa(nomeEdicao, prioridadeEdicao, idescricaoEdicao, this._listaDeTarefa[indiceListaDeTarefas].segundo, this._listaDeTarefa[indiceListaDeTarefas].minuto, this._listaDeTarefa[indiceListaDeTarefas].hora);
        this._listaDeTarefa[indiceListaDeTarefas] = tarefa;
        this.ordenaListaPorPrioridade();
        this.criaListaDeTarefaHtml();
        this.insereEventoBotaoIniciar();
        this.insereEventoBotaoPausar();
        this.insereEventoBotaoFinalizar();
        this.insereEventoBotaoEditar();
        this.insereEventoBotaoExcluir();
        let informacaoView = new InformacaoView();
        let relogioHtml = this._inputRelogioTarefa;
        let htmlString = informacaoView.tarefaEdicaoTemplateInformacaoEfetuada(tarefa);
        // let htmlString=informacaoView.tarefaEdicaoTemplateInformacaoEfetuada(this._listaDeTarefa[indiceListaDeTarefas]);
        relogioHtml.innerHTML = htmlString;
    }
    //Metodo exclui um item da lista e refaz o html
    excluiItemListaDeTarefa(event) {
        event.preventDefault();
        let elementoBotaoExcluir = event.target;
        let indiceLista = elementoBotaoExcluir.value;
        let informacaoView = new InformacaoView();
        let relogioHtml = this._inputRelogioTarefa;
        let htmlString = informacaoView.tarefaExcluidaTemplateInformacao(this._listaDeTarefa[parseInt(indiceLista)]);
        relogioHtml.innerHTML = htmlString;
        this._listaDeTarefa.splice(parseInt(indiceLista), 1);
        clearInterval(this._relogioTarefa);
        this.criaListaDeTarefaHtml();
        this.insereEventoBotaoIniciar();
        this.insereEventoBotaoPausar();
        this.insereEventoBotaoFinalizar();
        this.insereEventoBotaoEditar();
        this.insereEventoBotaoExcluir();
    }
    iniciaCronometroItemTarefa(event) {
        clearInterval(this._relogioTarefa);
        let informacaoView = new InformacaoView();
        let elementoBotaoIniciar = event.target;
        let indiceLista = parseInt(elementoBotaoIniciar.value);
        let incrementoSegundo = this._listaDeTarefa[indiceLista].segundo;
        let incrementoMinuto = this._listaDeTarefa[indiceLista].minuto;
        let incrementoHora = this._listaDeTarefa[indiceLista].hora;
        // console.log(this._listaDeTarefa[indiceLista]);
        this._relogioTarefa = setInterval(function (tarefa, relogioHtml, informacaoView) {
            tarefa.setSegundo(incrementoSegundo);
            relogioHtml.innerHTML = informacaoView.atualizaRelogioTemplateInformacao(tarefa);
            // relogioHtml.innerHTML = "Nome Tarefa : " + tarefa.nome + " <br>Tempo : " + tarefa.hora + "Hrs " + tarefa.minuto + "Min " + tarefa.segundo+"Seg";
            incrementoSegundo++;
            console.log(incrementoSegundo);
            if (incrementoSegundo == 60) {
                incrementoMinuto++;
                if (incrementoMinuto == 60) {
                    incrementoHora++;
                    tarefa.setHora(incrementoHora);
                    incrementoMinuto = 0;
                    tarefa.setMinuto(incrementoMinuto);
                }
                else {
                    tarefa.setMinuto(incrementoMinuto);
                }
                incrementoSegundo = 0;
                tarefa.setSegundo(incrementoSegundo);
            }
        }, 1000, this._listaDeTarefa[indiceLista], this._inputRelogioTarefa, informacaoView);
        this.imprimeListaNoConsole();
    }
    pausaCronometroItemTarefa(event) {
        let elementoBotaoPausar = event.target;
        let indiceLista = parseInt(elementoBotaoPausar.value);
        let informacaoView = new InformacaoView();
        let relogioHtml = this._inputRelogioTarefa;
        let htmlString = informacaoView.tarefaPausadaTemplateInformacao(this._listaDeTarefa[indiceLista]);
        relogioHtml.innerHTML = htmlString;
        clearInterval(this._relogioTarefa);
    }
    //metodo imprime a lista de tarefas no console item por item
    imprimeListaNoConsole() {
        console.log("Noma lista :");
        this._listaDeTarefa.forEach(element => {
            console.log(element);
        });
    }
}
