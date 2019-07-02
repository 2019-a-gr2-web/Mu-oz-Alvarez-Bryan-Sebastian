import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";
import {FiestaModule} from "./fiesta/fiesta.module";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {ChatModule} from "./chat/chat.module";

@Module({
    imports: [
        /*TragosModule,
        DistribuidorModule,
        FiestaModule,
        TypeOrmModule.forRoot({
            name: 'default', // nombre cadena conexion por defecto de typeorm
            type: 'mysql',
            host: 'localhost',
            port: 3307,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [
                TragosEntity,
                DistribuidorEntity,
                FiestaEntity

            ],
            synchronize: true,
            dropSchema: false
        }),*/
        ChatModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}