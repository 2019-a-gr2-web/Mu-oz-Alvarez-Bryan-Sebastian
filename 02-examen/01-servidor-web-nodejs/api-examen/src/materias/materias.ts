export interface Materias{
    id?:number;
    codigo:number;
    nombreMateria:string;
    descripcion:string;
    activo:boolean;
    fechaCreacion:Date;
    numeroHorasPorSemana:number;
    estudianteId:number
}