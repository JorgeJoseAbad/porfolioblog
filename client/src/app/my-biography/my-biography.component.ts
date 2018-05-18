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
  responseUrl: any;
  responseBody: any;
  doc: any;

  parser = new DOMParser();
  documentBody=document.getElementsByTagName('body')[0];
  documentifUser: any;
  documentOption: any;


  constructor(public session:SessionsService, public biography:MyBiographyService) { }

  ngOnInit() {

    this.userName=this.session.user.username;
    console.log(this.userName);
    this.biography.getBiography(this.userName)
     .subscribe((response)=>{
       console.log(response.text())
       console.log(response.url);

       this.responseUrl=response.url;

       this.responseBody=this.parser.parseFromString(response.text(),
                "text/html").getElementsByClassName('text')[0];
       console.log(this.responseBody);
       console.log(this.documentBody);
       this.documentifUser=document.getElementById('ifuserexist');
       this.documentOption=document.getElementById('optionbio');
       console.log(this.documentOption);
       this.documentifUser.insertBefore(this.responseBody,this.documentOption);
       //this.documentBody.appendChild(this.responseBody);
       //this.rendermyPage(this.responseCode);
     });

  }

  // experimental funcion to render the url of a express html from getTemplate()
      renderMyBio(responseUrl){
        console.log("rendermyPage");
        console.log(responseUrl);
        //window.location.href=responseCode; //this load the url
        window.open(
            responseUrl,
           '_blank' // <- This is what makes it open in a new window.
          );
      };

}
