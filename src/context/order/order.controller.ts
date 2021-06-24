import { UpdateResult } from 'typeorm';

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { GetUser } from '../../auth/decorator/get-user.decorator';
import { HasRoles } from '../../auth/decorator/has-roles.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { EUserRole } from '../../shared/enum/user-role.enum';
import { UserEntity } from '../user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderEnumDto } from './dto/update-order-enum.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Pedido')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('/openOrder')
	@ApiBody({ type: CreateOrderDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async create(@Body() dto: CreateOrderDto, @GetUser() user: UserEntity): Promise<UpdateResult> {
		return await this.orderService.openOrder(dto, user);
	}

	@Get('findAll')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findAll(): Promise<OrderEntity[]> {
		return await this.orderService.findAll();
	}

	@Get('findOne/:id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findOne(@Param('id') id: number): Promise<OrderEntity> {
		return await this.orderService.findOne(id);
	}

	@Patch('update/')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiBody({ type: UpdateOrderEnumDto })
	async update(@Body() dto: UpdateOrderEnumDto): Promise<boolean> {
		return await this.orderService.update(dto);
	}

	@Delete('remove/:id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async remove(@Param('id') id: number): Promise<boolean> {
		return await this.orderService.remove(id);
	}
}
