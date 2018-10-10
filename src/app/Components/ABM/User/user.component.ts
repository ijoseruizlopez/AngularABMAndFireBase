import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: User;
  id:string;
  actionComplete:boolean=false;


//Formulario con la estructura del Json que necesitamos
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

  //router para recuperar los parametros
  //route para poder navegar
  constructor(private router: ActivatedRoute, private route: Router, public firestoreService: FirestoreService) {

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

  //Metodo auxiliar para  poder setear los combos con objetos
  compareObjects(o1: any, o2: any) {
    if(o1.Description == o2.Description && o1.Id == o2.Id )
    return true;
    else return false;
  }


  ngOnInit() {
    this.GetRegions();
    this.GetGeneros();
    this.router.params.subscribe( params => {
      this.id=params.Id;
      this.action=params.Action;}
      );

      if(this.action=="C" || this.action=="B")
      {
        this.editable=false;
      }
       
      if(this.action!="A")
        this.GetUser(this.id);     
  }

  Save(){
    if(this.userForm.valid) {
      this.user = this.userForm.value;
      this.user.FechaNacimiento = this.userForm.value.FechaNacimiento.toLocaleDateString();
      
      if(this.action=="M")
      {
        this.firestoreService.UpdateUser(this.id, this.user).then(() =>{         
          this.actionComplete=true;
          this.editable=false; });
      }

      else{
        this.firestoreService.CreateUser(this.user).then(() =>{  
          this.actionComplete=true;
          this.editable=false;
          });
      }

      }else{
        alert("Campos incompletos o invalidos");
      }
  }

  Cancel(){
    this.route.navigate(['/Consulta']);
  }

  Delete(){
    this.firestoreService.deleteCat(this.id).then(() => {
      this.actionComplete=true;
      this.editable=false;
    });
  }

  GetUser(documentId){
    let editSubscribe = this.firestoreService.GetUser(documentId).subscribe((userData) => {
      var data = <User>userData.payload.data();
      var partsDate =data.FechaNacimiento.toString().split('/');
      this.userForm.setValue({
        Id : documentId,
        Nick : data.Nick,
        FechaNacimiento : new Date(parseInt(partsDate[2]), parseInt(partsDate[1])-1, parseInt(partsDate[0])),
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
