class Tarefa {
    constructor(nome, prioridade, descricao, segundo, minuto, hora) {
        this.setNome(nome);
        this.setPrioridade(prioridade);
        this.setDescricao(descricao);
        this.setSegundo(segundo);
        this.setMinuto(minuto);
        this.setHora(hora);
    }
    get nome() {
        return this._nome;
    }
    get prioridade() {
        return this._prioridade;
    }
    get descricao() {
        return this._descricao;
    }
    get segundo() {
        return this._segundo;
    }
    get minuto() {
        return this._minuto;
    }
    get hora() {
        return this._hora;
    }
    setNome(nome) {
        this._nome = nome;
    }
    setPrioridade(prioridade) {
        this._prioridade = prioridade;
    }
    setDescricao(descricao) {
        this._descricao = descricao;
    }
    setSegundo(segundo) {
        this._segundo = segundo;
    }
    setMinuto(minuto) {
        this._minuto = minuto;
    }
    setHora(hora) {
        this._hora = hora;
    }
}
