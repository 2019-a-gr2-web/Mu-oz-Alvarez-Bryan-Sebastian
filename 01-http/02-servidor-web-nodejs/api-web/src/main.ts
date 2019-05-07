import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
// import * as cookieParser from 'cookie-parser'
const cookieParser = require('cookie-parser');
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory
        .create(AppModule) as NestExpressApplication;
    app.use(cookieParser('Secreto'));
    app.setViewEngine('ejs');
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.use(express.static('publico'));
    await app.listen(3000);
}

bootstrap();
bootstrap();
