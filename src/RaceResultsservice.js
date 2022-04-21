export default class RaceResultsService{
    clients = [];

    addSubscriber(client) {
        this.clients.push(client);
    }

    send(message){
        clients.forEach(c => c.receive(message));
    }
}