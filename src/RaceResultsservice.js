export default class RaceResultsService{
    constructor(logger) {
        this.logger = logger
    }

    logger(){
        return this.logger;
    }

    addSubscriber(client) {
        this.client = client;
    }

    removeSubscriber(){
        this.client = undefined;
    }

    send(message){
        if(this.client !== undefined){
            this.client.receive(this.logger,message);
        }
        else{
            console.log(this.client,'error');
            return "Error - No Client Subscribed";
        }
    }
}