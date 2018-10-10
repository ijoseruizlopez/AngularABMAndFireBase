import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatToolbarModule,MatTableModule,MatRadioModule,MatSelectModule, MatInputModule,MatDatepickerModule, MatNativeDateModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatToolbarModule,MatTableModule,MatRadioModule,MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, //debemos establecer el proveedor para el calendario
  ]
})
export class MaterialModule { }