import { ICategory } from './category.interface';
import { IFile } from './file.interface';

export interface IProduct {
	id: number;
	category: ICategory;
	name: string;
	description?: string;
	image?: IFile;
	amount: number;
	isActive: boolean;
	value: number;
}
