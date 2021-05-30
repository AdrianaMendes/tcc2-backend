import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { ICommonServiceSoftDelete } from '../../shared/interface/common-service-soft-delete.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService implements ICommonServiceSoftDelete<UserEntity, CreateUserDto, UpdateUserDto> {

	constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, @InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>) { }

	async create(dto: CreateUserDto): Promise<UserEntity> {
		await this.addressRepository.save(dto.address);
		return await this.userRepository.save(dto);
	}

	async findAll(): Promise<UserEntity[]> {
		const userArr = await this.userRepository.find({ relations: ['address'] });

		if (userArr.length === 0) {
			throw new HttpException('Não há usuário cadastrado', HttpStatus.NO_CONTENT);
		}

		return userArr;
	}

	async findAllActive(): Promise<UserEntity[]> {
		const userArr = await this.userRepository.find({ relations: ['address'], where: { isActive: true } });

		if (userArr.length === 0) {
			throw new HttpException('Não há usuário cadastrado', HttpStatus.NO_CONTENT);
		}

		return userArr;
	}

	async findOne(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOne(id, { relations: ['address'] });

		if (!user) {
			throw new HttpException(`Não há usuário com id: ${id}`, HttpStatus.NOT_FOUND);
		}

		return user;
	}

	async findOneActive(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOne(id, { relations: ['address'], where: { isActive: true } });

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
