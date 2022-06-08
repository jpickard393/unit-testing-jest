import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';

// SUT is Client

describe ('raceResults service enhanced',() => {   
    jest.mock("../src/Message");

    const raceResultsService = new RaceResultsService();
    const category = 'Horse Race';
    
    let message;
    let client

    beforeEach(() => {
        client = new Client('Client1',category);
        message = new Message(category);
    });
    
 
    test('Client subscribedCategory should be same as the message category', () => {
        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);

        expect(client.subscribedCategory).toBe(category);
    });

    test('Client should receive a message of a category it is subscribed to', () => {
        const receiveMock =  jest.spyOn(client, "receive");

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        
        expect(receiveMock).toHaveReturnedWith(true);
    });

    test('Client should not receive a message of a category it is NOT subscribed to', () => {
        jest.mock("../src/Message");
        
        const unsubscribedCategory = 'Snail Racing';
        const receiveMock =  jest.spyOn(client, "receive");
        const message = new Message(unsubscribedCategory);

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        
        expect(receiveMock).not.toHaveReturnedWith(true);
    });

    
});