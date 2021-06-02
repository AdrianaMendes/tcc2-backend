import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductEntity } from '../../product/entities/product.entity';

@Entity('order_product')
export class OrderProductEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	/* TODO Habilitar o relacionamento do Order
	@ManyToOne(() => Order, order => order.orderProductArr)
	order: Order;
	*/

	@ManyToOne(() => ProductEntity, { cascade: true })
	@JoinColumn({ name: 'product_id' })
	product: ProductEntity;

	@Column({ type: 'smallint' })
	amount: number;

	@Column({ name: 'original_product_value', type: 'decimal', precision: 6, scale: 2, default: 0 })
	originalProductValue: number;

	totalValue(): number {
		return this.amount * this.originalProductValue;
	}

	constructor(amount: number) {
		this.amount = amount;
	}
}
