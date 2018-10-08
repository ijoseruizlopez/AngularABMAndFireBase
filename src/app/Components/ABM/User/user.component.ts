import { Component, OnInit } from '@angular/core';
import { Region } from './Intefaces/Region';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Components/ABM/User/Intefaces/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  action:string;
  editable: boolean = true;
  id:number;

  user:User;
  
  regions: Region[] = [
    {value: 'NA-0', viewValue: 'NA'},
    {value: 'LAN-1', viewValue: 'LAN'},
    {value: 'LAS-2', viewValue: 'LAS'}
  ];

  constructor(private router: ActivatedRoute) {
    this.user = { Id:-1, 
      Nick: '', 
      Region:{Id:1, Description:""},  
      FechaNacimiento: '', 
      EMail: '', 
      Genero:{Id:-1, Description:""}, 
      Roles:[false, false, false, false, false]};
  }

  ngOnInit() {

    this.router.params.subscribe( params => {
      this.id=params.Id;
      this.action=params.Action;}
      );

      if(this.action=="C")
        this.editable=false;
      if(this.action!="A")
        //Buscar datos En fire base
        this.user = { Id:1, 
          Nick: 'Pelito2', 
          Region:{Id:1, Description:"NA"},  
          FechaNacimiento: '21/07/1990', 
          EMail: 'jose_rl@live.com', 
          Genero:{Id:1, Description:""}, 
          Roles:[false, false, false, false, false]};
      
         
  }
  Save(){
    console.log(this.user);
  }

  Cancel(){
  }

}
