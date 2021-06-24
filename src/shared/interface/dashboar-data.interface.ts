import { IPaymentType } from './payment-type.interface';
import { IUser } from './user.interface';

export interface IDashboardData {
	registredProducts: number;
	movimentedValue: number;
	closedOrder: number;
	paymentType: IPaymentType;
	lastUsers: IUser[];
}
