import { Injectable } from '@nestjs/common';
import {Estudiantes} from "./estudiantes/estudiantes";
import {Materias} from "./materias/materias";

@Injectable()
export class AppService {

  bddEstudiantes : Estudiantes[]=[];
  recnum = 1;

  bddMaterias: Materias[]=[];
  recnum2 = 1;

  constructor(){
    const estudiantes:Estudiantes={
      nombres:'Jacinto Andres',
      apellidos:'Palma Zambrano',
      fechaNacimiento : new Date(1993,12,8),
      semestreActual: 1,
      graduado:false

    };
    this.crearConductor(estudiantes)

      const auto:Materias={
          chasis:123456789,
          nombreMarca:"Chevrolet",
          colorUno:"azul",
          colorDos:"",
          nombreModelo:"Luv DMAX",
          anio:2018,
          conductorId:1
      };
      this.crearAuto(auto);

  }




  crearConductor(nuevoEstudiantes: Estudiantes):Estudiantes{
    nuevoEstudiantes.id = this.recnum;
    this.recnum++;
    this.bddEstudiantes.push(nuevoEstudiantes);
    return nuevoEstudiantes
  }

  eliminarConductorPorId(id:number):Estudiantes[]{
    console.log('id:', id);
    const indice= this.bddEstudiantes.findIndex(
        (estudiantes)=>{
          return estudiantes.id===id
        }
    );
    this.bddEstudiantes.splice(indice,1);
    return this.bddEstudiantes;
  }

  buscarPorNombre(nombre: string) {
    console.log('nombre:', nombre);
    const resultado=this.bddEstudiantes.filter(
        (estudiantes)=>{
          return estudiantes.nombres.includes(nombre);
        }
    );
    console.log('resultado:',resultado);
    return resultado;


  }

  //Autos

    crearAuto(nuevoAuto: Materias):Materias{
        nuevoAuto.id = this.recnum2;
        this.recnum2++;
        this.bddMaterias.push(nuevoAuto);
        return nuevoAuto
    }


    buscarPorId(id: number) {
        console.log('id:', id);
        const resultado=this.bddMaterias.filter(
            (auto)=>{
                return auto.conductorId===id;
            }
        );
        console.log('resultado:',resultado);
        return resultado;


    }


    buscarAutoMarca(marca: string, id:number) {
        console.log('nombre:', marca);
        const resultado=this.bddMaterias.filter(
            (auto)=>{
                return auto.nombreMarca.includes(marca) && auto.conductorId===id ;
            }
        );
        console.log('resultado:',resultado);
        return resultado;


    }


    eliminarPorId(id:number):Materias[]{
        console.log('id:', id);
        const indice= this.bddMaterias.findIndex(
            (auto)=>{
                return auto.id===id
            }
        );
        this.bddMaterias.splice(indice,1);
        return this.bddMaterias;
    }


}