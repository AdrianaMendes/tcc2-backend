import { CategoryEntity } from 'src/context/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('product')
export class ProductEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@ManyToOne(() => CategoryEntity, category => category.productArr, { onDelete: 'CASCADE' })
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

	constructor(name: string, description: string, image: string, amount: number, value: number) {
		this.name = name;
		this.description = description;
		this.image = image;
		this.amount = amount;
		this.value = value;
		this.isActive = true;
	}
}
