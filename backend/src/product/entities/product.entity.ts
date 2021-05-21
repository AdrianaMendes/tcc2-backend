import { CategoryEntity } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('product_entity')
export class ProductEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@ManyToOne(() => CategoryEntity, category => category.productArr, { eager: true })
	category: CategoryEntity;

	@Column({ type: 'varchar', length: 64 })
	name: string;

	@Column({ nullable: true, type: 'varchar', length: 128 })
	description?: string;

	@Column({ nullable: true })
	image?: string;

	@Column({ type: 'smallint' })
	amount: number;

	@Column({ name: 'is_active', default: true })
	isActive: boolean;

	@Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
	value: number;

	toggleAvailability(): void {
		this.isActive = !this.isActive;
	}
}
