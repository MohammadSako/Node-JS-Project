const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi = BaseJoi.extend(extension)

module.exports.productSchema = Joi.object({
    product: Joi.object({
        name: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        brand: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        weight: Joi.number().required(),
        category: Joi.string().required().escapeHTML(),
        rating: Joi.number().required()            
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewsSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML(),
    }).required()
})

module.exports.contactSchema = Joi.object({
    contact: Joi.object({
        building: Joi.number().required(),
        street: Joi.string().required().escapeHTML(),
        city: Joi.string().required().escapeHTML(),
        state: Joi.string().required().escapeHTML(),
        country: Joi.string().required().escapeHTML(),
        zip: Joi.number().required().min(1).max(5),
        tel: Joi.number().required().min(10).max(12),
    }).required()
})
