import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../user/user';

@Entity()
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User, user => user.address)
	user: User;

	@Column()
	cep: string;

	@Column()
	state: string;

	@Column()
	city: string;

	@Column()
	district: string;

	@Column()
	street: string;

	@Column()
	number: number;

	@Column()
	complement?: string;
}
