import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
import { HomeModule } from './home/home.module';
import { ChartModule } from './chart/chart.module';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoModule } from './to-do/to-do.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => HomeModule
  },
  {
    path: 'charts',
    component: ChartComponent,
    loadChildren: () => ChartModule
  },
  {
    path: 'to-do',
    component: ToDoComponent,
    loadChildren: () => ToDoModule
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
