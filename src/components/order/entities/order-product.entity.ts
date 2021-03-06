import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductEntity } from '../../product/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity('order_product')
export class OrderProductEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@ManyToOne(() => OrderEntity, order => order.orderProductArr, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'order_id' })
	order: OrderEntity;

	@ManyToOne(() => ProductEntity, { cascade: true })
	@JoinColumn({ name: 'product_id' })
	product: ProductEntity;

	@Column({ type: 'smallint' })
	amount: number;

	@Column({ name: 'original_product_value', type: 'decimal', precision: 6, scale: 2, default: 0 })
	originalProductValue: number;
}
