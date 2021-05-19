import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('sale')
export class Sale {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ name: 'creation_date' })
	creationDate: Date;

	@Column({ name: 'begin_date' })
	beginDate: Date;

	@Column({ name: 'end_date' })
	endDate: Date;

	@Column({name: 'percentage_value'})
	percentageValue: number;
}
