module.exports = {
  strictObject: (propertySchemas = {}) => ({
    type: 'object',
    properties: propertySchemas,
    required: Object.keys(propertySchemas),
    additionalProperties: false,
  }),
};
