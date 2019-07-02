import {DistribuidorEntity} from "../../distribuidor/distribuidor.entity";
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class TragosUpdateDto {
    @IsOptional()
    id: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;

    @IsNotEmpty()
    @IsNumber()
    gradosAlcohol: number;

    @IsOptional()
    @IsDate()
    fechaCaducidad: Date;

    @IsOptional()
    @IsNumber()
    precio: number;

    @IsOptional()
    @IsNumber()
    distribuidorId: DistribuidorEntity;
}