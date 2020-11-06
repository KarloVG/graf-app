
import { componentFactoryName } from '@angular/compiler';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';

import { IPlayer } from '../interface/player';
import { ISearch } from '../interface/search';
import { PLAYERS } from '../models/player-model';
import { ModalChartComponent } from './modal-chart/modal-chart.component';
import { ModalPdfComponent } from './modal-pdf/modal-pdf.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit{
  
  //@ViewChild(AppSearchFilterComponent)filterComponent: AppSearchFilterComponent;
  parentListFilter: string;
  players = PLAYERS; // napravili smo kopiju arraya - > zaobilazimo "by reference"
  selectedAge: ISearch;
  initialPlayers = PLAYERS; // napravili smo kopiju arraya - > zaobilazimo "by reference"
  storageId: string;
  ply:any;

  constructor(
    private modalService: NgbModal
  ) { }

  ngAfterViewInit():void{
    const hasToken = sessionStorage.getItem('player');
    if(hasToken){
      const mod = this.modalService.open(ModalChartComponent, {size:'xl', backdrop:'static'});
      mod.componentInstance.fowPlayer = JSON.parse(hasToken);
    }
  }

  recievedAge(event) {
    console.log('parent',event)
    if(event && event.id) {
      // odabrao neko razdoblje i tada moramo filtrirati igrače prema tom razdoblju

      // hvatamo event
      this.selectedAge = event;
      // tu ide filter

      // .filter metoda - this.players.filter(player) -- ide od prvog elementa u arrayu i za svaki element radi logiku
      this.players = this.players.filter((player) => player.age >= this.selectedAge.ageFrom  && player.age <= this.selectedAge.ageTo);
    } else {
      // klik "clear" na dropdownu - vrati sve na inicijalni prikaz
      this.players = this.initialPlayers;
    }
    
  }


  ngOnInit(): void {
  }



  openModal(player: IPlayer): void {
    const modal = this.modalService.open(ModalChartComponent, {size:'xl', backdrop:'static'});
    modal.componentInstance.fowPlayer = player;
    sessionStorage.setItem('player', JSON.stringify(player));
  }

  openModalPdf():void{
    const modal = this.modalService.open(ModalPdfComponent, {size:'xl', backdrop:'static'});
  }

  // onValueChange(filterBy?: string): void {
  //   if (filterBy) {
  //     this.filteredPlayers = this.players.filter((player: IPlayer) =>
  //       player.name.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
  //   } else {
  //     this.filteredPlayers = this.players;
  //   }
  // }

  onValueChange(event?){
    console.log(event)
    if(event.target.value) {
      let searchVal = event.target.value.toLowerCase();
      let colsAmt = 6;
      let keys = Object.keys(this.initialPlayers[0]);
   
      this.players = this.players.filter(function (item) {
        for (let i = 0; i < colsAmt; i++) {
          if (item[keys[i]] != null && item[keys[i]].toString().toLowerCase().indexOf(searchVal) !== -1 || !searchVal) {
            return true;
          }
        }
      })
    } else {
      this.players = this.initialPlayers;
    }
  }


  // onValueChange(event): IPlayer[] {
  //   event = event.toLocaleLowerCase();
  //   return this.players.filter((product: IPlayer) =>
  //     product.name.toLocaleLowerCase().indexOf(event) !== -1);
  // }

  // onValueChange(data){
  //   this.selectedPlayer = this.selectedPlayer
  //   console.log(data)
  //   if(data){
  //     this.selectedPlayer = this.selectedPlayer.filter(function(ele, i, array){
  //       let arrayelement = ele.name.toLowerCase()
  //       return arrayelement.includes(data)
  //     })
  //   }
  //   else{
  //     console.log(this.selectedPlayer)
  //   }
  //   console.log(this.selectedPlayer)
  // }
}

