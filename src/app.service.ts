import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	testEndpoint(): string {
		return 'Endpoint de teste funcionando. Para acessar a documentação Swagger adicione "/api" no final da URL.';
	}
}
