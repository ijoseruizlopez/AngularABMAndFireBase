import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/Services/firestore/firestore.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { User } from './Intefaces/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  action:string;
  editable: boolean = true;
  id:string;

  public userForm =  new FormGroup({
    Id: new FormControl('1'),
    Nick: new FormControl(''),
    Region: new FormControl({Id:0, Description:''}),
    FechaNacimiento: new FormControl(new Date()),
    EMail: new FormControl(''),
    Genero: new FormControl({Id:0, Description:''}),
    Roles:  new FormArray([new FormControl(false),
                            new FormControl(false), 
                            new FormControl(false),
                            new FormControl(false),
                            new FormControl(false)])
  });

  public regions =[];
  public generos =[];

  constructor(private router: ActivatedRoute, public firestoreService: FirestoreService) {

    this.userForm.setValue({
      Id: '',
      Nick: '',
      Region: {Id:1, Description:''},
      FechaNacimiento: '',
      EMail: '',
      Genero: {Id:1, Description:''},
      Roles: [false, false, false,false,false]
    });

  }

  compareObjects(o1: any, o2: any) {
    if(o1.Description == o2.Description && o1.Id == o2.Id )
    return true;
    else return false
  }


  ngOnInit() {
    this.GetRegions();
    this.GetGeneros();
    this.router.params.subscribe( params => {
      this.id=params.Id;
      this.action=params.Action;}
      );

      if(this.action=="C")
        this.editable=false;
      if(this.action!="A")
        this.GetUser(this.id);
	

         
  }
  Save(){
    console.log(this.userForm.value);
    console.log(this.userForm.value.FechaNacimiento.toLocaleDateString());
  }

  Cancel(){
  }

  GetUser(documentId){
    let editSubscribe = this.firestoreService.GetUser(documentId).subscribe((userData) => {
      var data = <User>userData.payload.data();
      var partsDate =data.FechaNacimiento.toString().split('/');
      this.userForm.setValue({
        Id : documentId,
        Nick : data.Nick,
        FechaNacimiento : new Date(parseInt(partsDate[2]), parseInt(partsDate[1]), parseInt(partsDate[0])),
        EMail: data.EMail,
        Genero : data.Genero,
        Roles : data.Roles,
        Region : data.Region
      });
      editSubscribe.unsubscribe();
    });
  }


  GetRegions()
  {
    this.firestoreService.GetRegions().subscribe((regionSnapshot) => { 
    this.regions = [];
      regionSnapshot.forEach((regionData: any) => {
        this.regions.push({ 
          Id: regionData.payload.doc.data().Id,
          Description: regionData.payload.doc.data().Description
        });
      })
    });
  }


  GetGeneros()
  {
    this.firestoreService.GetGeneros().subscribe((generosSnapshot) => {     
    this.generos = [];     
      generosSnapshot.forEach((generoData: any) => {
        this.generos.push({
          Id: generoData.payload.doc.data().Id,
          Description: generoData.payload.doc.data().Description
        });
      })
    });
  }

}