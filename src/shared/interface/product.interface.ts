import { ICategory } from './category.interface';

export interface IProduct {
	id: number;
	category: ICategory;
	name: string;
	description?: string;
	image?: string;
	amount: number;
	isActive: boolean;
	value: number;
}
