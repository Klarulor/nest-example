import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { Country } from './Country';
import { Photo } from './Photo';
import { Rating } from './Rating';

@Entity("landmarks")
export class Landmark extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({type: "text"})
  public description: string;

  @Column()
  public geo: string;

  @ManyToOne(() => Country, x => x.landmarks, { onDelete: "CASCADE", eager: true })
  public country: Country;

  @Column({nullable: true})
  public imageUrl?: string;

  @OneToMany(() => Photo, x => x.landmark, {lazy: true, cascade: true})
  public photos: Promise<Photo[]>;

  @OneToMany(() => Rating, x => x.landmark, {lazy: true, cascade: true})
  public ratings: Promise<Rating[]>;

}