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

    test('Client subscribedCategory should be same as the message category', () => {
        expect(client.subscribedCategory).toBe(category);
    });


    // Review
    test('getSubscribedCategory should return the correct message category', () => {
        // client has been set up already
        expect(client.getSubscribedCategory()).toBe(category);
    });

    it('receive function SHOULD return TRUE when incoming message category, matches the clients subscribed category', () => {
        const receiveFunc = client.receive(message);
        expect(receiveFunc).toBe(true);
    });

    it('receive function SHOULD return FALSE when incoming message category, does not match Clients subscribed category', () => {
        const receiveFunc = client.receive('boat race');
        expect(receiveFunc).toBe(false);
    });
});