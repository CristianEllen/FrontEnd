import { Constants } from "./constans.model";

export class ResponseMessage<T> {
    status: number;
    message: string;
    data: T | null | undefined;
    validate?: any;
    length?: number;
    name?: string;

    constructor(status?: number, message?: string, data?: T, validate?: any, length?: number, name?: string) {
        this.status = status || Constants.STATUS.Success;
        this.message = message || Constants.MESSAGE_STATUS.Success;
        this.data = data;
        this.validate = validate || null;
        this.length = length || 0;
        this.name = !name || null ? name : undefined;
    }
}
