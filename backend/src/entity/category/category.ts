import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;
	/* Temporariamente desabilitado
	@OneToMany(() => ProductEntity, productArr => productArr.category)
	productArr: ProductEntity[];
	*/
	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	image: string;
}
