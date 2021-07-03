import { EOrderStatus } from '../enum/order-status.enum';
import { EPaymentType } from '../enum/payment-type.enum';
import { IOrderProduct } from './order-product.interface';
import { IUser } from './user.interface';

export interface IOrder {
	id?: number;
	user?: IUser;
	orderProductArr?: IOrderProduct[];
	paymentType?: EPaymentType;
	status?: EOrderStatus;
	totalValue?: number;
	creationDate?: Date;
	updateDate?: Date;
}
