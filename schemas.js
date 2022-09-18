const Joi = require('joi');
module.exports.productSchema = Joi.object({
    product: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        images: Joi.string().required(),
        brand: Joi.string().required(),
        description: Joi.string().required(),
        weight: Joi.number().required(),
        category: Joi.string().required(),
        rating: Joi.number().required()            
    }).required()
});

module.exports.reviewsSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})