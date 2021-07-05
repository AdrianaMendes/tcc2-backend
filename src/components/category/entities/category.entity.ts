import { ProductEntity } from 'src/components/product/entities/product.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FileEntity } from '../../file/entities/image.entity';

@Entity('category')
export class CategoryEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@OneToMany(() => ProductEntity, productArr => productArr.category, { cascade: true })
	productArr: ProductEntity[];

	@Column({ type: 'varchar', length: 64 })
	name: string;

	@Column({ type: 'varchar', length: 128, nullable: true })
	description?: string;

	@JoinColumn({ name: 'image_id' })
	@OneToOne(() => FileEntity, { nullable: true })
	image?: FileEntity;
}
