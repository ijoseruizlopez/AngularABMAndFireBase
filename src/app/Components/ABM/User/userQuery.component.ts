import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Components/ABM/User/Intefaces/User';


const ELEMENT_DATA2: User[] = [
  {Id: 1, Nick: 'Pelito', Region:{Id:1, Description:"NA"},  FechaNacimiento: '01/01/2018', EMail: 'pelito@gmail.com', Genero:{Id:1, Description:"Masculino"}, Roles:[true, false, true, true]},
  {Id: 2, Nick: 'Kikin', Region:{Id:2, Description:"LAN"}, FechaNacimiento: '02/01/2018',  EMail: 'Kikin@gmail.com', Genero:{Id:1, Description:"Masculino"}, Roles:[true, false, true, true]},
  {Id: 3, Nick: 'Puma', Region:{Id:3, Description:"LAS"} ,FechaNacimiento: '03/01/2018',  EMail: 'Puma@gmail.com', Genero:{Id:1, Description:"Masculino"}, Roles:[true, false, true, true]},
  {Id: 4, Nick: 'Tortita',  Region:{Id:1, Description:"NA"},  FechaNacimiento: '04/01/2018',EMail: 'Tortita@gmail.com', Genero:{Id:3, Description:"Otro"}, Roles:[true, false, true, true]},

];

@Component({
  selector: 'app-userQuery',
  templateUrl: './userQuery.component.html',
  styleUrls: ['./userQuery.component.css']
})


export class UserQueryComponent implements OnInit {
  displayedColumns: string[] = ['Nick', 'Region', 'E-mail', 'Genero','Accion'];
  dataSource = ELEMENT_DATA2;

  constructor() { 

  }

  ngOnInit() {

    this.firestoreService.getCats().subscribe((usersSnapshot) => {
      usersSnapshot.forEach((userData: any) => {
        this.dataSource.push({
          Id: userData.Id,
          Nick: userData.Nick,
          FechaNacimiento: userData.FechaNacimiento,
          EMail: userData.EMail,
          Genero:userData.Genero,
          Roles:userData.Roles
        });
  }

}
