module.exports = {
  BOOLEAN: {
    type: 'boolean',
  },
  REALISTIC_POSITIVE_INTEGER: {
    type: 'integer',
    minimum: 0,
    maximum: 20, // testing purposes only
  },
  strictObject: (propertySchemas = {}) => ({
    type: 'object',
    properties: propertySchemas,
    required: Object.keys(propertySchemas),
    additionalProperties: false,
  }),
  strictTuple: (itemSchemas = []) => ({
    type: 'array',
    items: itemSchemas,
    minItems: itemSchemas.length,
    additionalItems: false,
  }),
};
