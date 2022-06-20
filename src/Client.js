export default class Client {
   constructor(name, subscribedCategory){
      this.name = name;
      this.subscribedCategory = subscribedCategory;
   }
   receive (logger,message) {
      // only accept categories this client has subscribed to
      this.logIncomingMessage(logger,message);
      return message.category === this.subscribedCategory;
   }

   name(){
      return this.name;
   }

   subscribedCategory(){
      return this.subscribedCategory;
   }

   logIncomingMessage(logger,message){
      logger.logMessage(message);
   }
}