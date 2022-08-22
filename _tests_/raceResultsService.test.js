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
    
    test('client should be the same as the one added',() =>{
        raceResultsService.addSubscriber(client);
        expect(raceResultsService.client).toBe(client);
    });

    test('Client should not be set in the raceResultsService after it has been removed',() =>{        
        raceResultsService.removeSubscriber(client);
        expect(raceResultsService.client).not.toBe(client);
    });

    test('send function Should return true when clients recieve function is successfull',() =>{       
        const raceResultsService = new RaceResultsService();
        const clientReceiveMock = jest.fn();

        // Mock the clients receive function so we can pass it into the raceresults service
        clientReceiveMock.mockReturnValue(true);
        Client.prototype.receive = clientReceiveMock;

        // now create a mock client with the new mocked receive function
        const clientMock = new Client;

        raceResultsService.addSubscriber(clientMock);

        // test that the return value from the send method is true
        // this is to test that send() is returnning what client.receive will return
        
        expect(raceResultsService.send(message)).toBe(true);
        expect(clientMock.receive).toHaveBeenCalledWith(message);
    });
});
