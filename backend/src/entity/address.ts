import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

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
	complement: string;
}
