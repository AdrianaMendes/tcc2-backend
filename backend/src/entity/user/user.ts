import { UserRole } from 'src/entity/enum/user-role';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Address } from '../address/address';
import { Order } from '../order/order';

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

	@Column({ type: 'enum', enum: UserRole })
	userRole: UserRole;

	@CreateDateColumn()
	creationDate: Date;

	@UpdateDateColumn()
	lastLoginDate: Date;

	@Column({default: true})
	isActive: boolean;
}
