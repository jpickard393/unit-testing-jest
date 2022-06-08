import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';

jest.mock("../src/Client");
jest.mock("../src/Message");

const raceResultsService = new RaceResultsService();

describe('RaceResultsService',() => {   
    test('Subscribed Client should receive Message', () => {
        const client = new Client();
        const message = new Message();
            
        raceResultsService.addSubscriber(client);
        raceResultsService.send(message);
        expect(client.receive).toHaveBeenCalledWith(message);
    });

    test('None Subscribed clients should not recieve message',() => {
        const message = new Message();
        const client = new Client();

        raceResultsService.send(message);
        expect(client.receive).not.toHaveBeenCalledWith(message);
    });

    test('removed subscriber does not receive message', () => {
        const client = new Client();
        const message = new Message();
            
        raceResultsService.addSubscriber(client);
        raceResultsService.removeSubscriber();
        raceResultsService.send(message);

        expect(client.receive).not.toHaveBeenCalledWith(message);
    });
});