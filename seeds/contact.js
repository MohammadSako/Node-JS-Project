const mongoose = require('mongoose');
const Contact = require('../models/contact');

mongoose.connect('mongodb://localhost:27017/shoppingMarket')
    .then(() => {
        console.log("Mongo Connnection Ready..")
    })
    .catch(err => {
        console.log("Mongo Connnection has ERROR..")
        console.log(err)
    })

const seedContact = [
    { 
        building: 54, 
        street: "golden street", 
        city:"Amman", 
        state: "Amman" , 
        country: "Jordan", 
        zip: 11111,
        tel: 0777777777,
        location: "amman, jo",
    },
    { 
        building: 1, 
        street: "Isalm", 
        city:"Macca", 
        state: "n/a", 
        country: "KSA", 
        zip: 13341,
        tel: 0775554536,
        location: "macca, ksa",
    }
]
Contact.insertMany(seedContact)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e);
    })



// const seedProducts = async () => {
//     await Product.deleteMany({});
//     for (let i = 0; i < 20; i++) {
//         const random10 = Math.floor(Math.random() * 20);
//         const price = Math.floor(Math.random() * 30) + 10;
//         const rate = Math.floor(Math.random() * 6) + 1;
//         const cate = Math.floor(Math.random() * 4) + 1;
//         const camp = new Product({
//             author: '63282e7e1beb349edad11d8c',
//             name: `${products[random10].name}`,
//             description: 'Lorem ipsum dolor sit amet consectetur, adipisicin',
//             weight: `${products[random10].weight}`,
//             images: 'https://s1.1zoom.me/big0/503/Strawberry_Berry_Closeup_490344.jpg',
//             price,
//             brand: 'Country Farm',
//             rating: `${products[rate].rating}`,
//             category: `${products[cate].category}`,

//         })
//         await camp.save();
//     }
// }
// seedProducts().then(() => {
//         mongoose.connection.close()
// })
