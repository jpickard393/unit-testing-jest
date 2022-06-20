import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

describe ('raceResults service enhanced',() => {
    // SUT is Client   
    jest.mock("../src/Message");
    jest.mock("../src/Logger");  // don't need real logger here so mock

    let client;
    let message; 
    const logger = new Logger();
    const raceResultsService = new RaceResultsService(logger);
    const category = 'Horse Race';
    
    beforeEach(() => {
        client = new Client('Client1',category);
        message = new Message(category);
    });
     
    test('Client subscribedCategory should be same as the message category', () => {
        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);

        expect(client.subscribedCategory).toBe(category);
    });

    test('Client should receive a message of category type it is subscribed to', () => {
        const receiveMock =  jest.spyOn(client, "receive");

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        
        expect(receiveMock).toHaveReturnedWith(true);
    });

    test('Client should NOT receive a message of a category type it is NOT subscribed to', () => {        
        const unsubscribedCategory = 'Snail Racing';
        const receiveMock =  jest.spyOn(client, "receive");
        const message = new Message(unsubscribedCategory);

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        
        expect(receiveMock).not.toHaveReturnedWith(true);
    });
});

describe('Message sent by RaceResults Service Should be Logged',() => {
    // SUT = Client
    const category = 'Boat Race';
    const msgDate = "20/06/2022";
    const msgText = "Hello from Logger";
    let raceResultsService;
    let logger;
    let client;
    let message; 

    jest.mock("../src/Message");
    
    beforeEach(() => {
        logger = new Logger(); // real logger to test
        raceResultsService = new RaceResultsService(logger);
        client = new Client('Client1',category);
        message = new Message(category,msgText,msgDate);
    });
    
    test.only('date and text of each message should be logged',() => {       
        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);

        const logMessageMock = jest.spyOn(client, "logIncomingMessage");
        
        expect(logMessageMock).toHaveBeenCalled();

        //expect(logMessageMock).toHaveBeenCalledWith(logger,message);

    });
});