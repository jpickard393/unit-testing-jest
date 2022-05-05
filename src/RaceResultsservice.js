export default class RaceResultsService{
    constructor() {
    }

    addSubscriber(client) {
        this.client = client;
    }

    send(message){
        if(this.client !== undefined){
            this.client.receive(message);
        }
        else{
            console.log(this.client,'error');
            return "Error - No Client Subscribed";
        }
    }
}