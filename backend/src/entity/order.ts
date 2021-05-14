import { OrderStatus } from 'src/enum/OrderStatus';
import { PaymentType } from 'src/enum/PaymentType';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	paymentType: PaymentType;

	@Column()
	status: OrderStatus;

	@Column()
	totalValue: number;

	@CreateDateColumn()
	creationDate: Date;

	@UpdateDateColumn()
	updateDate: Date;
}
