import { Controller, Get, Post, HttpCode, Put,Delete, Headers, Query, Param, Body, Request,Response,Session} from '@nestjs/common';
import { AppService } from './app.service';

import * as Joi from '@hapi/joi'
@Controller('/api')
export class AppController {
    arregloUsuario =[];

    constructor(private readonly appService: AppService) {}
    @Get('session')
    session(
        @Query('nombre') nombre,
        @Session() session
    ){
        console.log(session);
        session.autenticado = true;
        session.nombreUsuario=nombre;
        return 'ok';
    }

    @Get('login')
    loginVista(
        @Response() res
    ){
        res.render('login')
    }

    @Post('login')
    login(
        @Body() usuario,
        @Session() session,
        @Response() res
    ){
        if(usuario.username === 'sebas' && usuario.password ==='12345678'){
            //    QUE HACEMOS
            session.username = usuario.username;
            res.redirect('/api/protegida');
        }else{
            res.status(400);
            res.send({mensaje:'Error login',error:400})
        }
    }

    @Get('logout')
    logout(
        @Response() res,
        @Session() session
    ){
        session.username = undefined;
        session.destroy();
        res.redirect('/api/login');
    }

    @Get('protegida')
    protegida(
        @Session() session,
        @Response() res
    ){
        if(session.username){
            res.render('protegida',{
                nombre:session.username});
        }else{
            res.redirect('/api/login');
        }
    }

    @Get('/hello-world')
    helloWorld(): string {
        return 'Hello World';
    }
// Post http://localhost:300/api
    @Post('/hola-mundo')                   //Metodo Http
    //@HttpCode(200)
    holaMundo(){
        return 'hola mundo en post';
    }
    @Put('/hola-mon')
    holaMon(){
        return 'Hola Mon en put';
    }
    @Delete('/salut-monde')
    salutMonde(){
        return 'salut monde en delete';
    }
    @Get('/adivina')
    adivina(@Headers() headers): string {
        console.log('Headers:', headers);
        const numeroRandomico = Math.round(Math.random()*10);
        const numeroDeCabecera=Number(headers.numero);
        if(numeroDeCabecera==numeroRandomico){
            return 'ok';
        }else{
            return ':(';
        }

        /***
         //variables como consts
         let nombre: string='Pamela' ;//String
         let edad=29 ; //number
         let sueldo=1.20 ;//number
         let casado=false ;//boolean
         let hijos=null ;//null
         let  alias=undefine;//underfine
         ***/

    }
    @Post('/consultar')
    consultar(@Query() queryParams){
        if(queryParams.nombre){
            return `Hola ${queryParams.nombre}`
        }else{
            return 'Hola extraño';
        }
    }

    @Get('/ciudad/:idCiudad')
    ciudad(@Param() parametrosRuta){
        switch(parametrosRuta.idCiudad.toLowerCase()){
            case 'quito':
                return 'Que fue';
            case 'guayaquil':
                return 'Que maah ñañoshh';
            default:
                return 'hola';

        }

    }

    @Post('registroComida')
    registroComida(
        @Body() parametrosCuerpo,
        @Response() response
    ){
        if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
            const cantidad=Number(parametrosCuerpo.cantidad);
            if(cantidad>1){
                response.set('Premio','Fanesca');
            }
            return response.send({mensaje:'Registro Creado'});
        } else {
            return response.status(400).send({mensaje:'Error, no envia nombre o cantidad', error: 400});
        }
    }
    @Get('/semilla')
    semilla(@Request() request, @Response() response){
        console.log(request.cookies);
        const cookies = request.cookies;//json
        const esquemaValidacionNumero=Joi.object().keys({
            numero:Joi.number().integer().required()
        });
        const objetoValidaion={
            numero:cookies.numero
        };
        const resultado= Joi.validate(objetoValidaion,esquemaValidacionNumero );
        if(resultado.error){
            console.log('Resultado: ', resultado);
        }else{
            console.log('numero valido');
        }

        const cookieSegura = request.signedCookies.fechaServidor;

        if(cookieSegura){
            console.log('Cookie Segura');
        }else{
            console.log('No es valida esta cookie')
        }

        if(cookies.micookie){
            const horaFechaServior = new Date();
            const minutos=horaFechaServior.getMinutes();
            horaFechaServior.setMinutes(minutos+1);
            response.cookie('fechaServidor', //nombre key
                new Date().getTime(),{
                    //opciones
                    // expires:new Date()
                    signed:true
                }); //valor
            return response.send('ok');
        }else{
            return response.send(':(');
        }
    }

    @Get('inicio')//end point
    inicio(@Response() res){
        return res.render('inicio',{ estavivo:true});
    }

    @Get('peliculas')
    peliculas(@Response() res){
        return res.render('peliculas/inicio',{

        });
    }
    @Get('estilos')
    estilos(@Response() res){
        return res.render('peliculas/estilos',{

        });
    }



    /*
    *Segmento inicial: / api
    * 1) Segmento Accion: GET 'hello-world' --> 'Hello world'
    * 2) Segmento Accion:Post 'hola-mundo' --> 'Hola mundo'
    * 3) Segmento Accion:PUT 'hola-mon'-->'Hola mon'
    * 4) Segmento Accion:DELETE 'salut-monde'-->'salut Monde
     */
    /**@NombreDecorador() //Decorador-> funcion
     class usuario{
    @atributoPublico; //atributo
    private atributoPrivado;
    protected atributoProtegido;
    constructor(@Parametro atributoPublico, atributoPrivado,atributoProtegido){
      this.atributoPublico=atributoPublico;
      this.atributoPrivado=atributoPrivado;
      this.atributoProtegido=atributoProtegido;
    }
    @MetodoA()
    public metodoPublico(){}
  @MetodoB()
  private metodoPrivado(){}
    protected metdoProtegifo(){}
     **/
}

/**const json=[
 {
    llave: 'valor', //solo funciona con comillas doble
    "key": "value",
    'nombre': "Pamela",
    edad: 29,
    sueldo: 10.21,
    casado: false,
    hijos: null,
    mascotas:["cachetas",
      1,
      1.01,
      false,
      null,
      {
        "nombre": "Pamela"
      },
    ]
  }
 ];
 let objeto={
  propiedad:'valor',
  propiedadDos:'valor2'
};**/
/**objeto.propiedad//valor
 objeto.propiedadDos//valor2
 objeto.propiedadTres='valor3';
 objeto['propiedadTres']='valor3';
 delete objeto.propiedadTes;//destruir
 objeto.propiedadTres=undefined;//destruir
 **/

/* Variables JS
variables ? const, var, let
string number
 */
function holaMundo() {
    console.log('hola mundo');
}
const respuestaHolaMundo=holaMundo();
console.log('Resp hola mundo; ', respuestaHolaMundo)
function suma(a:number,b:number) {
    return a+b;
}
const respuestaSuma=suma(2, 3);
console.log('Resp suma; ', respuestaSuma)

//condicional
if(true){
    console.log('falso');

}else{
    console.log('falso');
}
if(null){//falsy
    console.log('verdadero');
}else{
    console.log('falso');
}

//operadores de arreglos JS
const  arreglo = [1,'A',true,null,{},[]];

const arreglosnumeros=[1,2,3,4,5,6];
// 1) impriman en consola todos los elementos
//2) sumen 2 numeros
const arregloNumerosMap=[1,2,3,4,5,6];
const rMap = arregloNumerosMap.map(
    // devolver el nuevo valor de ese elmenento; transformar en un arreglo
    (valorActual)=>{
        const esPar=valorActual %2==0;
        if(esPar){
            const  nuevoValor = valorActual +2;
            return nuevoValor;
        }else{
            const nuevoValor = valorActual+1;
            return nuevoValor;
        }
    }
);
// encuentren si hay el numeo4
const arregloNumerosFind=[1,2,3,4,5,6];
const rFind=arregloNumerosFind.find((valorActual)=>{
    return valorActual == 4;
});
console.log(`Respuesta Find: ${rFind}`);
// filten llos numerosmenires de 5
const arregloNumerosFilter=[1,2,3,4,5,6];
const rFilter=arregloNumerosFilter.filter((valorActual)=>{
    return valorActual < 5;
});
console.log(`Respuesta Filter: ${rFilter}`);
//todos los valores  son positivos true false
const arregloNumerosEvery=[1,2,3,4,5,6];
const rEvery=arregloNumerosEvery.every((valorAtual)=>{ //and
    return valorAtual > 0 ;
});
console.log(`Respuesta Every: ${rEvery}`); //true

//algun valor es menor  que 2
const arregloNumerosSome=[1,2,3,4,5,6];
const rSome =arregloNumerosSome.some((valorActual)=>{
        return valorActual < 2 ;
    }
);
console.log(`Respuesta Some: ${rSome}`); //true

// sumen todos los valores
const arregloNumerosReduce=[1,2,3,4,5,6];
const valorDondeEmpiezaCalculo=0;
const rReduce= arregloNumerosReduce.reduce((acumulado, valorActual)=>{
        if(acumulado<4){
            return acumulado+valorActual*1.1+5;
        }else{
            return acumulado+valorActual*1.15+3;
        }
    },valorDondeEmpiezaCalculo
);
console.log(`Respuesta Reduce: ${rReduce}`); //existe el reduce right el arreglo comienza desde la derecha

//<4
//10%+5
//>=4
//15% +3

//resten todos los valores de 100
const arregloNumerosReduce2=[1,2,3,4,5,6];
const valorDondeEmpiezaCalculo2=100;
const rReduce2= arregloNumerosReduce2.reduce((acumulado, valorActual)=>{
        return acumulado-valorActual;
    },valorDondeEmpiezaCalculo2
);
console.log(`Respuesta Reduce2: ${rReduce2}`); //existe el reduce right el arreglo comienza desde la derecha

//1.1 sumen 10 a todos
//1.2 filtren los mayorea a 15
// 1.3 si hay algun numero mayor 30
const arregloEjercicio=[1,2,3,4,5,6];
arregloEjercicio.map((valorActual)=>{
    return valorActual + 10;
}).filter((valorActual)=>{
    return valorActual > 15;
}).some((valorActual)=>{
    return valorActual>30;
});

/*
const arregloNumerosForEacha[1,2,3,4,5,6];
arregloNumerosForEacha.forEach(valorActual. omdice){
  function (calorActual, indice.err
)
  ()
  e
}
*/