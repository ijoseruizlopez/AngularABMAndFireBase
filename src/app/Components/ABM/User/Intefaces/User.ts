import { FormControl, Validators } from "@angular/forms";

export interface User {
    Id:string,
    Nick: string;
    Region: Object;
    FechaNacimiento:Date;
    EMail: string;
    Genero: Object;
    Roles:Object[]
  }