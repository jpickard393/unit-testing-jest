import Message from '../src/Message';

describe('Message',() => {
    // SUT = Message
    // No need to mock anything
    
    test('Message shoule be ctreated with the correct values',()=>{
        const category = 'category1';
        const msgText = 'This is a message';
        const msgDate = '10/07/2022';
        const message = new Message(category,msgText,msgDate);
        
        expect(message.getCategory()).toBe(category);
        expect(message.getMessageText()).toBe(msgText);
        expect(message.getMessageDate()).toBe(msgDate);
    });
});