import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category';

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Category, categoryArr => categoryArr.productArr)
	@JoinTable()
	categoryArr: Category[];

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	image: string;

	@Column()
	amount: number;

	@Column({default: true})
	isActive: boolean;

	@Column()
	value: number;
}
