import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('product_entity')
export class ProductEntity {
	@PrimaryGeneratedColumn()
	id: number;
	/* Temporariamente desabilitado
	@ManyToOne(() => Category, category => category.productArr)
	@JoinTable()
	category: Category;
	*/
	@Column({type: 'varchar', length: 64})
	name: string;

	@Column({ nullable: true, type: 'varchar', length: 128 })
	description?: string;

	@Column({ nullable: true })
	image?: string;

	@Column()
	amount: number;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;

	@Column()
	value: number;
}
