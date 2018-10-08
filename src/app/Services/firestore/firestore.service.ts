import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo user
  public CreateUser(data: {Id:number,Nick: string; Region: Object; FechaNacimiento:string; EMail: string; Genero: Object;Roles:Object[]}) {
    return this.firestore.collection('users').add(data);
  }
  //Obtiene un user
  public GetUser(id: number) {
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }
  //Obtiene todos los users
  public GetUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  //Actualiza un user
  public UpdateUser(id: number, data: any) {
    return this.firestore.collection('users').doc(id).set(data);
  }
}