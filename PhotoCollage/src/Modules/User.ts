import { environment } from 'src/environments/environment';
import { Category } from './Category';

export class User {
  password: string;
  libraryName: string;
  description: string;
  template: string;
  categories: Category[];
  preferedTheme: string;
}
