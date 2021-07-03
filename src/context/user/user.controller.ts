import { DeleteResult, UpdateResult } from 'typeorm';

import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../../auth/decorator/has-roles.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { EUserRole } from '../../assets/enum/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('Usuário')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('create')
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário criado' })
	@ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email já está sendo usado por outro usuário' })
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Erro na criação do usuário, formulário com dados inválidos'
	})
	async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
		return await this.userService.create(dto);
	}

	@Get('findAll')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há usuário cadastrado' })
	async findAll(): Promise<UserEntity[]> {
		return await this.userService.findAll(false);
	}

	@Get('findAllActive')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há usuário cadastrado' })
	@ApiOperation({ description: 'Endpoint utilizado para listar todos usuários ativos.' })
	async findAllActive(): Promise<UserEntity[]> {
		return await this.userService.findAll(true);
	}

	@Get('findOne/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async findOne(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.findOne(id, false);
	}

	@Get('findOneActive/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiOperation({ description: 'Endpoint utilizado para consultar apenas usuários ativos.' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async findOneActive(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.findOne(id, true);
	}

	@Patch('update/:id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiBody({ type: UpdateUserDto })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async update(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<UpdateResult> {
		return await this.userService.update(id, dto);
	}

	@Patch('toggleAvailability/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiOperation({ description: 'Endpoint utilizado para efetuar exclusão lógica' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado' })
	async toggleAvailability(@Param('id') id: number): Promise<UserEntity> {
		return await this.userService.toggleAvailability(id);
	}

	@Delete('remove/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiExcludeEndpoint()
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.userService.remove(id);
	}
}
