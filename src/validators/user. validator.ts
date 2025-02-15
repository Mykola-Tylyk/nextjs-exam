import Joi from "joi";


const userValidator = Joi.object({
    username: Joi.string().pattern(/^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{1,14}[a-zA-Z0-9]$/).required().messages({
        'string.pattern.base':'Username must be between 3 and 16 characters long.'
    }),
    password: Joi.string().min(3).max(16).required().messages({
        'string.min':'password can be at least 3 chars',
        'string.max':'password cannot be gt 16 chars',
    })
});

export default userValidator;