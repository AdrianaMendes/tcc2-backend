import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Category } from '../category/category';

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Category, category => category.productArr)
	@JoinTable()
	category: Category;

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
