import { Observable } from "rxjs";

export interface IBaseServiceOperations<T> {
    GetAll(): Observable<Array<T>>;
    GetById(id: number): Observable<T>;
    controllerURL: string;
}