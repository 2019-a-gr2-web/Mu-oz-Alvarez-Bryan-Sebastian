import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TragosEntity} from "../tragos/tragos.entity";

@Entity('db_distribuidor')
export class DistribuidorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany( type => TragosEntity, trago => trago.distribuidorId)
    tragos: TragosEntity[];

}
