export class CustomError extends Error {

    statusCode: number;
    description: string;
    message: string;

    constructor(statusCode: number, description: string, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.description = description;
        this.message = message;
    }
}