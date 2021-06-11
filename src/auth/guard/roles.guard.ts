import {
	CanActivate,
	ExecutionContext,
	forwardRef,
	HttpException,
	HttpStatus,
	Inject,
	Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserService } from '../../context/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject(forwardRef(() => UserService)) private userService: UserService
	) {}

	canActivate(context: ExecutionContext): boolean {
		const role = this.reflector.get<string[]>('role', context.getHandler());

		if (!role) {
			return true;
		}

		const isAuthorized = role.indexOf(context.switchToHttp().getRequest().user.role) !== -1;

		if (!isAuthorized) {
			throw new HttpException('Usuário não está autorizado', HttpStatus.FORBIDDEN);
		}

		return isAuthorized;
	}
}
