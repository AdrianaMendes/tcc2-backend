import { OrderStatus } from 'src/enum/orderStatus';
import { PaymentType } from 'src/enum/paymentType';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderProduct } from './orderProduct';
import { User } from './user';

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
