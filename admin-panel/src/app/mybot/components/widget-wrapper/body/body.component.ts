import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mybot-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  msgs = ["","","","","","","","","",""]
  constructor() { }

  ngOnInit(): void {
  }

  ngStyleBot(){
    let style = this.ngStyle();
    return {
      ...style,
      "border-radius": "0px 8px 8px 8px"
    }
  }
  ngStyleUser(){
    let style = this.ngStyle();
    return {
      ...style,
      "border-radius": "8px 0px 8px 8px"
    }
  }
  ngStyle(){
    return {
      'color' : "white",
      "background-color": "rgb(0, 164, 189)"
    }
  }

}
