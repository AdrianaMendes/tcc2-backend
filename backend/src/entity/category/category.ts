import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../product/product';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Product, productArr => productArr.category)
	productArr: Product[];

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	image: string;
}
