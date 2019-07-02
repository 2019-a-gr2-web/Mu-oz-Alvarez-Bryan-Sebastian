import {Injectable} from "@nestjs/common";

import {Trago} from "./interfaces/trago";
import {InjectRepository} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";
import {Repository} from "typeorm";
import {promises} from "fs";


@Injectable()
export class TragosService {

    bddTragos: Trago[] = [];
    recnum = 1;
    constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>,){
        console.log("Line º +")
        const traguito:Trago={
            nombre:'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2018,5,10),
            precio:1.75,
            tipo:'Cerveza'
        };
        const objetoEntidad= this._tragosRepository.create(traguito);
        this._tragosRepository
            .save(objetoEntidad) //promesa
            .then((datos)=>{
                console.log('Dato creado:', datos);
            })
            .catch((error)=>{
                console.error('Error:', error)
            });


        this.crear(traguito);
    }
    crear(nuevoTrago: Trago): Promise<Trago>{

        //nuevoTrago.id = this.recnum;
        //this.recnum++;
        //this.bddTragos.push(nuevoTrago);
        //return nuevoTrago;
        const objetoEntidad = this._tragosRepository.create(nuevoTrago);
        return this._tragosRepository.save(objetoEntidad); //promesa
    }
    buscar(parametrosBusqueda?): Promise<Trago []>{
        return  this._tragosRepository.find(parametrosBusqueda);
    }
    buscarPorId(id: number): Trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.id === id;
            }
        );
    }
    buscarPorNombre(nombre: string): Trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );
    }

    editar(idParaEditar):Promise<Trago>{
        return this._tragosRepository.findOne(idParaEditar)

    }
    editarTrago(editarTrago:Trago):Promise<Trago>{
        return this._tragosRepository.save(editarTrago)

    }

    async eliminarPorId(id: number):Promise<Trago>{
        let objetoEntidad =await this._tragosRepository.findOne(id);
        return this._tragosRepository.remove(objetoEntidad);
        // const indice = this.bddTragos.findIndex(
        //     (trago)=>{
        //         return trago.id === id
        //     }
        // );
        // this.bddTragos.splice(indice,1);
        // return this.bddTragos;
    }

    actualizar(tragoActualizado: Trago, id:number) {

        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id
            }
        );
        tragoActualizado.id = this.bddTragos[indice].id;
        this.bddTragos[indice] = tragoActualizado;
    }


}