import Joi from "joi";


const searchValidator = Joi.object({
    search: Joi.string()
})

export default searchValidator;