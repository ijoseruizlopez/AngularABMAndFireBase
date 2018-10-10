import { FormControl, Validators } from "@angular/forms";

export interface User {
    Id:string,
    Nick: string;
    Region: Object;
    FechaNacimiento:string;
    EMail: string;
    Genero: Object;
    Roles:boolean[]
  }