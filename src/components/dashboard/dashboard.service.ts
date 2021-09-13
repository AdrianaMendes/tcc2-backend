import { MoreThan, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EOrderStatus } from '../../assets/enum/order-status.enum';
import { EPaymentType } from '../../assets/enum/payment-type.enum';
import { IDashboardData } from '../../assets/interface/dashboar-data.interface';
import { IPaymentType } from '../../assets/interface/payment-type.interface';
import { OrderEntity } from '../order/entities/order.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class DashboardService {
	constructor(
		@InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
		@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
	) {}

	async getDashboardData(): Promise<IDashboardData> {
		const lastWeek: Date = new Date();
		lastWeek.setDate(lastWeek.getDate() - 7);

		const dashboardData: IDashboardData = {} as IDashboardData;
		dashboardData.registredUsers = await this.userRepository.count();
		dashboardData.closedOrder = await this.orderRepository.count({ where: { status: EOrderStatus.CLOSE } });
		dashboardData.paymentType = {} as IPaymentType;

		dashboardData.lastUsers = await this.userRepository.find({
			where: { lastLoginDate: MoreThan(lastWeek) },
			order: {
				lastLoginDate: 'ASC'
			},
			take: 10
		});

		dashboardData.paymentType.CASH = await this.orderRepository.count({
			where: { paymentType: EPaymentType.CASH }
		});
		dashboardData.paymentType.CREDIT_CARD = await this.orderRepository.count({
			where: { paymentType: EPaymentType.CREDIT_CARD }
		});
		dashboardData.paymentType.DEBIT = await this.orderRepository.count({
			where: { paymentType: EPaymentType.DEBIT }
		});
		dashboardData.paymentType.NOT_INFORMED = await this.orderRepository.count({
			where: { paymentType: EPaymentType.NOT_INFORMED }
		});
		dashboardData.paymentType.PIX = await this.orderRepository.count({
			where: { paymentType: EPaymentType.PIX }
		});

		const { sum } = await this.orderRepository
			.createQueryBuilder('order')
			.select('SUM(order.totalValue)')
			.where('order.status = :status', { status: EOrderStatus.CLOSE })
			.getRawOne();

		dashboardData.movimentedValue = sum !== null ? sum : 0;

		return dashboardData;
	}
}
