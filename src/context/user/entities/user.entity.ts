import { EUserRole } from 'src/assets/enum/user-role.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OrderEntity } from '../../order/entities/order.entity';
import { AddressEntity } from './address.entity';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@OneToOne(() => AddressEntity)
	@JoinColumn({ name: 'address_id' })
	address: AddressEntity;

	@OneToMany(() => OrderEntity, order => order.user, { nullable: true })
	orderArr?: OrderEntity[];

	@Column({ name: 'full_name', type: 'varchar', length: 64 })
	fullName: string;

	@Column({ type: 'varchar', length: 64, unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	image?: string;

	@Column({ type: 'enum', enum: EUserRole, default: EUserRole.USER })
	role: EUserRole;

	@CreateDateColumn({ name: 'creation_date' })
	creationDate: Date;

	@Column({ name: 'last_login_date', type: 'timestamptz', nullable: true })
	lastLoginDate?: Date;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;

	toggleAvailability(): void {
		this.isActive = !this.isActive;
	}
}
