import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Landmark } from './Landmark';
import { User } from './User';

@Entity('photos')
export class Photo extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: true})
  public imageUrl?: string;

  @ManyToOne(() => Landmark, x => x.photos, {onDelete: "CASCADE", eager: true, nullable: true})
  public landmark: Landmark | undefined;

  @ManyToOne(() => User, x => x.photos, {onDelete: "CASCADE", eager: true, nullable: true})
  public creator: User | undefined;
}