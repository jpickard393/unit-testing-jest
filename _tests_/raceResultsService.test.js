import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

jest.mock("../src/Message");
jest.mock("../src/Logger");
jest.mock("../src/Client");

describe('RaceResultsService',() => {  
    const category = 'Horse Race';
    const logger = new Logger();
    let message;
    let raceResultsService;
    let client;

    beforeEach(() => {
        raceResultsService = new RaceResultsService();
        message = new Message();
        message.category = category;
        client = new Client('Client1Name',category, logger);        
    });
    
    test('RaceResultsservice client should be the same as the one added',() =>{
        raceResultsService.addSubscriber(client);
        expect(raceResultsService.client).toBe(client);
    });

    test('Client should not be set in the raceResultsService after it has been removed',() =>{        
        raceResultsService.removeSubscriber(client);
        expect(raceResultsService.client).not.toBe(client);
    });

    // *** Review

    // the purpose of this test is to prove that the RaceResultsService sed function
    // will return true when the client receive function returns true
    test('Send function should return true',() =>{       
        const raceResultsService = new RaceResultsService();
        const clientReceiveMock = jest.fn();
        clientReceiveMock.mockReturnValue('true');
        Client.prototype.receive = clientReceiveMock;

        // now create a mock client with the new mocked receive function
        const clientMock = new Client;

        raceResultsService.addSubscriber(clientMock);

        // test that the return value from the send method is true
        // this is to test that send() is returnning what client.receive will return
        expect(raceResultsService.send(message)).toBe('true');
    });
});
