import {Body, Controller, Get, Post, Res, Query,Param} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";
import {TragosUpdateDto} from "./dto/tragos.update.dto";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {

    }

    @Get('lista')
    async listarTragos(
        @Res() res
    ) {
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {
            arregloTragos: arregloTragos
        })
    }

    @Get('crear')
    crearTrago(
        @Res() res,
        @Query('mensaje') mensaje: string
    ) {
        res.render('tragos/crear-editar', {
                mensaje:mensaje
            }
        )
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago: Trago,
        @Res() res
        //@Body('nombre') nombre:string,
        //@Body('tipo') tipo:string,
        //@Body('gradosAlcohol') gradosAlcohol:number,
        //@Body('fechaCaducidad') fechaCaducidad:Date,
        //@Body('precio') precio:number,

    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad? new Date(trago.fechaCaducidad): undefined;

        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {
            const errores = await validate(tragoAValidar);
            console.log(errores);
            console.log(tragoAValidar);
            console.log(trago);
            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaCrear = await this._tragosService.crear(trago);
                console.log('Respues: ', respuestaCrear);
                res.redirect('/api/traguito/lista');
            }

        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }

        console.log(trago);
        //console.log('Trago: ', trago, typeof trago);
        //console.log('nombre: ', nombre, typeof nombre);
        //console.log('tipo: ', tipo, typeof tipo);
        //console.log('gradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        //console.log('fechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        //console.log('precio: ', precio, typeof precio);
    }
    @Get('/editar/:id')
    async editarTragos(@Res() res, @Param() param, @Query('mensaje')mensaje:string) {
        const arregloTragos = await this._tragosService.editar(param.id);
        res.render('tragos/crear-editar', {
            mensaje: mensaje,
            arregloTragos: arregloTragos
        })
    }

    @Post('editar')
    async editarTragoPost(@Body() trago: Trago,
                          @Res() res
                          // @Body('nombre') nombre:string,
                          // @Body('tipo') tipo:string,
                          // @Body('gradosAlcohol') gradosAlcohol:number,
                          // @Body('fechaCaducidad') fechaCaducidad:Date,
                          // @Body('precio') precio:number,
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        console.log(trago);

        let tragoAValidar = new TragosUpdateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {
            const errores = await validate(tragoAValidar);
            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/traguito/editar/'+trago.id+'?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaEditar = await this._tragosService.editar(trago.id); //promesa
                respuestaEditar.nombre=trago.nombre;
                respuestaEditar.tipo=trago.tipo;
                respuestaEditar.fechaCaducidad=trago.fechaCaducidad;
                respuestaEditar.precio=trago.precio;
                respuestaEditar.gradosAlcohol=trago.gradosAlcohol;
                await this._tragosService.editarTrago(respuestaEditar);
                console.log('RESPUESTA: ', respuestaEditar);
                res.redirect('/api/traguito/lista');
            }
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }


        // console.log('Nombre: ', nombre, typeof nombre);
        // console.log('Tipo: ', tipo, typeof tipo);
        // console.log('GradosAlcohol: ', gradosAlcohol, typeof gradosAlcohol);
        // console.log('FechaCaducidad: ', fechaCaducidad, typeof fechaCaducidad);
        // console.log('Precio: ', precio, typeof precio);
    }

    @Post('eliminar')
    eliminarTrago(
        @Body() trago: Trago,
        @Res() res,
    ) {
        trago.id = Number(trago.id)
        this._tragosService.eliminarPorId(trago.id);
        res.redirect('/api/traguito/lista');
        console.log(trago);

    }
}