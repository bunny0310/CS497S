import { RegisterService } from "./registerServices";

export class Messages {
    static LogoutMessage = "logout";
    static LoginMessage = "login";
}

export class MessageBus {
    on = (event: string, callback: any) => {
        document.addEventListener(event, () => callback());
    } 
    dispatch = function<T>(event: string, data: T) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    }

    remove = (event: string, callback: any) => {
        document.removeEventListener(event, callback);
    }
}