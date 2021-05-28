import { ICommonService } from './common-service.interface';

export interface ICommonServiceSoftDelete<ENTITY, CREATE_DTO, UPDATE_DTO> extends ICommonService<ENTITY, CREATE_DTO, UPDATE_DTO> {
	findAllActive(): Promise<ENTITY[]>;
	findOneActive(id: number): Promise<ENTITY>;
}
