import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 500 })
  passowrd: string;

  @Column({ length: 200 })
  userPicture?: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
