import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Modulos para angular material
import {MaterialModule} from './material'; //Creamos nuestro propio modulo para no sobrecargar el app.Module, ahi cargamos los componentes que vamos a suar
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Modulos para ruteo
import { RouterModule, Route } from '@angular/router';

//Componentes generales
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Common/header/header.component';
import { FooterComponent } from './Components/Common/footer/footer.component';
import { MenuComponent } from './Components/Common/menu/menu.component';

import { ActionMenuComponent } from './Components/ABM/action-menu/action-menu.component';

//Importamos el Modulo para hacer el bindeo con formularios
import { FormsModule, FormControlDirective, FormGroupDirective, ReactiveFormsModule} from '@angular/forms'

//Modulos y provedeodres para Fire Base
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';

import { UserQueryComponent } from './Components/ABM/user-query/user-query.component';
import { UserComponent } from './Components/ABM/user/user.component';


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
