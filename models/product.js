const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    category: {
        type: String,
        enum: [
            'Fruit',
            'Vegetable',
            'Dairy'
        ]
    },
    price: Number,
    brand: {
        type: String,
        enum: [
            'Organic Farm',
            'Fruits Market',
            'Country Farm'
        ]
    },
    weight: Number,
    rating: Number, 
    images: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

// Campground Delete Middleware
ProductSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Product', ProductSchema);
