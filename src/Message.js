export default class Message{
    constructor(category, messageText, messageDate){
        this.category = category;
        this.messageDate = messageDate;
        this.messageText = messageText;
    }

    getMessageText() {
        return this.messageText;
    }

    getMessageDate() {
        return this.messageDate;
    }

    getCategory() {
        return this.category;
    }
}