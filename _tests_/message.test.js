import Message from '../src/Message';

describe('Message',() => {
    // SUT = Message
    const category = 'category1';
    const msgText = 'This is a message';
    const msgDate = '10/07/2022';
    const message = new Message(category,msgText,msgDate);
    
    // just need to test that the message is ctreated with the correct values
    test('Message is ctreated with the correct values',()=>{
        expect(message.category).toBe(category);
        expect(message.messageText).toBe(msgText);
        expect(message.messageDate).toBe(msgDate);
    });

});