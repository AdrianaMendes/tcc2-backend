import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from './product';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Product, productArr => productArr.categoryArr)
	productArr: Product[];

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	image: string;
}
