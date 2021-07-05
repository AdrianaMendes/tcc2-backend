import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../../assets/decorator/has-roles.decorator';
import { EUserRole } from '../../assets/enum/user-role.enum';
import { IDashboardData } from '../../assets/interface/dashboar-data.interface';
import { JwtAuthGuard } from '../../assets/guard/jwt-auth.guard';
import { RolesGuard } from '../../assets/guard/roles.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get()
	@HasRoles(EUserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth()
	async getDashboardData(): Promise<IDashboardData> {
		return this.dashboardService.getDashboardData();
	}
}
