import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EChartOption } from 'echarts';
import * as moment from 'moment';
import * as echarts from 'echarts/lib/echarts';
import { graphic } from 'echarts';
@Component({
  selector: 'app-model-train',
  templateUrl: './model-train.component.html',
  styleUrls: ['./model-train.component.scss']
})
export class ModelTrainComponent implements OnInit {
  public waterParam = "PH";
  public model = "SVR";
  public chartOption: EChartOption;
  public initOptions;
  constructor(
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await this.train()
  }

  selParams(event: any) {
    console.log(event)
    this.waterParam = event;
  }

  selModel(event: any) {
    console.log(event)
    this.model = event;
  }

  async train(){
    // 暂时默认使用SVR，后期加入其他模型再更改即可
    // 默认预测后59个数据
    const res = await this.http.get(`http://localhost:8000/model/train?param=${this.waterParam}`).toPromise()
    if(res["err"] === 0){
      this.initOptions = {
        height: "580px",
        width: "1100px"
      }
      this.chartOption = {
        legend: {
          data: ['预测值', '真实值'],
          align: 'left'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: res["data"]["time"],
          axisLabel: {
            formatter: (function (value) {
              return moment(value).format('YYYY-MM-DD');
            }),
          },
        },
        yAxis: {
          type: 'value',
          // boundaryGap: [Math.min(res["data"][1]) - 1, Math.max(res["data"][1]) + 1]
          min: function (value) {
            return (value.min - 0.5).toFixed(2);
          },
          max: function (value) {
            return (value.max + 0.5).toFixed(2);
          }
        },
        series: [{
          data: res["data"]["predict"],
          name: '预测值',
          type: 'line',
          itemStyle: {
            normal: {
              color: new graphic.LinearGradient(
                1, 0, 0, 0,
                [
                  { offset: 0, color: '#b12a5b' },
                  { offset: 0.7, color: '#f99185' },
                  { offset: 1, color: '#ff8177' }
                ]
              )
            },
          }
        },
        {
          data: res["data"]["true"],
          name: '真实值',
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
        }
      ]
      }
    }

  }
}
