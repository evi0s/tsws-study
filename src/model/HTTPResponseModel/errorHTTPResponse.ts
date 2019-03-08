class errorResponse {
    private code: number;
    private message: string;
    private error: string;

    constructor(code: number, message: string, error: string) {
        this.code = code;
        this.message = message;
        this.error = error;
    }

    public toJson () {
        return {
            code: this.code,
            message: this.message,
            error: this.error || null
        }
    }

    public toString () {
        return JSON.stringify(this.toJson());
    }
}


export { errorResponse }