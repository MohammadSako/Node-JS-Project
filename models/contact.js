const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const ContactSchema = new Schema({
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    building: Number,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
    tel: Number,
    location: String,
    id: Number
}, opts);

ContactSchema.virtual('properties.popUpMarkup').get(function() {
    // return `<strong><a href="/contact/${this._id}" >${this.city}</a></strong>
    return `<strong>${this.city}</strong>
    <p>${this.street} <i>Street.</i></p>`
});

module.exports = mongoose.model('Contact', ContactSchema);
