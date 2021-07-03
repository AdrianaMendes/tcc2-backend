import { ICategory } from './category.interface';
import { IImage } from './image.interface';

export interface IProduct {
	id: number;
	category: ICategory;
	name: string;
	description?: string;
	image?: IImage;
	amount: number;
	isActive: boolean;
	value: number;
}
