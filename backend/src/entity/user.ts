import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Address } from './address';
import { Order } from './order';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Address, address => address.user)
	@JoinColumn()
	address: Address;

	@OneToMany(() => Order, order => order.user)
	orderArr?: Order[];

	@Column()
	fullName: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	image: string;

	@CreateDateColumn()
	creationDate: Date;

	@UpdateDateColumn()
	lastLoginDate: Date;

	@Column({default: true})
	isActive: boolean;
}
