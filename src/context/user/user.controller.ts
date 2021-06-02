import { DeleteResult, UpdateResult } from 'typeorm';

import {
	Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('Usuário')
@UseGuards(AuthGuard())
export class UserController {

	constructor(private readonly userService: UserService) { }

	@Post('create')
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário criado' })
	async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
		return await this.userService.create(dto);
	}

	@Get('findAll')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há usuário cadastrado' })
	@ApiBearerAuth()
	async findAll(): Promise<UserEntity[]> {
		return await this.userService.findAll();
	}

	@Get('findAllActive')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há usuário cadastrado' })
	@ApiOperation({ description: 'Endpoint utilizado para listar todos usuários ativos.' })
	@ApiBearerAuth()
	async findAllActive(): Promise<UserEntity[]> {
		return await this.userService.findAllActive();
	}

	@Get('findOne/:id')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	@ApiBearerAuth()
	async findOne(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.findOne(id);
	}

	@Get('findOneActive/:id')
	@ApiOperation({ description: 'Endpoint utilizado para consultar apenas usuários ativos.' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	@ApiBearerAuth()
	async findOneActive(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.findOneActive(id);
	}

	@Patch('update/:id')
	@ApiBody({ type: UpdateUserDto })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	@ApiBearerAuth()
	async update(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<UpdateResult> {
		return await this.userService.update(id, dto);
	}

	@Patch('toggleAvailability/:id')
	@ApiOperation({ description: 'Endpoint utilizado para efetuar exclusão lógica.' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	@ApiBearerAuth()
	async toggleAvailability(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.toggleAvailability(id);
	}

	@Delete('remove/:id')
	@ApiExcludeEndpoint()
	@ApiBearerAuth()
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.userService.remove(id);
	}
}
