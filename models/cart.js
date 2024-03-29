<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: String,
    price: Number,
    
});
module.exports = mongoose.model("Cart", cartSchema);
=======
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.reduceByOne = function(id) {
        this.items[id].qty--;    
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }    
    };

    this.decreaseByOne = function(id) {
        this.items[id].qty++;    
        this.items[id].price += this.items[id].item.price;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price;
        if(this.items[id].qty >= 10) {
            this.items[id].qty--;    
            this.items[id].price -= this.items[id].item.price;
            this.totalQty--;
            this.totalPrice -= this.items[id].item.price;
        }    
    };

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;  
        this.totalPrice -= this.items[id].price
        delete this.items[id];
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};

// https://www.youtube.com/watch?v=_pVKGCzbMwg&list=PL55RiY5tL51rajp7Xr_zk-fCFtzdlGKUp&index=13
>>>>>>> e55eb9d01a0454a7102e94a72c4c61104ac60945
