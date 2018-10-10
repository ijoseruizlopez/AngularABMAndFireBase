import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  //Crea un nuevo user
  public CreateUser(data: { Id: string, Nick: string; Region: Object; FechaNacimiento: string; EMail: string; Genero: Object; Roles: boolean[] }) {
    return this.firestore.collection('User').add(data);
  }
  //Obtiene un user
  public GetUser(id: string) {
    return this.firestore.collection('User').doc(id).snapshotChanges();;
  }
  //Obtiene todos los users
  public GetUsers() {
    return this.firestore.collection('User').snapshotChanges();
  }
  //Actualiza un user
  public UpdateUser(id: string, data: any) {
    return this.firestore.collection('User').doc(id).set(data);
  }

  public deleteCat(id: string) {
    return this.firestore.collection('User').doc(id).delete();
  }

  public GetRegions() {
    return this.firestore.collection('Region').snapshotChanges();
  }

  public GetGeneros() {
    return this.firestore.collection('Genero').snapshotChanges();
  }
}