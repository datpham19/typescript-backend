
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import 'reflect-metadata';

@Entity({ name: 'useraccount_user'})
export class UsersModel {
  @PrimaryColumn({ name: 'id' })
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public username: string;

}