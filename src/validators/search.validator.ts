import Joi from "joi";


const searchValidator = Joi.object({
    search: Joi.string().pattern(/^(?:[a-zA-Z]+|[0-9]+)$/).messages({
        'string.pattern.base':'You can use only letters or only numbers in the search bar.'
    })
})

export default searchValidator;
