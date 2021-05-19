import { EUserRole } from 'src/enum/user-role';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Address } from '../address/address.entity';
import { Order } from '../order/order.entity';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Address, address => address.user)
	@JoinColumn()
	address: Address;

	@OneToMany(() => Order, order => order.user)
	orderArr?: Order[];

	@Column({ name: 'full_name' })
	fullName: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({nullable: true})
	image?: string;

	@Column({ name: 'user_role', type: 'enum', enum: EUserRole, default: EUserRole.USER })
	userRole: EUserRole;

	@CreateDateColumn({ name: 'creation_date' })
	creationDate: Date;

	@UpdateDateColumn({ name: 'last_login_date' })
	lastLoginDate: Date;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;
}
