import Message from '../src/Message';

const client = jest.mock('../src/Client', () => {
    return class {
        receive (message) {}
     
        name(){
           return "CompanyA";
        }
    }
});

const raceResultsService = jest.mock('../src/raceResultsService',() => {
    return class {
   
    addSubscriber(client) {
        this.client = client;
    }

    send(message){
        console.log(this.client);
        if(this.client !== undefined){
            this.client.receive(message);
        }
        else{
            console.log(this.client,'error');
            return "Error - No Client Subscribed";
        }
    }
}
});


describe('RaceResultsService',() => {   
    
    test('Subscribed Client Should Recieve Message',() => {
        console.log(client.name);
        const message = new Message();

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        expect(client.receive).toHaveBeenCalledWith(message);
    });
});