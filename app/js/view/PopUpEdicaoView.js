// class PopUpEdicaoView {
//     constructor() { }
//     criaPopUpEdicaoTemplate(listaDeTarefa: Array<Tarefa>, indice: number): string {
//         let popUpEdita = `
//                                 <form action="" id="formEdicaoTarefa"  >
//                                     <label>
//                                         <p> Nome Tarefa: ${listaDeTarefa[indice].nome}</p>
//                                     </label>
//                                     <label>
//                                         <p> Prioridade: ${listaDeTarefa[indice].prioridade}</p>
//                                     </label>
//                                     <label>
//                                         <p> Descrição: ${listaDeTarefa[indice].descricao}</p>
//                                     </label>
//                                     <input type="hidden" id="indiceEdicao" value="${indice}">
//                                     <br>
//                                     <br>
//                                     <br>
//                                     <label>
//                                         <p> Nome Tarefa: </p>
//                                         <input type="text" id="nomeTarefaEdicao" required>
//                                     </label>
//                                     <label>
//                                         <p> Prioridade: </p>
//                                         <input type="text" id="prioridadeTarefaEdicao" required>
//                                     </label>
//                                     <label>
//                                         <p> Descrição: </p>
//                                         <input type="text" id="descricaoTarefaEdicao" required>
//                                     </label>
//                                         <input type="submit" value="alterar" >
//                                 </form>
//                         `;
//         return popUpEdita;
//     }
//     eliminaPopUpEdicao(): string {
//         return "";
//     }
// }
