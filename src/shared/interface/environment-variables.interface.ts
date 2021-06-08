export interface IEnvironmentVariables {
	DB_HOST: string;
	DB_PORT: number;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	DB_NAME: string;
	DB_SYNCHRONIZE: boolean;
	DATABASE_URL?: string;
	DB_SSL_REJECT_UNAUTHORIZED?: boolean;
	JWT_SECRET: string;
	EXPIRATION_TIME_SESSION: number;
	PORT: number;
	SWAGGER_USERNAME: string;
	SWAGGER_PASSWORD: string;
	NPM_CONFIG_PRODUCTION?: boolean;
}
