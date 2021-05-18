import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Category } from '../category/category';

@Entity()
export class ProductEntity {
	@PrimaryGeneratedColumn()
	id?: number;
	/* Temporariamente desabilitado
	@ManyToOne(() => Category, category => category.productArr)
	@JoinTable()
	category?: Category;
	*/
	@Column()
	name?: string;

	@Column()
	description?: string;

	@Column()
	image?: string;

	@Column()
	amount?: number;

	@Column({default: true})
	isActive?: boolean;

	@Column()
	value?: number;

	constructor(name: string, description: string, image: string) {
		this.name = name;
		this.description = description;
		this.image = image;
		this.amount = 0;
	}
}
