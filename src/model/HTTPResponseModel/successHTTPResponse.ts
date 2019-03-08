class successResponse {
    private code: number;
    private message: string;
    private data: any;

    constructor(code: number, message: string, data: any) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public toJson () {
        return {
            code: this.code,
            message: this.message,
            data: this.data
        }
    }

    public toString () {
        return JSON.stringify(this.toJson());
    }
}


export { successResponse }