import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Landmark } from './Landmark';
import { User } from './User';

@Entity('ratings')
export class Rating extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Landmark, x => x.ratings, {onDelete: "CASCADE", eager: true, nullable: true})
  public landmark: Landmark | undefined;

  @ManyToOne(() => User, x => x.ratings, {onDelete: "CASCADE", eager: true, nullable: true})
  public creator: User | undefined;

  @Column()
  public rating: number;
}