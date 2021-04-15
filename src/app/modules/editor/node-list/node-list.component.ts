import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit {

  @Input() 
  node: any;

  constructor() { }

  ngOnInit(): void {
  }

}
