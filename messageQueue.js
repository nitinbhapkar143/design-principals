class MessageQueue{
  constructor(){
    this.messages = [];
    this.listeners = {};
  }

  enqueMessage(topic, message){
    this.messages.push(message);
    this.notifyListeners(topic, message);
  }

  subscribe(topic,listener){
    this.listeners[topic] = this.listeners[topic] ? this.listeners[topic] : [];
    this.listeners[topic].push(listener)
  }

  unsubscribe(topic, name){
    this.listeners[topic] = this.listeners[topic].filter(listener => listener.name != name);
  }

  notifyListeners(topic, message){
    for(let listener of this.listeners[topic]){
      listener.update(topic, message)
    }
  }
}

class Listner{
  constructor(name){
    this.name = name;
  }
  update(topic, message){
    console.log(`${this.name} received a message - ${message} on ${topic}`)
  }
}

const queue = new MessageQueue();
queue.subscribe("topic1", new Listner("Listner A"))
queue.subscribe("topic1",new Listner("Listner B"))
queue.subscribe("topic2",new Listner("Listner C"))
queue.enqueMessage("topic1","Message 1")
queue.subscribe("topic1", new Listner("Listner D"))
queue.enqueMessage("topic1", "Message 2")
queue.enqueMessage("topic2", "Message 3")
queue.unsubscribe("topic1", "Listner B")
queue.enqueMessage("topic1", "Message 4")

