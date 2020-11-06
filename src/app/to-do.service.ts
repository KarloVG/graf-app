import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToDo } from './interface/to-do';
import { idText } from 'typescript';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {
    
  SERVER_URL: string = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  // public getToDos() {
  //   return this.http.get(this.SERVER_URL + 'toDos');
  // }
  getToDos(): Observable<IToDo[]>{
    const url = this.SERVER_URL + 'toDos';
    return this.http.get<IToDo[]>(url);
  }

  // public getToDo(toDoid) {
  //   return this.http.get(`${this.SERVER_URL + 'toDos'}/${toDoid}`);
  // }
  public createToDo(toDo: { id: number, text: string }) {
    return this.http.post(`${this.SERVER_URL + 'toDos'}`, toDo)
  }
  // createToDo(): Observable<IToDo[]>{
  //   const url = this.SERVER_URL + 'toDos';
  //   return this.http.post<IToDo[]>(url, toDo);
  // }
  // }
  // public deleteToDo(toDoid) {
  //   return this.http.delete(`${this.SERVER_URL + 'toDos'}/${toDoid}`)
  // }
  // public updateToDo(toDo: { id: number, text: string }) {
  //   return this.http.put(`${this.SERVER_URL + 'toDos'}/${toDo.id}`, toDo)
  // }

}
