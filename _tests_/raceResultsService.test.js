import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';

jest.mock("../src/Client");
jest.mock("../src/Message");

describe('RaceResultsService',() => {   
    test('Subscribed Client should receive Message', () => {
        const client = new Client();
        const message = new Message();
        const raceResultsService = new RaceResultsService();
    
        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        expect(client.receive).toHaveBeenCalledWith(message);
    });

    test('None Subscribed clients should not recieve message',() => {
        const raceResultsService = new RaceResultsService();
        const message = new Message();
        const client = new Client();

        raceResultsService.send(message);
        expect(client.receive).not.toHaveBeenCalledWith(message);
    });


    // OLD Stuff
    // test('Subscribed Client Should Recieve Message',() => {
    //     const client = new Client("ClientA");
    //     const raceResultsService = new RaceResultsService();
    //     const message = new Message();
    //     jest.spyOn(client,'receive');
        
    //     raceResultsService.addSubscriber(client);
    //     raceResultsService.send(message);
    //     expect(client.receive).toHaveBeenCalledWith(message);
    // });

    // test('None Subscribed clients should not recieve message',() => {
    //     const raceResultsService = new RaceResultsService();
    //     const message = new Message();
              
    //     raceResultsService.send(message);
    //     expect(raceResultsService.client).toBeUndefined();
    // });
});