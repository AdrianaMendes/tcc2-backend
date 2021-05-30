import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ICommonController } from '../../shared/interface/common-controller.interface';
import { OrderProductEntity } from './entities/order-product.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';

@Controller('order-product')
@ApiTags('Pedido do produto')
@UsePipes(new ValidationPipe())
export class OrderProductController implements ICommonController<OrderProductEntity, CreateOrderProductDto, UpdateOrderProductDto> {

	constructor(private readonly orderProductService: OrderProductService) { }

	@Post('/create')
	@ApiBody({ type: CreateOrderProductDto })
	@ApiResponse({ status: HttpStatus.CREATED, description: 'Pedido de produto criado' })
	@ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Estoque insuficente de produto' })
	async create(@Body() dto: CreateOrderProductDto): Promise<OrderProductEntity> {
		return await this.orderProductService.create(dto);
	}

	@Get('findAll')
	@ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Não há pedido de produto cadastrado' })
	async findAll(): Promise<OrderProductEntity[]> {
		return await this.orderProductService.findAll();
	}

	@Get('findOne/:id')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pedido de produto não encontrado' })
	async findOne(@Param('id') id: number): Promise<OrderProductEntity> {
		return await this.orderProductService.findOne(id);
	}

	@Patch('update/:id/:amount')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pedido de produto não encontrado' })
	@ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Estoque insuficente de produto' })
	async update(@Param('id') id: number, @Param('amount') amount: number): Promise<UpdateResult> {
		return await this.orderProductService.update(id, amount);
	}

	@Delete('remove/:id')
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pedido de produto não encontrado' })
	async remove(@Param('id') id: number): Promise<DeleteResult> {
		return await this.orderProductService.remove(id);
	}
}
