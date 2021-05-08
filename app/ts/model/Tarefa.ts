class Tarefa {

    private _nome: string;
    private _prioridade: number;
    private _descricao: string;
    private _segundo: number;
    private _minuto: number;
    private _hora: number;
    
    constructor(nome: string, prioridade: number, descricao: string, segundo: number, minuto:number, hora:number){

        this.setNome(nome);
        this.setPrioridade(prioridade);
        this.setDescricao(descricao);
        this.setSegundo(segundo);
        this.setMinuto(minuto);
        this.setHora(hora);
    }

    get nome(){

        return this._nome;
    }

    get prioridade(){

        return this._prioridade;
    }

    get descricao():string{

        return this._descricao;
    }

    get segundo():number{
        return this._segundo;
    }

    get minuto():number{
        return this._minuto;
    }

    get hora():number{
        return this._hora;
    }

    setNome(nome: string):void{

        this._nome = nome;
    }

    setPrioridade(prioridade: number):void{

        this._prioridade = prioridade;
    }

    setDescricao(descricao: string):void{

        this._descricao = descricao;
    }

    setSegundo(segundo:number):void{
        
        this._segundo= segundo;
    }

    setMinuto(minuto:number):void{
        this._minuto = minuto;
    }

    setHora(hora:number){
        this._hora = hora;
    }
}