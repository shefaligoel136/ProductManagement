import * as Joi from 'joi';

export const ValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test').default('development'),
  PORT: Joi.number().default(3000),
  SWAGGER: Joi.boolean(),
  MONGO_URI: Joi.string()
    .uri()
    .default('mongodb://localhost:27017/?replicaSet=rs0'),
});
