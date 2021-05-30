import { DeleteResult, UpdateResult } from 'typeorm';

export interface ICommonService<ENTITY, CREATE_DTO, UPDATE_DTO> {
	create(dto: CREATE_DTO): Promise<ENTITY>;
	findAll(): Promise<ENTITY[]>;
	findOne(id: number): Promise<ENTITY>;
	update(id: number, dto: UPDATE_DTO | string | number | boolean): Promise<UpdateResult>;
	remove(id: number): Promise<DeleteResult>;
}
