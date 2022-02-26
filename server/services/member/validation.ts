import Joi from 'joi';

const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    number : Joi.string().required(),
    avatar: Joi.object()
        .keys({
            url: Joi.string().required(),
        })
        .optional(),
    membershipType: Joi.string().valid('VIP', 'CHILDREN', 'WOMEN', 'PLAYER', 'FOREIGNER', 'NORMAL').required(),
    occupation: Joi.string().required(),
});

const validate = (data) => {
    const result = schema.validate(data);
    return result;
};

export default validate;
