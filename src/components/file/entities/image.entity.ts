import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@Column({ type: 'varchar', length: 128 })
	url: string;

	@Column({ type: 'varchar', length: 128 })
	key: string;
}
