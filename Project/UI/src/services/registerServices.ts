import { MessageBus } from "./message-bus";
import { PostsWebservice } from "./posts-webservice";

export class RegisterService {
    static services : any = {};

    static register(serviceName: string, service: any) {
        this.services[serviceName] = service;
    }

    static retreive(serviceName: string) {
        try {
            return this.services[serviceName];
        } catch (exception: any) {
            console.log(exception);
            return "Error, service not found";
        }
    }
}

export function initializeServices () {
    RegisterService.register("postsWebService", new PostsWebservice());
    RegisterService.register("messageBus", new MessageBus());
}