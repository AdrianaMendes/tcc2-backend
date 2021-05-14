import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	fullName: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	image: string;

	@CreateDateColumn()
	creationDate: Date;

	@UpdateDateColumn()
	lastLoginDate: Date;

	@Column()
	isActive: boolean;
}
