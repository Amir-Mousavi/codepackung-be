import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  firstName?: string;

  @Column({ length: 100, nullable: true })
  lastName?: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 200, nullable: true })
  userPicture?: string;

  @OneToMany(() => Category, (category) => category.user)
  category: Category;

  // @Column({ default: new Date(), type => DateTimeWithOff })
  // createdAt: Date;
}
