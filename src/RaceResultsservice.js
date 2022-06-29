export default class RaceResultsService{
    constructor() {
    }

    addSubscriber(client) {
        this.client = client;
    }

    removeSubscriber(){
        this.client = undefined;
    }

    send(message){
        if(this.client !== undefined){
            // return result of send attempt
            console.log(this.client);
            return this.client.receive(message);
        }
        else{
            console.log(this.client,'error');
            return "Error - No Client Subscribed";
        }
    }
}