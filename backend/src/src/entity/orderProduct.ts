import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderProduct {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, order => order.orderProductArr)
	order: Order;

	@OneToOne(() => Product)
	product: Product;

	@Column()
	amount: number;

	@Column()
	originalValue: number;
}
