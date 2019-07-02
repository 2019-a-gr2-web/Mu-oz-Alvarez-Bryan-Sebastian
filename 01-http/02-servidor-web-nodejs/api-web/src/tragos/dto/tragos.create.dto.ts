import {DistribuidorEntity} from "../../distribuidor/distribuidor.entity";
import {IsEmpty, IsNotEmpty, IsString, IsNumber, IsDate, IsOptional} from "class-validator";
export class TragosCreateDto {
    @IsEmpty()
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

    @IsDate()
    @IsOptional()
    fechaCaducidad: Date;

    @IsNumber()
    @IsOptional()
    precio: number;

    @IsNumber()
    @IsOptional()
    distribuidorId: DistribuidorEntity;
}