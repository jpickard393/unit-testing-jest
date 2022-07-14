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
    
    test('add Subscriber',() =>{
        raceResultsService.addSubscriber(client);
        expect(raceResultsService.client).toBe(client);
    });

    test('remove Subscriber',() =>{
        raceResultsService.removeSubscriber(client);
        expect(raceResultsService.client).not.toBe(client);
    });

    // here I mock raceResultsService as I don't need the class, but I spy on the send method.  Is this OK?
    test('send',() =>{
        jest.mock("../src/RaceResultsservice");
        
        const raceResultsService = new RaceResultsService();
        const sendMock =  jest.spyOn(raceResultsService, "send");

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        expect(sendMock).toHaveBeenCalledWith(message);
    });
});
