import { EOrderStatus } from 'src/shared/enum/order-status.enum';
import { EPaymentType } from 'src/shared/enum/payment-type.enum';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { OrderProductEntity } from '../../order-product/entities/order-product.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('order')
export class OrderEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserEntity, (user) => user.orderArr, { nullable: false })
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@OneToMany(() => OrderProductEntity, (orderProductArr) => orderProductArr.order)
	orderProductArr: OrderProductEntity[];

	@Column({ name: 'payment_type', type: 'enum', enum: EPaymentType })
	paymentType: EPaymentType;

	@Column({ type: 'enum', enum: EOrderStatus, default: EOrderStatus.OPEN })
	status: EOrderStatus;

	@Column({ name: 'total_value', type: 'decimal', precision: 6, scale: 2 })
	totalValue: number;

	@CreateDateColumn({ name: 'creation_date' })
	creationDate: Date;

	@UpdateDateColumn({ name: 'update_date' })
	updateDate: Date;
}