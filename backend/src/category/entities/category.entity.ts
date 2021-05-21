import { ProductEntity } from 'src/product/entities/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('category')
export class CategoryEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@OneToMany(() => ProductEntity, productArr => productArr.category)
	productArr: ProductEntity[];

	@Column({ type: 'varchar', length: 64 })
	name: string;

	@Column({ type: 'varchar', length: 128, nullable: true })
	description?: string;

	@Column({ nullable: true })
	image?: string;
}
