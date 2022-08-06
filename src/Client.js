export default class Client {
   _logger;
   constructor(name, subscribedCategory, logger){
      this.name = name;
      this.subscribedCategory = subscribedCategory;
      this._logger = logger;
   }

   // only accept categories this client has subscribed to
   receive (message) {
      this.logIncomingMessage(message);
      return message.category === this.subscribedCategory;
   }

   getName(){
      return this.name;
   }

   getSubscribedCategory(){
      return this.subscribedCategory;
   }

   logIncomingMessage(message){
      this._logger.logMessage(message);
   }
}