import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';
describe('RaceResultsService',() => {
    test('Subscribed Client Should Recieve Message',() => {
        const raceResultsService = new RaceResultsService();
        const clientMock = jest.mock(Client);
        const messageMock = jest.mock(Message);

        raceResultsService.addSubscriber(clientMock);
        raceResultsService.send(messageMock);

        
    });
});