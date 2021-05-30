import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	/*
	@OneToOne(() => User, user => user.address)
	user: User;
	*/

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

	@Column({ nullable: true })
	complement?: string;
}
