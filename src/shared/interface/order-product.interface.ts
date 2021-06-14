import { IOrder } from './order.interface';
import { IProduct } from './product.interface';

export interface IOrderProduct {
	id: number;
	order: IOrder;
	product: IProduct;
	amount: number;
	originalProductValue: number;
}
