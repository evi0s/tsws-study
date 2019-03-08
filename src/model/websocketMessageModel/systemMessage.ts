class systemMessageModel {
    private code    : number;
    private message : string;
    private error   : boolean;

    constructor (_code    : number,
                 _message : string,
                 _error   : boolean) {
        this.code    = _code;
        this.message = _message;
        this.error   = _error;
    }

    buildObject (): object {
        return {
            code    : this.code,
            message : this.message,
            error   : this.error
        }
    }

    toString (): string {
        return JSON.stringify(this.buildObject());
    }

    toJson (): object {
        return this.buildObject();
    }
}

export { systemMessageModel }
