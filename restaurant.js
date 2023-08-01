const Logger = require("./design-patterns/singletone/logger")
const logger = new Logger().getInstance();
class Item{
  constructor(name, price, quantity){
    this.name = name;
    this.price = price;
    this.quantity = quantity
  }
  getItemTotal(){
    return this.price * this.quantity;
  }
  prepare(){
    throw new Error("Method not implemented");
  }
}

class Sandwitch extends Item{
  constructor(quantity){
    super();
    this.price = 2.15;
    this.name = "Sandwitch";
    this.quantity = quantity;
  }
  prepare(){
    this.prepareBread()
    this.prepareStuffing()
    this.prepareGrill();
    logger.log(`Item Prepared`);
  }
  prepareBread(){
    logger.log(`Preparing bread`)
  }
  prepareStuffing(){
    logger.log(`Preparing stuffing`)
  }
  prepareGrill(){
    logger.log(`Preparing to grill`)
  }
}

class Customer{
  constructor(name, balance){
    this.name = name;
    this.balance = balance;
  }
  balance(){
    return this.balance;
  }
  payBill(amount){
    if(amount < this.balance){
      this.balance -= amount;
      logger.log(`Amount paid in full - ${amount}. Balance after paying ${this.balance}`);
    }else{
      logger.log("Not enough balance")
    }
  }
}

class Order{
  constructor(orderId, customer){
    this.orderId = orderId;
    this.customer = customer;
    this.items = []
  }
  addItem(item){
    logger.log(`Add item to order ${item.name}`)
    this.items.push(item);
  }
  removeItem(item){
    this.items.splice(this.items.indexOf(item),1);
  }
  prepareBill(){
    let totalOrderAmount = 0;
    for(let item of this.items){
      totalOrderAmount += item.getItemTotal();
    }
    logger.log(`Bill prepared for order ${this.orderId}`)
    return totalOrderAmount;
  }
}

class Robot{
  constructor(robotId){
    this.robotId = robotId;
    this.orders = []
  }

  takeOrder(order){
    logger.log(`Taking order for customer ${order.customer.name}`);
    this.orders.push(order)
  }

  prepare(){
    for(let order of this.orders){
      logger.log(`Sending to prepare order with OrderId ${order.orderId}`)
      for(let item of order.items){
        item.prepare();
      }
    }
  }
  prepareBill(orderId){
    logger.log(`Preparing order bill ${orderId}`)
    const order = this.orders.find(order => order.orderId == orderId)
    const bill = order.prepareBill();
    logger.log(`The bill for ${order.customer.name} is ${bill}`);
    return bill;
  }
}

const customerA = new Customer("Nitin", 1000)
const sandwitchA = new Sandwitch(3);
const sandwitchB = new Sandwitch(2);
const orderA = new Order(1, customerA);
orderA.addItem(sandwitchA);
orderA.addItem(sandwitchB);

const robotA = new Robot(1);
robotA.takeOrder(orderA);
robotA.prepare()
const totalA = robotA.prepareBill(1);
customerA.payBill(totalA)


const customerB = new Customer("Sonam", 10)
const sandwitchC = new Sandwitch(10);
const orderB = new Order(2, customerB);
orderB.addItem(sandwitchC)

const robotB = new Robot(2);
robotB.takeOrder(orderB);
robotB.prepare()
const totalB = robotB.prepareBill(2);
customerB.payBill(totalB)