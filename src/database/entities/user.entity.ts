import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ITask, IUser } from '../../types';
import { Task } from './';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!:string;

  @Column()
  login!: string;

  @Column()
  password!: string
  
  @OneToMany(() => Task, task => task.userId)
  tasks!: ITask[];
}