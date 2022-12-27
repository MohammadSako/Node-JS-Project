const mongoose = require('mongoose');
const Product = require('../models/product');
const products = require('./products');

mongoose.connect('mongodb://localhost:27017/shoppingMarket')
    .then(() => {
        console.log("Mongo Connnection Ready..")
    })
    .catch(err => {
        console.log("Mongo Connnection has ERROR..")
        console.log(err)
    })

const seedProducts = async () => {
    await Product.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random10 = Math.floor(Math.random() * 20);
        const price = Math.floor(Math.random() * 30) + 10;
        const rate = Math.floor(Math.random() * 6) + 1;
        const cate = Math.floor(Math.random() * 4) + 1;
        const camp = new Product({
            author: '63282e7e1beb349edad11d8c',
            name: `${products[random10].name}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicin',
            weight: `${products[random10].weight}`,
            // images: 'https://s1.1zoom.me/big0/503/Strawberry_Berry_Closeup_490344.jpg',
            images: [
                {
                    url: 'https://res.cloudinary.com/dai7hljsg/image/upload/v1663857186/market/ppfzk4ocnwvziwldgl1q.jpg',
                    filename: 'market/ppfzk4ocnwvziwldgl1q',
                }
            ],
            price,
            geometry: { "type" : "Point", "coordinates" : [ 35.93333, 31.95 ] },
            brand: 'Country Farm',
            rating: `${products[rate].rating}`,
            category: `${products[cate].category}`,

        })
        await camp.save();
    }
}
seedProducts().then(() => {
        mongoose.connection.close()
})

// const seedProducts = [
//     { 
//         name: "Apple", 
//         description: "Fresh from our Farms", 
//         category:"Fruit", 
//         price: 1 , 
//         rating: 3, 
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 1000,
//         brand: "Organic Farm",
//     },
//     { 
//         name: "Pineapple", 
//         description: "Fresh from our Farms", 
//         category:"Fruit", 
//         price: 1 , 
//         rating: 3,
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 1000,
//         brand: "Fruits Market",
//     },
//     { 
//         name: "strawberry", 
//         description: "Fresh from our Farms",
//         category:"Fruit", 
//         price: 1 , 
//         rating: 2,
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 1000,
//         brand: "Organic Farm",
//     },
//     { 
//         name: "Onion", 
//         description: "Fresh from our Farms",
//         category:"Vegetable", 
//         price: 1 , 
//         rating: 5,
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 1000,
//         brand: "Country Farm",
//     },
//     { 
//         name: "Poteto", 
//         description: "Fresh from our Farms",
//         category:"Vegetable", 
//         price: 1 , 
//         rating: 3,
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 1000,
//         brand: "Organic Farm",
//     },
//     { 
//         name: "grape", 
//         description: "Fresh from our Farms",
//         category:"Fruit", 
//         price: 1 , 
//         rating: 5,
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 500,
//         brand: "Fruits Market",
//     },
//     { 
//         name: "Green peas", 
//         description: "Fresh from our Farms",
//         category:"Vegetable", 
//         price: 1 , 
//         rating: 3,
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 1000,
//         brand: "Organic Farm",
//     },
//     { 
//         name: "Carrots", 
//         description: "Fresh from our Farms",
//         category:"Vegetable", 
//         price: 1 , 
//         rating: 3,
//         description: "Product quality is important because it affects the success of the company and helps establish its reputation in customer markets.",
//         weight: 1000,
//         brand: "Country Farm",
//     },
// ]
// Product.insertMany(seedProducts)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e);
//     })

