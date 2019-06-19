import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";

@Controller('api/traguito')
export class TragosController{

    constructor(private readonly _tragosService:TragosService){

    }

    @Get('lista')
    async listarTragos(
        @Res() res
    ){
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        })

    }


    @Get('crear')
    crearTragos(
        @Res() res
    ){

        res.render('tragos/crear-editar',{

        })

    }


    @Post('crear')
    async crearTragosPost(      //async para que sea sincrono
        @Body() trago:Trago, //para coger a todos
        @Res() res,

        //o podemos colocarlos uno por uno
        //@Body('nombre') nombre:string,
        //@Body('tipo') tipo:string,
        //@Body('gradosAlcohol') gradosAlcohol:number,
        //@Body('fechaCaducidad') fechaCaducidad:Date,
        //@Body('precio') precio:number,
    ){

        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);

        trago.fechaCaducidad =  new Date(trago.fechaCaducidad);

        let tragoAValidar = new TragosCreateDto();
        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;



        // si se utiliza el await se debe utilizar el try y el catch
        try {

            const errores = await validate(tragoAValidar);

            if(errores.length >0){
                console.error(errores);
                res.status(400);
                res.send({mensaje: 'Error', codigo:400});
            } else {

            const respuestaCrear = await this._tragosService.crear(trago); //Promesa  //await para que sea sincrono
            console.log('Respuesta: ', respuestaCrear);
            res.redirect('/api/traguito/lista');
        }
        }
        catch (e){
            res.status(500);
            res.send({mensaje: 'Error', codigo:500});

            //Ya se esta creando tragos yendo a la pagina web  /api/traguito/lista
        }




        //console.log('Trago: ', trago, typeof trago);
        //console.log('Nombre: ', nombre, typeof nombre);
        //console.log('Tipo: ', tipo, typeof tipo);
        //console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        //console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        //console.log('Precio: ', precio, typeof precio);

    }




}