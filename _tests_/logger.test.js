import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

describe('Message sent by RaceResults Service Should log Date and text of each message',() => {
    // SUT = Logger
    
    // just need to test that the logger will call console.log with the right value
    test('message SHOULD be logged to console',()=>{
        const logger = new Logger();
        console.log = jest.fn();
        logger.logMessage('Hello');
        expect(console.log).toHaveBeenCalledWith("Hello");
    });

});