import { EOrderStatus } from 'src/shared/enum/order-status';
import { EPaymentType } from 'src/shared/enum/payment-type';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderProduct } from '../order-product/order-product.entity';
import { User } from '../user/user.entity';

@Entity('order')
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, user => user.orderArr)
	user: User;

	@OneToMany(() => OrderProduct, orderProductArr => orderProductArr.order)
	orderProductArr: OrderProduct[];

	@Column({ name: 'payment_type', type: 'enum', enum: EPaymentType })
	paymentType: EPaymentType;

	@Column({ type: 'enum', enum: EOrderStatus, default: EOrderStatus.OPEN })
	status: EOrderStatus;

	@Column({ name: 'total_value' })
	totalValue: number;

	@CreateDateColumn({ name: 'creation_date' })
	creationDate: Date;

	@UpdateDateColumn({ name: 'update_date' })
	updateDate: Date;
}
