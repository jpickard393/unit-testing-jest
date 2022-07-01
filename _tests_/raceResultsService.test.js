import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

jest.mock("../src/Message");
jest.mock("../src/Logger");

// should I mock raceResultsService or use concrete class
// as the client is mocked is this actualy a realistic test

describe('RaceResultsService',() => {  
    const category = 'Horse Race';
    const logger = new Logger();
    let message;
    let raceResultsService;
    let client;

    beforeEach(() => {
        client = new Client('Client1Name',category, logger);
        message = new Message();
        message.category = category;
        raceResultsService = new RaceResultsService();
    });
    
    test('addSubscriber',() =>{
        raceResultsService.addSubscriber(client);
        expect(raceResultsService.client).toBe(client);
    });

    test('removeSubscriber',() =>{
        raceResultsService.removeSubscriber(client);
        expect(raceResultsService.client).not.toBe(client);
    });

    test('RaceResultsService send method should return true',() =>{
        raceResultsService.addSubscriber(client);
        const sendResult = raceResultsService.send(message);
        expect(sendResult).toBe(true);
    });

    // here I mock raceResultsService as I don't need the class, but I spy on the send method
    test('send',() =>{
        jest.mock("../src/RaceResultsservice");
        
        const raceResultsService = new RaceResultsService();
        const sendMock =  jest.spyOn(raceResultsService, "send");

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        expect(sendMock).toHaveBeenCalledWith(message);
    });
});
