const Logger = require("./design-patterns/singletone/logger")
const logger = new Logger().getInstance();
class Node{
  constructor(prev = null, next = null, key = null, value = null){
    this.prev = prev;
    this.next = next;
    this.key = key;
    this.value = value;
  }
}

class Cache{
  constructor(capacity){
    this.cache = new Map();
    this.capacity = capacity;
    this.head = new Node();
    this.tail = new Node(this.head, null, null, null);
    this.head.next = this.tail;
  }

  get(key){
    if(this.cache.has(key)){
      const node = this.cache.get(key);
      this.moveToHead(node);
      return node.value;
    }
    return -1;
  }

  set(key, value){
    if(this.cache.has(key)){
      const node = this.cache.get(key);
      node.value = value;
      this.moveToHead(node);
      this.cache.set(key, node);
    }else{
      if(this.capacity > this.cache.size){
        const node = new Node(null, null, key, value)
        this.addToHead(node);
        this.cache.set(key, node);
      }else{
        this.removeTail();
        const node = new Node(null, null, key, value)
        this.addToHead(node);
        this.cache.set(key, node);
      }

    }
  }
  removeTail(){
    this.cache.delete(this.tail.prev.key)
    this.removeNode(this.tail.prev);
  }

  moveToHead(node){
    this.removeNode(node);
    this.addToHead(node);
  }
  removeNode(node){
    const prevNode = node.prev;
    const nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  addToHead(node){
    const headNode = this.head.next;
    headNode.prev = node;
    node.next = headNode;
    node.prev = this.head;
    this.head.next = node;

  }
  printCache(){
    let node = this.head;
    while(node != null){
      logger.log({value :node.value, key : node.key});
      node = node.next;
    }
  }
}

const cache = new Cache(5);
cache.set("key1", "value1");
cache.set("key2", "value2");
cache.set("key3", "value3");
cache.set("key4", "value4");
cache.set("key5", "value5");
logger.log(cache.get("key2"));

cache.set("key6", "value6");
logger.log(cache.get("key1"));
logger.log(cache.get("key5"));

// logger.log(cache.get("key1"));
cache.printCache();
