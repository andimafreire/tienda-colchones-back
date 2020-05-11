const Joi = require('@hapi/joi');

module.exports = {
    list: {
        query: Joi.object({
            type: Joi.string().required().valid('destacados', 'colchones', 'somieres').messages({
                'any.invalid': 'El tipo debe ser destacados, colchones o somieres.',
                'any.required': 'Este parametro es requerido'}),
            page: Joi.number().integer().min(1).messages({
                'number.min': 'Debe ser un valor positivo.',
                'number.integer': 'El valor debe ser un entero positivo.',
                'number.base': 'El valor debe ser un entero positivo.'}),
            pagesize: Joi.number().integer().min(1).messages({
                'number.min': 'Debe ser un valor positivo.',
                'number.integer': 'El valor debe ser un entero positivo.',
                'number.base': 'El valor debe ser un entero positivo.'}),
        })
    },
    get: {
        params: Joi.object({
            productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                'string.base': 'El id no es válido.',
                'string.pattern.base': 'El id no es válido.',
                'any.required': 'El id es requerido.'
              })
        })
    },
    edit: {
        params: Joi.object({
            productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                'string.base': 'El id no es válido.',
                'string.pattern.base': 'El id no es válido.',
                'any.required': 'El id es requerido.'
              })
        })
    },
    delete: {
        params: Joi.object({
            productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                'string.base': 'El id no es válido.',
                'string.pattern.base': 'El id no es válido.',
                'any.required': 'El id es requerido.'
              })
        })
    }
};
