import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';

// create a mock instance of the client class
jest.mock('../src/Client');

describe('RaceResultsService',() => {
    const raceResultsService = new RaceResultsService();
    const client = new Client();

    jest.spyOn(client,'receive');
    test('Subscribed Client Should Recieve Message',() => {
        const message = new Message();
        
        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        expect(client.receive).toBeCalledWith(message);
        
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