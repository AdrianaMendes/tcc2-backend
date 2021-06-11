import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
		@InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>
	) {}

	async create(dto: CreateUserDto): Promise<UserEntity> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(dto.password, salt);

		dto.password = hashedPassword;

		if ((await this.userRepository.find({ where: { email: dto.email } })).length !== 0) {
			throw new HttpException(`Usuário com email: ${dto.email} já está cadastrado`, HttpStatus.CONFLICT);
		}

		await this.addressRepository.save(dto.address);
		return await this.userRepository.save(dto);
	}

	async findAll(isActive: boolean): Promise<UserEntity[]> {
		const userArr = isActive
			? await this.userRepository.find({ relations: ['address'], where: { isActive: true } })
			: await this.userRepository.find({ relations: ['address'] });

		if (userArr.length === 0) {
			throw new HttpException('Não há usuário cadastrado', HttpStatus.NO_CONTENT);
		}

		return userArr;
	}

	async findOne(id: number, isActive: boolean): Promise<UserEntity> {
		const user = isActive
			? await this.userRepository.findOne(id, { relations: ['address'], where: { isActive: true } })
			: await this.userRepository.findOne(id, { relations: ['address'] });

		if (!user) {
			throw new HttpException(`Não há usuário com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return user;
	}

	async update(id: number, dto: UpdateUserDto): Promise<UpdateResult> {
		const result = await this.userRepository.update(id, dto);

		if (result.affected === 0) {
			throw new HttpException(`Não há usuário com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return result;
	}

	async toggleAvailability(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOne(id);

		if (!user) {
			throw new HttpException(`Não há usuário com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		user.toggleAvailability();

		return await this.userRepository.save(user);
	}

	async remove(id: number): Promise<DeleteResult> {
		return await this.userRepository.delete(id);
	}
}
