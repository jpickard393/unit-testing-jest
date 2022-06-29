import RaceResultsService from '../src/RaceResultsservice';
import Client from '../src/Client';
import Message from '../src/Message';

jest.mock("../src/Client");
jest.mock("../src/Message");

const raceResultsService = new RaceResultsService();

describe('RaceResultsService',() => {   
    test('addSubscriber',() =>{});

    test('removeSubscriber',() =>{});

    test('send',() =>{});
});
