import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {program} from './request.config';
import {base_url} from './auth.key';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json;charset=UTF-8"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {
  constructor(private httpClient: HttpClient) { }
  getResult(data:program):Observable<any>{
    return this.httpClient.post(base_url+'execute',data);
  }
  get_Result():Observable<any>{
    return this.httpClient.get(base_url+'execute');
  }
  getProblems(){
    return this.httpClient.get(base_url+'data/problems');
   }
 
   getProblem(id:string){
     return this.httpClient.get(base_url+'data/problem?id='+id);
   }
   getProblemDetail(id:string){
     return this.httpClient.get(base_url+'data/problem/detail?id='+id);
   }
   getProblemByName(name : string){
     return this.httpClient.get(base_url+'data/problem/name?name='+name);
   }
   getProblemDetailByName(name :string){
     return this.httpClient.get(base_url+'data/problem/detail/name?name='+name);
   }
  
}
