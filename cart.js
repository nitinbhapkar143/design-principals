class Cart {
  constructor() {
    this.items = [];
    this.coupons = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  addCoupon(coupon) {
    this.coupons.push(coupon);
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let i = 0; i < this.items.length; i++) {
      let discountedPrice = this.items[i].price;
      
      for (const coupon of this.coupons) {
        discountedPrice = coupon.applyDiscount(discountedPrice, i);
      }

      totalPrice += discountedPrice;
    }

    return totalPrice;
  }
}

class Coupon {
  constructor(type, value, itemIndex) {
    this.type = type;
    this.value = value;
    this.itemIndex = itemIndex;
  }

  applyDiscount(price, itemIndex) {
    // Default behavior, no discount
    return price;
  }
}

class DiscountOnAllCoupon extends Coupon {
  applyDiscount(price) {
    const discount = (price * this.value) / 100;
    return price - discount;
  }
}

class DiscountOnNextCoupon extends Coupon {
  applyDiscount(price, itemIndex) {
    if (itemIndex === this.itemIndex) {
      const discount = (price * this.value) / 100;
      return price - discount;
    }
    return price;
  }
}

class FixedRateOnNthCoupon extends Coupon {
  applyDiscount(price, itemIndex) {
    if (itemIndex === this.itemIndex - 1) {
      return price - this.value;
    }
    return price;
  }
}

// Example usage
const cart = new Cart();

// Add items to the cart
cart.addItem({ name: 'Item 1', price: 10 });
cart.addItem({ name: 'Item 2', price: 20 });
cart.addItem({ name: 'Item 3', price: 30 });

// Add coupons to the cart
cart.addCoupon(new DiscountOnAllCoupon('discountOnAll', 10)); // 10% discount on all items
cart.addCoupon(new DiscountOnNextCoupon('discountOnNext', 20, 1)); // 20% discount on the next item
cart.addCoupon(new FixedRateOnNthCoupon('fixedRateOnNth', 5, 3)); // $5 fixed rate discount on the 3rd item

// Calculate the total price with applied coupons
const totalPrice = cart.getTotalPrice();
console.log('Total Price:', totalPrice);
