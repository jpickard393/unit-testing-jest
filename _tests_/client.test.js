import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

describe ('Client',() => {
    // SUT is Client   
    jest.mock("../src/Message");
    jest.mock("../src/Client");
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

    test('None Subscribed clients should not recieve message',() => {
        const receiveMock =  jest.spyOn(client, "receive");

        raceResultsService.send(message);
        expect(receiveMock).not.toHaveBeenCalledWith(message);
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

    test('removed subscriber does not receive message', () => {
        const receiveMock =  jest.spyOn(client, "receive");
            
        raceResultsService.addSubscriber(client);
        raceResultsService.removeSubscriber();
        raceResultsService.send(message);

        expect(receiveMock).not.toHaveBeenCalledWith(message);
    });
});