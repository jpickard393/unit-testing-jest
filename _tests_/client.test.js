import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

describe ('Client',() => {
    // SUT is Client so we need the real class

    jest.mock("../src/Message");
    jest.mock("../src/Logger");

    let client;
    let message; 
    //const logger = jest.fn({logMessage:jest.fn(message)});// new Logger();
    const logger = new Logger();
    const raceResultsService = new RaceResultsService(); // nothing to do with client
    const category = 'Horse Race';
    const clientName ='Client1Name';
    
    beforeEach(() => {
        client = new Client('Client1Name',category, logger);
        message = new Message(category);
    });

    test('it should call the logger when a message is received',() => {
        const logMessageMock =  jest.spyOn(logger, "logMessage");
        client.receive(message);
        expect(logMessageMock).toHaveBeenCalledWith(message);
    });

    test('it SHOULD update the client name',()=>{
        expect(client.name).toBe(clientName);
    })
    
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

    test('removed subscriber does not receive message', () => {
        const receiveMock =  jest.spyOn(client, "receive");
            
        raceResultsService.addSubscriber(client);
        raceResultsService.removeSubscriber();
        raceResultsService.send(message);

        expect(receiveMock).not.toHaveBeenCalledWith(message);
    });
});