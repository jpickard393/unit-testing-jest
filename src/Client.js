export default class Client {
   constructor(name, subscribedCategory){
      this.name = name;
      this.subscribedCategory = subscribedCategory;
   }
   receive (message) {
      return message.category === this.subscribedCategory;
   }

   name(){
      return this.name;
   }

   subscribedCategory(){
      return this.subscribedCategory;
   }
   
}