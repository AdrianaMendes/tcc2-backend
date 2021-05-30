import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICommonControllerSoftDelete } from '../../shared/interface/common-controller-soft-delete.interface';
import { UserEntity } from './entities/user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('user')
@ApiTags('Usuário')
@UsePipes(new ValidationPipe())
export class UserController implements ICommonControllerSoftDelete<UserEntity, CreateUserDto, UpdateUserDto> {

	constructor(private readonly userService: UserService) { }

	@Post('create')
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário criado' })
	async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
		return await this.userService.create(dto);
	}

	@Get('findAll')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há usuário cadastrado' })
	async findAll(): Promise<UserEntity[]> {
		return await this.userService.findAll();
	}

	@Get('findAllActive')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há usuário cadastrado' })
	@ApiOperation({ description: 'Endpoint utilizado para listar todos usuários ativos.' })
	async findAllActive(): Promise<UserEntity[]> {
		return await this.userService.findAllActive();
	}

	@Get('findOne/:id')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async findOne(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.findOne(id);
	}

	@Get('findOneActive/:id')
	@ApiOperation({ description: 'Endpoint utilizado para consultar apenas usuários ativos.' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async findOneActive(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.findOneActive(id);
	}

	@Patch('update/:id')
	@ApiBody({ type: UpdateUserDto })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async update(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<UpdateResult> {
		return await this.userService.update(id, dto);
	}

	@Patch('toggleAvailability/:id')
	@ApiOperation({ description: 'Endpoint utilizado para efetuar exclusão lógica.' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async toggleAvailability(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.toggleAvailability(id);
	}

	@Delete('remove/:id')
	@ApiExcludeEndpoint()
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.userService.remove(id);
	}
}
