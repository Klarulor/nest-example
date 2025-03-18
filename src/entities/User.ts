import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { Photo } from './Photo';
import { Rating } from './Rating';

@Entity("users")
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  public id: number;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public passwordHash: string;

  @OneToMany(() => Photo, x => x.creator, {lazy: true, cascade: true})
  public photos: Promise<Photo[]>;

  @OneToMany(() => Rating, x => x.creator, {lazy: true, cascade: true})
  public ratings: Promise<Rating[]>;
}