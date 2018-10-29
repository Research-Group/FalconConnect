import { ClassesComponent } from './../classes/classes.component';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { app } from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {
  events = [];
  opened = [];
  say = 'hello';
  public loadComponent = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
open() {


}

loadMyChildComponent() {
   this.loadComponent = true;
}

}
