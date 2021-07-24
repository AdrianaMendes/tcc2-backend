import { IUser } from './user.interface';

export interface IUserCredentials extends IUser {
	readonly accessToken: string;
}
