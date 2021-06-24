import { EUserRole } from '../enum/user-role.enum';
import { IAddress } from './address.interface';
import { IOrder } from './order.interface';

export interface IUser {
	id: number;
	address?: IAddress;
	orderArr?: IOrder[];
	fullName?: string;
	email?: string;
	password?: string;
	image?: string;
	role?: EUserRole;
	creationDate?: Date;
	lastLoginDate?: Date;
	isActive?: boolean;
}
