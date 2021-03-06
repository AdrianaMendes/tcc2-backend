import { CategoryEntity } from 'src/components/category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FileEntity } from '../../file/entities/image.entity';

@Entity('product')
export class ProductEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@ManyToOne(() => CategoryEntity, category => category.productArr, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity;

	@Column({ type: 'varchar', length: 64 })
	name: string;

	@Column({ nullable: true, type: 'varchar', length: 128 })
	description?: string;

	@JoinColumn({ name: 'image_id' })
	@OneToOne(() => FileEntity, { nullable: true })
	image?: FileEntity;

	@Column({ type: 'smallint' })
	amount: number;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;

	@Column({ type: 'decimal', precision: 6, scale: 2 })
	value: number;

	toggleAvailability(): void {
		this.isActive = !this.isActive;
	}
}
