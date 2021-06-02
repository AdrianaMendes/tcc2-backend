import { EOrderStatus } from 'src/shared/enum/order-status.enum';
import { EPaymentType } from 'src/shared/enum/payment-type.enum';
import {
	Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity('order')
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	/*
	@ManyToOne(() => User, user => user.orderArr)
	user: User;

	@OneToMany(() => OrderProductEntity, orderProductArr => orderProductArr.order)
	orderProductArr: OrderProductEntity[];
	*/
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
