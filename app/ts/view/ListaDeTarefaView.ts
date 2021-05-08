class ListaDeTarefaView {


    constructor() { }

    //esse metodo cria o codigo html da lista inserindo todos os dados necessarios
    criaListaTemplate(listaDeTarefa: Array<Tarefa>): string {

        let tabelaCabecalho =
            `   <h2 class="textoForm cabecalho">Lista de Tarefas</h2>     
                <table class="tabelaLista"  >
                    <thead>
                        <tr class="linhaTabela">
                            <td class="dataTabela">Nome da Tarefa</td>
                            <td class="dataTabela">Prioridade</td>
                            
                            <td class="dataTabela">Iniciar</td>
                            <td class="dataTabela">Pausar</td>
                            <td class="dataTabela">Finalizar</td>
                            <td class="dataTabela">Editar</td>
                            <td class="dataTabela">Remover</td>    
                        </tr>
                        
                    </thead>   
            `;
        
        let tabelaCorpo =
            `
                <tbody>
                    ${listaDeTarefa.map((element, index) => {
                return `
                            <tr class="linhaTabela">
                                <td class="dataTabela">${element.nome}</td>
                                <td class="dataTabela">${element.prioridade}</td>
                               
                                <td class="dataTabela"> <button class="botaoIniciar" value="${index}">Iniciar</button> </td>
                                <td class="dataTabela"> <button class="botaoPausar" value="${index}">Pausar</button> </td>
                                <td class="dataTabela"> <button class="botaoFinalizar" value="${index}">Finalizar</button> </td>
                                <td class="dataTabela"> <button class="botaoEditar" value="${index}">Editar</button> </td>
                                <td class="dataTabela"> <button class="botaoExcluir" value="${index}">Excluir</button> </td>
    
                            </tr>
                            `
            }).join('')}
                </tbody>
            </table>
            `;

        return tabelaCabecalho + tabelaCorpo;

    }



    criaListaConcluidaTemplate(listaDeTarefa: Array<Tarefa>): string {

        let tabelaCabecalho =
            `   <h2 class="textoForm cabecalho">Lista de Tarefas Concluidas</h2>     
                <table class="tabelaLista"  >
                    <thead>
                        <tr class="linhaTabela">
                            <td class="dataTabela">Nome da Tarefa</td>
                            <td class="dataTabela">Prioridade</td>
                            
                            <td class="dataTabela">Status</td>
                            <td class="dataTabela">Tempo de duração</td>
                        </tr>
                        
                    </thead>   
            `;
        
        let tabelaCorpo =
            `
                <tbody>
                    ${listaDeTarefa.map((element, index) => {
                return `
                            <tr class="linhaConcluida">
                                <td class="dataTabela">${element.nome}</td>
                                <td class="dataTabela">${element.prioridade}</td>
                                
                                <td class="dataTabela">Concluida</td>
                                <td class="dataTabela">${element.hora}hrs ${element.minuto}min ${element.segundo}seg</td>
                            </tr>
                            `
            }).join('')}
                </tbody>
            </table>
            `;

        return tabelaCabecalho + tabelaCorpo;

    }

}