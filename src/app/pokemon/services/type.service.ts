import { environments } from './../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IType } from '../interfaces/pkTypeInterface';

@Injectable({
  providedIn: 'root'
})
export class TypeService {


  constructor(private http: HttpClient) {

   }

   getType(value:string):Observable<IType | any>{
    return this.http.get(value);
   }
}
