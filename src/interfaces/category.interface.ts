import { UserInterface } from './user.interface';

export interface CategortBodyInterface {
  userId: number;
  name: string;
  color?: string;
}

export interface CategoryInterface {
  id: number;
  name: string;
  color: string;
  user: UserInterface;
}
