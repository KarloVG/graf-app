import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { ChartsModule, Label } from 'ng2-charts';

@Component({
  selector: 'app-modal-chart',
  templateUrl: './modal-chart.component.html',
  styleUrls: ['./modal-chart.component.css']
})
export class ModalChartComponent implements OnInit {

  
  @Input() fowPlayer;
  radarChartData: ChartDataSets[] = [
    { data: [], label: 'Employee Skill Analysis' }
  ];

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.fowPlayer)
    this.radarChartData = [{data: this.fowPlayer.chart, label: this.fowPlayer.name}]
    
  };

  modalDismiss(): void {
    sessionStorage.removeItem('player');
    this.activeModal.dismiss('Cross click');
  }

  radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  radarChartLabels: Label[] = ['Vision', 'Dribbling','Shot Power','Acceleration','Ball Control'];

  
  radarChartType: ChartType = 'radar';

}
