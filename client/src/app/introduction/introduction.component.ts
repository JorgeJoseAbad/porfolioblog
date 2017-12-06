import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor(private session:SessionsService) { }

  ngOnInit() {
  }

}
