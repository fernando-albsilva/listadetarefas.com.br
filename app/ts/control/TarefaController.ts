class TarefaController {

    private _inputNome: HTMLInputElement;
    private _inputPrioridade: HTMLInputElement;
    private _inputDescricao: HTMLInputElement;
    private _inputDivContainerTabela: HTMLInputElement;
    private _inputDivContainerTabelaConcluida: HTMLInputElement;
    private _inputPopUpEditaItemDaLista: HTMLInputElement;
    private _formEdicaoItemTarefa: HTMLInputElement;
    private _inputBotaoIniciar: NodeListOf<Element>;
    private _inputBotaoPausar: NodeListOf<Element>;
    private _inputBotaoFinalizar: NodeListOf<Element>;
    private _inputBotaoEditar: NodeListOf<Element>;
    private _inputBotaoExcluir: NodeListOf<Element>;

    private _inputRelogioTarefa: HTMLInputElement;
    private _relogioTarefa: any;

    private _listaDeTarefa: Array<Tarefa>;
    private _listaDeTarefaConcluida: Array<Tarefa>;

    constructor() {

        this._inputNome = <HTMLInputElement>document.querySelector('#nomeTarefa');
        this._inputPrioridade = <HTMLInputElement>document.querySelector('#prioridadeTarefa');
        this._inputDescricao = <HTMLInputElement>document.querySelector('#descricaoTarefa');
        this._inputDivContainerTabela = <HTMLInputElement>document.querySelector('#containerListaDeTarefas');
        this._inputDivContainerTabelaConcluida = <HTMLInputElement>document.querySelector('#containerListaDeTarefasConcluida');
        this._inputPopUpEditaItemDaLista = <HTMLInputElement>document.querySelector('#popUpEditaItemDaLista');
        this._inputRelogioTarefa = <HTMLInputElement>document.querySelector('#relogioTarefa');
        this._listaDeTarefa = [];
        this._listaDeTarefaConcluida = [];

    }

    // Metodo adiciona uma tarefa na lista de tarefas quando clicado em adicionar
    adicionaTarefaNaLista(event: Event): void {

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

    ordenaListaPorPrioridade(): void {

        this._listaDeTarefa.sort(function (a, b) {
            return a.prioridade < b.prioridade ? -1 : a.prioridade > b.prioridade ? 1 : 0;
        });
    }

    //Metodo cria o codigo html da lista de tarefas para ser inserido na pagina html
    criaListaDeTarefaHtml(): void {

        let listaDeTarefaView = new ListaDeTarefaView();

        let tabela = listaDeTarefaView.criaListaTemplate(this._listaDeTarefa);

        this._inputDivContainerTabela.innerHTML = tabela;

        let tabelaConcluida = listaDeTarefaView.criaListaConcluidaTemplate(this._listaDeTarefaConcluida);

        this._inputDivContainerTabelaConcluida.innerHTML = tabelaConcluida;
    }

    insereEventoBotaoIniciar(): void {

        this._inputBotaoIniciar = document.querySelectorAll('.botaoIniciar');

        this._inputBotaoIniciar.forEach(element => {

            element.addEventListener('click', tarefaController.iniciaCronometroItemTarefa.bind(tarefaController));

        });

    }

    insereEventoBotaoPausar(): void {

        this._inputBotaoPausar = document.querySelectorAll('.botaoPausar');

        this._inputBotaoPausar.forEach(element => {

            element.addEventListener('click', tarefaController.pausaCronometroItemTarefa.bind(tarefaController));

        });

    }

    insereEventoBotaoFinalizar(): void {

        this._inputBotaoFinalizar = document.querySelectorAll('.botaoFinalizar');

        this._inputBotaoFinalizar.forEach(element => {

            element.addEventListener('click', tarefaController.finalizaItemListaDeTarefa.bind(tarefaController));

        });

    }

    insereEventoBotaoEditar(): void {

        this._inputBotaoEditar = document.querySelectorAll('.botaoEditar');

        this._inputBotaoEditar.forEach(element => {

            element.addEventListener('click', tarefaController.editaItemListaDeTarefa.bind(tarefaController));

        });

    }

    //metodo insere um EventListener para cada botao excluir da lista de Tarefas
    insereEventoBotaoExcluir(): void {

        this._inputBotaoExcluir = document.querySelectorAll('.botaoExcluir');

        this._inputBotaoExcluir.forEach(element => {

            element.addEventListener('click', tarefaController.excluiItemListaDeTarefa.bind(tarefaController));

        });
    }
    
    //Metodo finaliza item de uma lista
    finalizaItemListaDeTarefa(event: Event):void{
        
        event.preventDefault();

        let elemento = <HTMLInputElement>event.target;

        let indiceLista = elemento.value;

        let relogioHtml = <HTMLInputElement>this._inputRelogioTarefa;

        let informacaoView = new InformacaoView();

        let htmlString=informacaoView.tarefaFinalizadaTemplateInformacao(this._listaDeTarefa[parseInt(indiceLista)]);


        relogioHtml.innerHTML=htmlString;

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
     editaItemListaDeTarefa(event: Event): void {

        event.preventDefault();

        this.pausaCronometroItemTarefa(event);

        let elementoBotaoEditar = <HTMLInputElement>event.target;

        let indiceLista = elementoBotaoEditar.value;

        let informacaoView = new InformacaoView();

        let relogioHtml = <HTMLInputElement>this._inputRelogioTarefa;

        let htmlString=informacaoView.tarefaEdicaoTemplateInformacao(this._listaDeTarefa[parseInt(indiceLista)],parseInt(indiceLista));

        relogioHtml.innerHTML=htmlString;

        this._formEdicaoItemTarefa = document.querySelector("#formEdicaoTarefa");

        this._formEdicaoItemTarefa.addEventListener('submit', tarefaController.confirmaEdicaoDeItemListaDeTarefa.bind(tarefaController));
    }

  

    confirmaEdicaoDeItemListaDeTarefa(event: Event) {

        event.preventDefault();

        let _inputNomeEdicao = <HTMLInputElement>document.querySelector('#nomeTarefaEdicao');
        let _inputPrioridadeTarefaEdicao = <HTMLInputElement>document.querySelector('#prioridadeTarefaEdicao');
        let _inputDescricaoTarefaEdicao = <HTMLInputElement>document.querySelector('#descricaoTarefaEdicao');
        let _inputIndiceEdicao = <HTMLInputElement>document.querySelector('#indiceEdicao');

        let nomeEdicao = _inputNomeEdicao.value;
        let prioridadeEdicao = parseInt(_inputPrioridadeTarefaEdicao.value);
        let idescricaoEdicao = _inputDescricaoTarefaEdicao.value;
        let indiceListaDeTarefas = parseInt(_inputIndiceEdicao.value);

        let tarefa = new Tarefa(nomeEdicao,
            prioridadeEdicao,
            idescricaoEdicao,
            this._listaDeTarefa[indiceListaDeTarefas].segundo,
            this._listaDeTarefa[indiceListaDeTarefas].minuto,
            this._listaDeTarefa[indiceListaDeTarefas].hora);

        this._listaDeTarefa[indiceListaDeTarefas] = tarefa;

        this.ordenaListaPorPrioridade();

        this.criaListaDeTarefaHtml();

        this.insereEventoBotaoIniciar();
        
        this.insereEventoBotaoPausar();
        
        this.insereEventoBotaoFinalizar();
        
        this.insereEventoBotaoEditar();
        
        this.insereEventoBotaoExcluir();

        let informacaoView = new InformacaoView();

        let relogioHtml = <HTMLInputElement>this._inputRelogioTarefa;

        let htmlString=informacaoView.tarefaEdicaoTemplateInformacaoEfetuada(tarefa);

        // let htmlString=informacaoView.tarefaEdicaoTemplateInformacaoEfetuada(this._listaDeTarefa[indiceListaDeTarefas]);

        relogioHtml.innerHTML=htmlString;
        

    }

   


    //Metodo exclui um item da lista e refaz o html
    excluiItemListaDeTarefa(event: Event): void {

        event.preventDefault();

        let elementoBotaoExcluir = <HTMLInputElement>event.target;

        let indiceLista = elementoBotaoExcluir.value;

        let informacaoView = new InformacaoView();

        let relogioHtml = <HTMLInputElement>this._inputRelogioTarefa;

        let htmlString=informacaoView.tarefaExcluidaTemplateInformacao(this._listaDeTarefa[parseInt(indiceLista)]);

        relogioHtml.innerHTML=htmlString;

        this._listaDeTarefa.splice(parseInt(indiceLista), 1);

        clearInterval(this._relogioTarefa);

        this.criaListaDeTarefaHtml();

        this.insereEventoBotaoIniciar();
        
        this.insereEventoBotaoPausar();
        
        this.insereEventoBotaoFinalizar();
        
        this.insereEventoBotaoEditar();
        
        this.insereEventoBotaoExcluir();
    }

   
    iniciaCronometroItemTarefa(event: Event) {

        clearInterval(this._relogioTarefa);

        
        let informacaoView = new InformacaoView();

        let elementoBotaoIniciar = <HTMLInputElement>event.target;

        let indiceLista: number = parseInt(elementoBotaoIniciar.value);
        let incrementoSegundo: number = this._listaDeTarefa[indiceLista].segundo;
        let incrementoMinuto: number = this._listaDeTarefa[indiceLista].minuto;
        let incrementoHora: number = this._listaDeTarefa[indiceLista].hora;
     
        // console.log(this._listaDeTarefa[indiceLista]);
        this._relogioTarefa = setInterval(function (tarefa: Tarefa, relogioHtml: any,informacaoView:InformacaoView) {

            tarefa.setSegundo(incrementoSegundo);
            relogioHtml.innerHTML =informacaoView.atualizaRelogioTemplateInformacao(tarefa);
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
                } else {
                    tarefa.setMinuto(incrementoMinuto);
                }

                incrementoSegundo = 0;
                tarefa.setSegundo(incrementoSegundo);
            }

        }, 1000, this._listaDeTarefa[indiceLista],this._inputRelogioTarefa,informacaoView);

        this.imprimeListaNoConsole();

    }

    pausaCronometroItemTarefa(event:Event) {


        let elementoBotaoPausar = <HTMLInputElement>event.target;

        let indiceLista: number = parseInt(elementoBotaoPausar.value);

        let informacaoView = new InformacaoView();

        let relogioHtml = <HTMLInputElement>this._inputRelogioTarefa;

        let htmlString=informacaoView.tarefaPausadaTemplateInformacao(this._listaDeTarefa[indiceLista]);

        relogioHtml.innerHTML=htmlString;

        clearInterval(this._relogioTarefa);

    }



    //metodo imprime a lista de tarefas no console item por item
    imprimeListaNoConsole(): void {

        console.log("Noma lista :");

        this._listaDeTarefa.forEach(element => {
            console.log(element);
        });

    }


}



