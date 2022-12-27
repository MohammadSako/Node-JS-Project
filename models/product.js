const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({//https://cloudinary.com/documentation/image_transformations
    url: String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_100');
})

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
    images: [ImageSchema],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    qty: Number,
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
