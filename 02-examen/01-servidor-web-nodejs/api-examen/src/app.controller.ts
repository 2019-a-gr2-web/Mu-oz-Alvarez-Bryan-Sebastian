import {Controller, Delete, Get, HttpCode, Post, Put, Headers, Query, Param, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {Estudiantes} from "./estudiantes/estudiantes"; //carpeta conductores
import {Materias} from "./materias/materias";

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {

  }

  //Lleva a la página de Inicio de la aplicación
  @Get('/inicio')
  getInicio(@Response() res, @Request() req) {
    const cookieUsuarioSegura = req.signedCookies;
    return res.render('paginaWeb/inicio', {
      nombre: cookieUsuarioSegura.nombreUsuario
    })


  }

  //Lleva a la página de login de la aplicación
  @Get('/login')
  getLogin(@Response() res){
    res.render('paginaWeb/login')
  }

  //Lleva a la página de la tabla de los conductores
  @Get('/estudiantes')
  getConductores(@Response() res, @Request() req){
    const cookieUsuarioSegura = req.signedCookies;
    const arregloEstudiantes= this.appService.bddEstudiantes;

    res.render('estudiantes/estudiantes',{arregloEstudiantes:arregloEstudiantes,nombre:cookieUsuarioSegura.nombreUsuario});
  }




//Lleva a la página que permite agregar un nuevo conductor
  @Get('/crear-estudiante')
  getCrearConductores(@Response() res, @Request() req){
    const cookieUsuarioSegura = req.signedCookies;
    return res.render('estudiantes/crear-estudiante', {
      nombre: cookieUsuarioSegura.nombreUsuario
    });
  }




  //Genera la cookie segura con el nombre de usuario
  @Post('/login')
  postLogin(@Request() req, @Response() resp, @Headers() header, @Body('nombre') nombre: string) {

    const cookieUsuarioSegura = req.signedCookies;
    if (!cookieUsuarioSegura.nombreUsuario) {

      resp.cookie('nombreUsuario', nombre, {signed: true})

    }

    cookieUsuarioSegura.nombreUsuario = nombre;
    resp.redirect('/examen/inicio')
  }


  //Crea un nuevo conductor para ser añadido a la lista
  @Post('/crearEstudiante')
  crearConductorPost(
      @Body() conductor:Estudiantes,
      @Response() res
  ){

    conductor.semestreActual= Number(conductor.semestreActual);
    conductor.fechaNacimiento = new Date(conductor.fechaNacimiento);
    conductor.graduado = Boolean(conductor.graduado);
    console.log(conductor);
    this.appService.crearConductor(conductor);
    res.redirect('/examen/estudiantes');
  }




  //Elimina la cookie y redirige al ingreso de datos
  @Post('/eliminarCookie')
  postEliminarCookie(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string){
    response.clearCookie("nombreUsuario");
    response.redirect('/examen/login')
  }

  //Elimina el conductor de la lista
  @Post('/eliminarConductor')
  posrtEliminarConductor(@Response() res,
                         @Body('id') id: number, @Request() request) {

    this.appService.eliminarConductorPorId(Number(id));
    res.redirect('/examen/conductores');
  }

  //Busca al conductor de acuerdo al paramtero de entrada
  @Post('/buscarEstudiantes')
  buscarConductor(@Response() res,
                  @Body('busquedaEstudiante') busquedaEstudiante: string, @Request() request) {
    const cookieSeg = request.signedCookies;
    var arregloEstudiantes=this.appService.buscarPorNombre(busquedaEstudiante);
    console.log('imprimiendo arreglo conductores:',arregloEstudiantes);
    if(arregloEstudiantes!=null){
      res.render('estudiantes/estudiantes', {arregloEstudiantes:arregloEstudiantes,nombre:cookieSeg.nombreUsuario})
    }else {
      res.redirect('/examen/conductores');
    }
  }


//-----------------------------------------hijos

  @Get('/materias/:id')
  gestionarHijos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
    id = Number(params.id);
    const cookieSeg = request.signedCookies;
    const arregloAutos= this.appService.buscarPorId(Number(id));
    console.log('arrAutos:',arregloAutos);
    if (cookieSeg.nombreUsuario) {

      return response.render('materias/materias',{id:id,arregloAutos:arregloAutos,nombre:cookieSeg.nombreUsuario})

    }
    else{
      return response.render('paginaWeb/login');
    }

  }

  @Get('/busquedaAutos/:id')
  busquedaHijos(@Param() params, @Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
    id= Number(params.id);
    const cookieSeg = request.signedCookies;
    if (cookieSeg.nombreUsuario) {

      return response.render('autos',{id:id,arregloAutos:arregloAutoBusqueda,nombre:cookieSeg.nombreUsuario})

    }
    else{
      return response.render('paginaWeb/login');
    }


  }


  @Get('/crear-materias/:id')
  crearAuto( @Param() params,@Response() res,@Request() request){
    const cookieSeg = request.signedCookies;
    console.log(id);

    if (cookieSeg.nombreUsuario) {

      return res.render('materias/crear-materia',{nombre:cookieSeg.nombreUsuario, id:id})

    }
    else{
      return res.redirect('/paginaWeb/login');
    }

  }


  @Post('/crearAuto')
  crearAutoPost(
      @Body() auto:Materias,
      @Response() res,
      @Param() params,
      @Request() request
  ){
    const cookieSeg = request.signedCookies;
    auto.codigo=Number(auto.codigo);
    auto.nombreMateria=String(auto.nombreMateria);
    auto.descripcion=String(auto.descripcion);
    auto.activo=Boolean(auto.activo);
    auto.fechaCreacion=new Date(auto.fechaCreacion);
    auto.numeroHorasPorSemana =Number(auto.numeroHorasPorSemana);
    auto.estudianteId = Number(auto.estudianteId);
    console.log(auto);
    this.appService.crearAuto(auto);
    if (cookieSeg.nombreUsuario) {

      res.redirect('/examen/materias/'+id);

    }
    else{
      return res.render('paginaWeb/login');
    }


  }

  @Post('eliminarAutos')
  eliminarAuto(@Param() params,@Response() res,  @Body('conductorId') idConductor: number,
               @Body('idAuto') idAuto: number, @Request() request) {

    const cookieSeg = request.signedCookies;
    this.appService.eliminarPorId(Number(idAuto));

    if (cookieSeg.nombreUsuario) {

      res.redirect('/examen/materias/'+idConductor);

    }

    else{
      return res.render('paginaWeb/login');
    }


  }






  @Post('/buscarAuto')
  buscarAuto(@Param() params,@Response() res,
             @Body('busquedaMaterias') busquedaMaterias: string, @Request() request) {
    const cookieSeg = request.signedCookies;
    arregloAutoBusqueda=this.appService.buscarAutoMarca(busquedaMaterias,id);
    console.log('impiendo arreglo productos:',arregloAutoBusqueda);

    if(busquedaMaterias!=null){
      if (cookieSeg.nombreUsuario) {

        res.redirect('/materias/busquedaMaterias/'+id);

      }
      else{
        return res.render('paginaWeb/login');
      }

    }else{
      if (cookieSeg.nombreUsuario) {

        res.redirect('/examen/tienda/gestionarProductos/'+id);

      }
      else{
        return res.render('paginaWeb/login');
      }

    }
  }


}
let id:number;
let arregloAutoBusqueda:Materias[];