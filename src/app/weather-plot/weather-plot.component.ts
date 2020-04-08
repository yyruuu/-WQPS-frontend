import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EChartOption } from 'echarts';
import * as moment from 'moment';
import * as echarts from 'echarts/lib/echarts';
import { graphic } from 'echarts';
@Component({
  selector: 'app-weather-plot',
  templateUrl: './weather-plot.component.html',
  styleUrls: ['./weather-plot.component.scss']
})
export class WeatherPlotComponent implements OnInit {
  public weatherParam = "T";
  public timeInter = "all";
  public chartOption: EChartOption;
  public initOptions;
  constructor(
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await this.plotData()
  }

  selParams(event: any) {
    this.weatherParam = event;
  }

  selTime(event: any) {
    this.timeInter = event;
  }

  //请求绘图数据
  async plotData() {
    const res = await this.http.get(`http://localhost:8000/weather/plot?param=${this.weatherParam}&interval=${this.timeInter}`).toPromise()
    if (res["err"] === 0) {
      this.initOptions = {
        height: "600px",
        width: "1100px"
      }
      this.chartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: res["data"][0],
          axisLabel: {
            formatter: (function (value) {
              return moment(value).format('YYYY-MM-DD');
            }),
          },
        },
        yAxis: {
          type: 'value',
          min: function (value) {
            return Number((value.min - 0.5).toFixed(2));
          },
          max: function (value) {
            return Number((value.max + 0.5).toFixed(2));
          }
        },
        series: [{
          data: res["data"][1],
          type: 'line',
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(
                1, 0, 0, 0,
                [
                  { offset: 0, color: '#2c7eab' },
                  { offset: 0.7, color: '#50a8fb' },
                  { offset: 1, color: '#50a8fb' }
                ]
              )
            },
          }
        }]
      }
    }
  }

}
