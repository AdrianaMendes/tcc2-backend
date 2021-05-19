import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Order } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('order_product')
export class OrderProduct {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, order => order.orderProductArr)
	order: Order;

	@OneToOne(() => ProductEntity)
	product: ProductEntity;

	@Column()
	amount: number;

	@Column({ name: 'original_value' })
	originalValue: number;
}
