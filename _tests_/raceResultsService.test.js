import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';

// create a mock instance of the client class
//jest.mock('../src/Client');

describe('RaceResultsService',() => {   
    test('Subscribed Client Should Recieve Message',() => {
        const client = new Client("ClientA");
        const raceResultsService = new RaceResultsService();
        const message = new Message();
        jest.spyOn(client,'receive');
        
        raceResultsService.addSubscriber(client);
        console.log(client.name);
        raceResultsService.send(message);
        expect(client.receive).toHaveBeenCalledWith(message);
    });

    test('None Subscribed clients should not recieve message',() => {
        const client = new Client("ClientB");
        const raceResultsService = new RaceResultsService();
        const message = new Message();
        console.log(client.name);
              
        raceResultsService.send(message);
        expect(raceResultsService.client).toBeUndefined();
    });


    // test('Subscribed Client Should Recieve Message',() => {
    //     const raceResultsService = new RaceResultsService();
    //     const mockClient = new Client();
    //     const message = new Message();
    //     //const clientMock = jest.fn(Client);
    //     //const receiveMock = jest.fn(Client.receive);
    //     const messageMock = jest.fn(message);

    //     raceResultsService.addSubscriber(mockClient);
    //     raceResultsService.send(messageMock);

    //     expect(mockClient).toBeCalledWith(messageMock);
    // });
});