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
    const raceResultsService = new RaceResultsService();
    const category = 'Horse Race';
    
    beforeEach(() => {
        client = new Client('Client1',category, logger);
        message = new Message(category);
    });
     
    // should be test of client or make raceresult interact with client
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

describe('Message sent by RaceResults Service Should log Date and text of each message',() => {
    // SUT = Client
    jest.mock("../src/Message");
    jest.mock("../src/Logger");

    const raceResultsService = new RaceResultsService(); 

    const category = 'Boat Race';
    const msgDate = "20/06/2022";
    const msgText = "Hello from Logger";
    let logger;
    let client;
    let message; 

    beforeEach(() => {    
        logger = new Logger();
        client = new Client('Client1',category, logger);
        message = new Message(category,msgText,msgDate);
    });
    
    // test('Client logIncomingMessage function should be called with correct message ',() => {  
    //     const logIncomingMessageMock = jest.spyOn(client, "logIncomingMessage"); // remember to set this up before client is used

    //     raceResultsService.addSubscriber(client);
    //     raceResultsService.send(message);
        
    //     expect(logIncomingMessageMock).toHaveBeenCalledWith(message);
    // });

    test('Logger LogMessage function Should be called with correct message',() => {   
        const logMessageMock = jest.spyOn(logger, "logMessage")

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        
        expect(logMessageMock).toHaveBeenCalledWith(message);
    });
});


// put these in client test no race results