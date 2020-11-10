import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IToDo } from './interface/to-do';
import { idText } from 'typescript';
import { FormGroup } from '@angular/forms';


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
  createToDo(toDo: { id: number, text: string }): Observable<IToDo> {
    const url = `${this.SERVER_URL}toDos`; // this.SERVER_URL +  'toDos' oznaka $ prebaci u string(this.SERVER_URL)todoS
    return this.http.post<IToDo>(url, toDo)
  }
  // createToDo(): Observable<IToDo[]>{
  //   const url = this.SERVER_URL + 'toDos';
  //   return this.http.post<IToDo[]>(url, toDo);
  // }

  // updateToDo(toDo: {id: number, text: string}): Observable<IToDo>{
  //   const url = `${this.SERVER_URL}toDos`;
  //   return this.http.put<IToDo>(url, toDo)
  // }
  // }
  deleteToDo(toDoid) {
    return this.http.delete(`${this.SERVER_URL + 'toDos'}/${toDoid}`)
  }
  updateToDo(toDo: { id: number, text: string }) {
    return this.http.put(`${this.SERVER_URL + 'toDos'}/${toDo.id}`, toDo)
  }

}
