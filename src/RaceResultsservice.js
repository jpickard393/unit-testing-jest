export default class RaceResultsService{
    constructor() {
    }

    addSubscriber(client) {
        this.client = client;
    }

    send(message){
        this.client.receive(message);
    }
}