import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

describe('Message sent by RaceResults Service Should log Date and text of each message',() => {
    // SUT = Logger
    jest.mock('../src/Client');
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

    test('Logger LogMessage function Should be called with correct message',() => {   
        const logMessageMock = jest.spyOn(logger, "logMessage")

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        
        expect(logMessageMock).toHaveBeenCalledWith(message);
    });
});