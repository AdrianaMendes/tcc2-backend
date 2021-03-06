import { IFile } from './file.interface';
import { IProduct } from './product.interface';

export interface ICategory {
	id: number;
	productArr?: IProduct[];
	name: string;
	description?: string;
	image?: IFile;
}
