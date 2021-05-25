import { UpdateResult, DeleteResult } from 'typeorm';

export interface ICommonController<ENTITY, CREATE_DTO, UPDATE_DTO> {
	create(dto: CREATE_DTO): Promise<ENTITY>;
	findAll(): Promise<ENTITY[]>;
	findOne(id: number): Promise<ENTITY>;
	update(id: number, dto: UPDATE_DTO): Promise<UpdateResult>;
	remove(id: number): Promise<DeleteResult>;
}
