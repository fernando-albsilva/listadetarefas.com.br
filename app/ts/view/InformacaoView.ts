class InformacaoView {


    constructor() { }

    //esse metodo cria o codigo html da lista inserindo todos os dados necessarios
    atualizaRelogioTemplateInformacao(tarefa: Tarefa): string {

        console.log("entrou");
        let template = `<h1 class="informacaoTexto atualizaTarefa">Tarefa Iniciada</h1>
                        <h2 class="informacaoTexto">Nome Tarefa :  ${tarefa.nome}  </h2>
                        <h3 class="informacaoTexto">Tempo :  ${tarefa.hora}  Hrs  ${tarefa.minuto}  Min  ${tarefa.segundo} Seg</h3>
                        <p class="informacaoTexto">Descrição :  ${tarefa.descricao}  </p>
                        `;
           
        return template;

    }

    tarefaPausadaTemplateInformacao(tarefa: Tarefa): string{
        
        console.log("entrou");
        let template = `<h1 class="informacaoTexto pausaTarefa">Tarefa Pausada</h1>
                        <h2 class="informacaoTexto">Nome Tarefa :  ${tarefa.nome}  </h2>
                        <h3 class="informacaoTexto">Tempo :  ${tarefa.hora}  Hrs  ${tarefa.minuto}  Min  ${tarefa.segundo} Seg</h3>
                        <p  class="informacaoTexto">Descrição :  ${tarefa.descricao}  </p>
                        `;
         return template;
    }

    tarefaFinalizadaTemplateInformacao(tarefa: Tarefa): string{
        
        console.log("entrou");
        let template = `<h1 class="informacaoTexto finalizaTarefa">Tarefa Finalizada</h1>
                        <h2 class="informacaoTexto">Nome Tarefa :  ${tarefa.nome}  </h2>
                        <h3 class="informacaoTexto">Tempo Dedicado a Tarefa :  ${tarefa.hora}  Hrs  ${tarefa.minuto}  Min  ${tarefa.segundo} Seg</h3>
                        <p class="informacaoTexto">Descrição :  ${tarefa.descricao}  </p>
                        `;
         return template;
    }

    tarefaExcluidaTemplateInformacao(tarefa: Tarefa): string{
        
        console.log("entrou");
        let template = `<h1 class="informacaoTexto excluiTarefa">Tarefa Excluida</h1>
                        <h2 class="informacaoTexto">Nome Tarefa :  ${tarefa.nome}  </h2>
                        <h3 class="informacaoTexto">Tempo Dedicado a Tarefa :  ${tarefa.hora}  Hrs  ${tarefa.minuto}  Min  ${tarefa.segundo} Seg</h3>
                        <p  class="informacaoTexto">Descrição :  ${tarefa.descricao}  </p>
                        `;
         return template;
    }

    tarefaEdicaoTemplateInformacao(tarefa: Tarefa,indice : number): string{
        
        console.log("entrou");

        let template = `
                               
        <form action="" id="formEdicaoTarefa"  >
            <br>
            <label>
                <p class="pExplicacao"> Nome Tarefa: ${tarefa.nome}</p>
            </label>
            
            <label>
                <p class="pExplicacao"> Prioridade: ${tarefa.prioridade}</p>
            </label>

            <label>
                <p class="pExplicacao"> Descrição: ${tarefa.descricao}</p>
            </label>
            <input type="hidden" id="indiceEdicao" value="${indice}">
            
          
            <br>
            <label>
                <p class="pExplicacao"> Nome Tarefa: </p>
                <input class="inputText" type="text" id="nomeTarefaEdicao" required>
            </label>
            
            <label>
                <p class="pExplicacao"> Prioridade: </p>
                <input class="inputText" type="number" min="0" max="100" id="prioridadeTarefaEdicao" required>
            </label>
    
            <label>
                <p class="pExplicacao"> Descrição: </p>
                <textarea class="iputTextArea edicao" type="text"  id="descricaoTarefaEdicao" maxlength="300" rows="5" cols="60" style="resize: none"
                required></textarea>
            </label>
            <br>
            <br>
                <input class="botaoEditar" type="submit" value="Editar" >
        </form>
        `;



         return template;
    }


    tarefaEdicaoTemplateInformacaoEfetuada(tarefa: Tarefa): string{
    
        console.log("entrou");
        let template = `<h1 class="informacaoTexto editaTarefa">Tarefa Editada</h1>
                        <h2 class="informacaoTexto">Nome Tarefa :  ${tarefa.nome}  </h2>
                        <h3 class="informacaoTexto">Tempo Dedicado a Tarefa :  ${tarefa.hora}  Hrs  ${tarefa.minuto}  Min  ${tarefa.segundo} Seg</h3>
                        <p  class="informacaoTexto">Descrição :  ${tarefa.descricao}  </p>
                        `;
         return template;
    }

}