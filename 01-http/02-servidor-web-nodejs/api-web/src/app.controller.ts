import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //Se define el metodo HTTP GET
  getHello(): string {
    return this.appService.getHello();
  }


  @Post()
  @HttpCode(200)
  postHello(): string {
    return 'Hola Mundo en Post';
  }

}





/*
@NombreDecoradorClase() //Decorador->funcion
class usuario{
  @Atributo()
  atributoPublico;//Public
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Paramtro() atributoPublico,
              @OtroParametro() atributoPrivado,
              @OtroOtroParametro() atributoProtegido){
    this.atributoPublico=atributoPublico;
    this.atributoPrivado=atributoPrivado;
    this.atributoProtegido=atributoProtegido;
  }

  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}

}*/