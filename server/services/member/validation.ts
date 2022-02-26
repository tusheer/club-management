import Joi from 'joi';

const schema = Joi.object().keys({
    _id: Joi.string().optional(),
    name: Joi.string().min(3).max(30).required(),
    sku: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(30),
    cost: Joi.number().required(),
    price: Joi.number().required(),
    size: Joi.number().min(1).max(10).required(),
    manufacturingDate: Joi.date().optional(),
    expiryDate: Joi.date().optional(),
});

const validate = (data) => {
    const result = schema.validate(data);
    return result;
};

export default validate;
