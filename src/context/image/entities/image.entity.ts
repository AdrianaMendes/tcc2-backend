import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('image')
export class ImageEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@Column()
	url: string;

	@Column()
	key: string;
}
