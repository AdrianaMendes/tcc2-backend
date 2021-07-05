import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class AddressEntity {
	@PrimaryGeneratedColumn({ type: 'smallint' })
	id: number;

	@Column()
	cep: string;

	@Column()
	state: string;

	@Column({ type: 'varchar', length: 64 })
	city: string;

	@Column({ type: 'varchar', length: 64 })
	district: string;

	@Column({ type: 'varchar', length: 64 })
	street: string;

	@Column({ type: 'smallint' })
	number: number;

	@Column({ type: 'varchar', length: 128, nullable: true })
	complement?: string;
}
