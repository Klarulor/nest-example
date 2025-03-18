import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Landmark } from './Landmark';

@Entity("countries")
export class Country extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({nullable: true})
  public imageUrl?: string;

  @OneToMany(() => Landmark, x => x.country, {lazy: true, cascade: true})
  public landmarks: Promise<Landmark[]>;
}