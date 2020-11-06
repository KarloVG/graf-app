import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import { ModalChartComponent } from './modal-chart/modal-chart.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalPdfComponent } from './modal-pdf/modal-pdf.component';
import { AppSearchFilterComponent } from '../app-search-filter/app-search-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, NgModel } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [ChartComponent, ModalChartComponent, ModalPdfComponent,AppSearchFilterComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    ChartsModule,
    PdfViewerModule,
    NgSelectModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [ModalChartComponent, ModalPdfComponent],
  exports: [ChartRoutingModule, ChartsModule, PdfViewerModule]
})
export class ChartModule { }
platformBrowserDynamic().bootstrapModule(ChartModule);