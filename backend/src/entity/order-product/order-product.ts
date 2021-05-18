import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Order } from '../order/order';
import { ProductEntity } from '../product/product.entity';

@Entity()
export class OrderProduct {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, order => order.orderProductArr)
	order: Order;

	@OneToOne(() => ProductEntity)
	product: ProductEntity;

	@Column()
	amount: number;

	@Column()
	originalValue: number;
}
