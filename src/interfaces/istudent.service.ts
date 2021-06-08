import { IStudent } from "./istudent";
import { IPaginated } from "./results";

export enum Ordering {
    Asc = "ASC",
    Desc = "DESC"
}

export type OderingType  = "ASC" | "DESC"

export interface IPagination{
    page?:number
    limit?:number
}

export interface IOrdering{
    field:String
    order:Ordering
}

export interface IQuery{
    pagination?:IPagination;
    search?:string;
    order?:IOrdering;
}

export interface IRepository<T> {
    save(entity: T);
}

export interface IStudentService{
    find(options:IQuery): Promise<IPaginated<IStudent>>;
    save(student: IStudent);
}