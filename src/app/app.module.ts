import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { HeaderComponent } from './Components/Common/header/header.component';
import { FooterComponent } from './Components/Common/footer/footer.component';
import { MenuComponent } from './Components/Common/menu/menu.component';
import { UserComponent } from './Components/ABM/user/user.component';
import { UserQueryComponent } from './Components/ABM/user/userQuery.component';

import { RouterModule, Route } from '@angular/router';
import { ActionMenuComponent } from './Components/ABM/action-menu/action-menu.component';

//Importamos el Modulo para hacer el bindeo con formularios
import { FormsModule, FormControlDirective, FormGroupDirective, ReactiveFormsModule} from '@angular/forms'

//Fire Base
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';


const routes: Route[]=[
  {path:'ABM/:Action/:Id' , component:UserComponent},
  {path:'Consulta' , component:UserQueryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    UserComponent,
    UserQueryComponent,
    ActionMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), //Importamos las rutas navegables
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports : [ReactiveFormsModule],
  providers: [AngularFirestore, FormControlDirective, FormGroupDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
