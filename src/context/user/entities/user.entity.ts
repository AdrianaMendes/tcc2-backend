import { EUserRole } from 'src/shared/enum/user-role.enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@OneToOne(() => AddressEntity)
	@JoinColumn({ name: 'address_id' })
	address: AddressEntity;

	/*
	@OneToMany(() => Order, order => order.user)
	orderArr?: Order[];
	*/

	@Column({ name: 'full_name', type: 'varchar', length: 64 })
	fullName: string;

	@Column({ type: 'varchar', length: 64 })
	email: string;

	@Column({ type: 'varchar', length: 64 })
	password: string;

	@Column({ nullable: true })
	image?: string;

	@Column({ type: 'enum', enum: EUserRole, default: EUserRole.USER })
	role: EUserRole;

	@CreateDateColumn({ name: 'creation_date' })
	creationDate: Date;

	@UpdateDateColumn({ name: 'last_login_date', nullable: true })
	lastLoginDate?: Date;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;

	toggleAvailability(): void {
		this.isActive = !this.isActive;
	}
}
