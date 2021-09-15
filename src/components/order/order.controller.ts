import { UpdateResult } from 'typeorm';

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { GetUser } from '../../assets/decorator/get-user.decorator';
import { HasRoles } from '../../assets/decorator/has-roles.decorator';
import { EUserRole } from '../../assets/enum/user-role.enum';
import { JwtAuthGuard } from '../../assets/guard/jwt-auth.guard';
import { RolesGuard } from '../../assets/guard/roles.guard';
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

	@Get('findOrderUser/:id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findOrderUser(@Param('id') id: number): Promise<OrderEntity[]> {
		return await this.orderService.findOrderUser(id);
	}

	@Get('findOpenOrderUser/:id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findOpenOrderUser(@Param('id') id: number): Promise<OrderEntity> {
		return await this.orderService.findOpenOrderUser(id);
	}

	@Patch('update/')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiBody({ type: UpdateOrderEnumDto })
	async update(@Body() dto: UpdateOrderEnumDto): Promise<boolean> {
		return await this.orderService.update(dto);
	}

	@Patch('closeOrder/:id')
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	async closeOrder(@Param('id') id: number): Promise<boolean> {
		return await this.orderService.closeOrder(id);
	}

	@Delete('remove/:id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async remove(@Param('id') id: number): Promise<boolean> {
		return await this.orderService.remove(id);
	}
}
