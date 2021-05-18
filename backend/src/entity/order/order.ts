import { OrderStatus } from 'src/entity/enum/order-status';
import { PaymentType } from 'src/entity/enum/payment-type';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderProduct } from '../order-product/order-product';
import { User } from '../user/user';

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, user => user.orderArr)
	user: User;

	@OneToMany(() => OrderProduct, orderProductArr => orderProductArr.order)
	orderProductArr: OrderProduct[];

	@Column({ type: 'enum', enum: PaymentType })
	paymentType: PaymentType;

	@Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN, nullable: false })
	status: OrderStatus;

	@Column()
	totalValue: number;

	@CreateDateColumn()
	creationDate: Date;

	@UpdateDateColumn()
	updateDate: Date;
}
