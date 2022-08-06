import Client from '../src/Client';
import Message from '../src/Message';
import Logger from '../src/Logger';

describe ('Client',() => {
    // SUT is Client so we need the real class

    jest.mock("../src/Message");
    jest.mock("../src/Logger");
    let client;
    let message; 
    const logger = new Logger();
    const category = 'Horse Race';
    const clientName ='Client1Name';
    
    beforeEach(() => {
        client = new Client(clientName,category, logger);
        message = new Message(category);
    });

    test('it SHOULD update the client name',()=>{
        expect(client.name).toBe(clientName);
    })

    test('it should call the logger when a message is received',() => {
        const logMessageMock =  jest.spyOn(logger, "logMessage");
        client.receive(message);
        expect(logMessageMock).toHaveBeenCalledWith(message);
    });

    // Review

    // This was wrong it was using the reaceResultservice
    // now I am setting up the client in the before each and just tesing the subscribedCategory is set correctly
    test('Client subscribedCategory should be same as the message category', () => {
        expect(client.subscribedCategory).toBe(category);
    });


    // Review
    test('getSubscribedCategory should return the correct message category', () => {
        // client has been set up already
        expect(client.getSubscribedCategory()).toBe(category);
    });

    // Review

    // This was wrong.  It was testing a mock function of client.  
    // Need to test Client class (SUT)
    // when testing one class never mock only dependancies
    // should not need to use any other class that what we are testing.

    // I think this now does it correctly - it tests the client.receive(message) funcs return value
    it('receive function SHOULD return TRUE when incoming message category, matches the clients subscribed category', () => {
        const receiveFunc = client.receive(message);
        expect(receiveFunc).toBe(true);
    });

    it('receive function SHOULD return FALSE when incoming message category, does not match Clients subscribed category', () => {
        const receiveFunc = client.receive('boat race');
        expect(receiveFunc).toBe(false);
    });


    // * Review
    // here I was using race results service and  mock of client
    // I think this test is actually now catered for by the above two

    // test('Client should NOT receive a message of a category type it is NOT subscribed to', () => {    
    //     const unsubscribedCategory = 'Snail Racing';
    //     const receiveMock =  jest.spyOn(client, "receive");
    //     const message = new Message(unsubscribedCategory);

    //     raceResultsService.addSubscriber(client);
    //     raceResultsService.send(message);
        
    //     expect(receiveMock).not.toHaveReturnedWith(true);
    // });


    // *Review - this is now delat with by the test on line 63.

    // test('removed subscriber does not receive message', () => {
    //     const receiveMock =  jest.spyOn(client, "receive");
            
    //     raceResultsService.addSubscriber(client);
    //     raceResultsService.removeSubscriber();
    //     raceResultsService.send(message);

    //     expect(receiveMock).not.toHaveBeenCalledWith(message);
    // });
});