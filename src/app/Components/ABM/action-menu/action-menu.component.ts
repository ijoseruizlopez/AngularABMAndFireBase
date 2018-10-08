import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit {

  @Input() urlRedirect:string;
  @Input() parametros:string[];
  
  constructor(private router: Router) { 

  }

  ngOnInit() {
  }

  redirect(action:string){

    this.urlRedirect+="/"+action

    this.parametros.forEach(element => {
      this.urlRedirect+="/"
      this.urlRedirect += element;
    });

    this.router.navigate(['/'+ this.urlRedirect]);
  } 
}
