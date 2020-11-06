import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ISearch } from '../interface/search';

@Component({
  selector: 'app-app-search-filter',
  templateUrl: './app-search-filter.component.html',
  styleUrls: ['./app-search-filter.component.css']
})
export class AppSearchFilterComponent implements OnInit {

  selectedPlayer:number;
 
  @Output() ageEvent = new EventEmitter<ISearch>();
  @Output() search = new EventEmitter<String>();


  searchPlayer: ISearch[] = [
    {id:1, ageFrom: 15, ageTo: 21},
    {id:2, ageFrom: 22, ageTo: 24},
    {id:3, ageFrom: 25, ageTo: 27},
    {id:4, ageFrom: 28, ageTo: 30}
  ];

  // private _listFilter: string;
  // get listFilter(): string{
  //   return this._listFilter;
  // }
  // set listFilter(value: string){
  //   this._listFilter = value;
  //   this.search.emit(value);
  // }

  constructor() { }

  ngOnInit(): void {
  }

  selectAge(event) {
    //ako je odabrao neki od elemenata dropdowna POSTOJI ID a ako je OČISTIO onda nema ID
    this.ageEvent.emit(event)
  }

  filter(event){
    console.log('derište',event)
    this.search.emit(event)
  }

  // listFilter(event){
  //   this.valueChange.emit(event)
  // }

}
