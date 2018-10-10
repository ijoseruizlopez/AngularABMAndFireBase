import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/Services/firestore/firestore.service';

@Component({
  selector: 'app-user-query',
  templateUrl: './user-query.component.html',
  styleUrls: ['./user-query.component.css']
})
export class UserQueryComponent implements OnInit {

  displayedColumns: string[] = ['Nick', 'Region', 'E-mail', 'Genero','Accion'];
  public dataSource =[];
  constructor(private firestoreService: FirestoreService) { 

  }

  ngOnInit() {

    this.firestoreService.GetUsers().subscribe((usersSnapshot) => {
     
      this.dataSource = [];
      usersSnapshot.forEach((userData: any) => {
        this.dataSource.push({
          Id: userData.payload.doc.id,
          Nick: userData.payload.doc.data().Nick,
          FechaNacimiento: userData.payload.doc.data().FechaNacimiento,
          EMail:userData.payload.doc.data().EMail,
          Genero:userData.payload.doc.data().Genero,
          Roles:userData.payload.doc.data().Roles,
          Region:userData.payload.doc.data().Region
        });
      })
    });
    
  }
}
