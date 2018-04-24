import { Component, OnInit } from '@angular/core';
import {SessionsService} from '../services/sessions.service';
import {MyBiographyService} from '../services/my-biography.service';

@Component({
  selector: 'app-my-biography',
  templateUrl: './my-biography.component.html',
  styleUrls: ['./my-biography.component.css']
})
export class MyBiographyComponent implements OnInit {

  userName: string;

  constructor(public session:SessionsService, public biography:MyBiographyService) { }

  ngOnInit() {

    this.userName=this.session.user.username;
    console.log(this.userName);
    this.biography.getBiography(this.userName)
     .subscribe((response)=>{
       console.log("response",response);
       console.log(response.text())
     });

  }

}
