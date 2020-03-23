import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-water-plot',
  templateUrl: './water-plot.component.html',
  styleUrls: ['./water-plot.component.scss'],
})
export class WaterPlotComponent implements OnInit {
  public waterParam = "PH";
  public timeInter = "all";
  constructor() { }

  ngOnInit() {
  }

  selParams(event:any) {
    this.waterParam = event;
  }

  selTime(event: any){
    this.timeInter = event;
  }

}
