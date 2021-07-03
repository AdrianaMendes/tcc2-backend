import * as Joi from 'joi';

import { IEnvironmentVariables } from '../assets/interface/environment-variables.interface';

export const configValidationSchema = Joi.object<IEnvironmentVariables>({
	DB_HOST: Joi.string().default('localhost'),
	DB_PORT: Joi.number().default(5432),
	DB_USERNAME: Joi.string().default('postgres'),
	DB_PASSWORD: Joi.string().default('1234'),
	DB_NAME: Joi.string().default('postgres'),
	DB_SYNCHRONIZE: Joi.bool().default(true),
	DATABASE_URL: Joi.string().allow('').default(''),
	DB_SSL_REJECT_UNAUTHORIZED: Joi.bool().allow('').default(''),
	JWT_SECRET: Joi.string().default('SEGREDO'),
	EXPIRATION_TIME_SESSION: Joi.number().default(3600),
	PORT: Joi.number().default(3000),
	SWAGGER_USERNAME: Joi.string().default('admin'),
	SWAGGER_PASSWORD: Joi.string().default('admin'),
	NPM_CONFIG_PRODUCTION: Joi.bool().default(false),
	AWS_REGION: Joi.string().required(),
	AWS_ACCESS_KEY_ID: Joi.string().required(),
	AWS_SECRET_ACCESS_KEY: Joi.string().required(),
	AWS_PUBLIC_BUCKET_NAME: Joi.string().required()
});
