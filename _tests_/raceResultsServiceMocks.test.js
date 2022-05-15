import Message from '../src/Message';
import RaceResultsService from '../src/RaceResultsservice';

const client = jest.mock('../src/Client', () => {
    return class {
        receive (message) {}
     
        name(){
           return "CompanyA";
        }
    }
});


describe('RaceResultsService',() => {   
    
    test('Subscribed Client Should Recieve Message',() => {
        const raceResultsService = new RaceResultsService();
        console.log(client.name);
        const message = new Message();

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        expect(client.receive).toHaveBeenCalledWith(message);
    });
});