import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {

  constructor(
    private router:Router
  ){}

  ngOnInit(){}

  navigateToChart(): void{
    this.router.navigate(["home/charts"]);
  }

  title = 'graf-app';
  backgroundUrl="../../assets/images/DSC_0326.jpg";
}





