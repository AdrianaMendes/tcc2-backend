import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	amount: number;

	@Column()
	originalValue: number;
}
