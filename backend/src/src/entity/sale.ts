import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Sale {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	creationDate: Date;

	@Column()
	beginDate: Date;

	@Column()
	endDate: Date;

	@Column()
	percentageValue: number;
}
