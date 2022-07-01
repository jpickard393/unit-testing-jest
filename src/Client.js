export default class Client {
   _logger;
   constructor(name, subscribedCategory, logger){
      this.name = name;
      this.subscribedCategory = subscribedCategory;
      this._logger = logger;
   }

   receive (message) {
      // only accept categories this client has subscribed to
      this.logIncomingMessage(message);
      return message.category === this.subscribedCategory;
   }

   name(){
      return this.name;
   }

   subscribedCategory(){
      return this.subscribedCategory;
   }

   logIncomingMessage(message){
      this._logger.logMessage(message);
   }
}