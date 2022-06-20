export default class Message{
    constructor(category, messageText, messageDate){
        this.category = category;
        this.messageDate = messageDate;
        this.messageText = messageText;
    }

    messageText() {
        return this.messageText;
    }

    messageDate() {
        return this.messageDate;
    }

    category() {
        return this.category;
    }
}