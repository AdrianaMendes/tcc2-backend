import { ICommonController } from './common-controller.interface';

export interface ICommonControllerSoftDelete<ENTITY, CREATE_DTO, UPDATE_DTO> extends ICommonController<ENTITY, CREATE_DTO, UPDATE_DTO> {
	findAllActive(): Promise<ENTITY[]>;
	findOneActive(id: number): Promise<ENTITY>;
}
