import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  firstName?: string;

  @Column({ length: 100, nullable: true })
  lastName?: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 200, nullable: true })
  userPicture?: string;

  // @Column({ default: new Date(), type => DateTimeWithOff })
  // createdAt: Date;
}
