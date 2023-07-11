class MessageQueue{
  constructor(){
    this.messages = [];
    this.listeners = [];
  }

  enqueMessage(message){
    this.messages.push(message);
    this.notifyListeners(message);
  }

  subscribe(listener){
    this.listeners.push(listener)
  }

  unsubscribe(name){
    this.listeners = this.listeners.filter(listener => listener.name != name);
  }

  notifyListeners(message){
    for(let listener of this.listeners){
      listener.update(message)
    }
  }
}

class Listner{
  constructor(name){
    this.name = name;
  }
  update(message){
    console.log(`${this.name} received a message - ${message}`)
  }
}

const queue = new MessageQueue();
queue.subscribe(new Listner("Listner A"))
queue.subscribe(new Listner("Listner B"))
queue.subscribe(new Listner("Listner C"))
queue.enqueMessage("Message 1")
queue.subscribe(new Listner("Listner D"))
queue.enqueMessage("Message 2")
queue.unsubscribe("Listner B")
queue.enqueMessage("Message 3")

