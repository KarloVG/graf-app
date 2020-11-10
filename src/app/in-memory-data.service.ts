import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IToDo } from './interface/to-do';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const toDos = [
      { id:1, text: 'Dr Nice' },
      { id:2, text: 'Narco' },
      { id:3, text: 'Barco' },
      { id:4, text: 'Jarco' }
    ];
    return {toDos};
  }
  //     const ELEMENT_DATA: IToDo[] = [
  //     { id:1, text: 'Dr Nice' },
  //     { id:2, text: 'Narco' },
  //     { id:3, text: 'Barco' },
  //     { id:4, text: 'Jarco' }
  //   ];
  //   return {ELEMENT_DATA};
  // }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(toDos: IToDo[]): number {
  //   return toDos.length > 0 ? Math.max(...toDos.map(toDo => toDo.id)) + 1 : 11;
  // }
}