import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';

const raceResultsService = new RaceResultsService();
const category = 'Horse Race';
const client = new Client('Client1',category);

beforeEach(() => {
    jest.clearAllMocks();
});

// SUT is Client

describe ('raceResults service enhanced',() => {   
    test('Client subscribedCategory should be same as the message category', () => {
        jest.mock("../src/Message");

        const message = new Message(category);

        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);

        expect(client.subscribedCategory).toBe(category);
    });

    test('Client should receive a message of a category it is subscribed to', () => {
        jest.mock("../src/Message");

        const receiveMock =  jest.spyOn(client, "receive");
        const message = new Message(category);

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