import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";
import {TragosEntity} from "./tragos.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                TragosEntity
            ],
            'default'
        ),
    ],//modulos
    controllers:[
        TragosController
    ],//controladores
    providers:[
        TragosService
    ],//servicios
    exports:[
        TragosService
    ]//Exportar servicios
})
export class TragosModule{

}