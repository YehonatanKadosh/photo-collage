import { Category } from './Category';

export class User {
  privateModePassword: string;
  libraryName: string;
  description: string;
  template: string;
  categories: Category[];
  preferedTheme: string;
}
