import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EChartOption } from 'echarts';
import * as moment from 'moment';
import * as echarts from 'echarts/lib/echarts';
import { graphic } from 'echarts';
@Component({
  selector: 'app-model-predict',
  templateUrl: './model-predict.component.html',
  styleUrls: ['./model-predict.component.scss']
})
export class ModelPredictComponent implements OnInit {
  public waterParam = "PH";
  public model = "SVR";
  public chartOption: EChartOption;
  public initOptions;
  public step = 4;
  public marklines = {
    PH: {
      symbol: "none",               //去掉警戒线最后面的箭头
      label: {
        formatter: "最低PH值为7.5",
        position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
      },
      data: [{
        lineStyle: {               //警戒线的样式  ，虚实  颜色
          type: "solid",
          color: "#FA3934",
        },
        yAxis: 7.8         // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
      }]
    }
  }
  public alertWords = "7.8~8.5，同时不超出该海域正常变动范围的0.2PH单位"
  constructor(
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await this.predict()
  }


  selParams(event: any) {
    console.log(event)
    this.waterParam = event;
  }

  selModel(event: any) {
    console.log(event)
    this.model = event;
  }

  async predict() {
    if(this.waterParam === "PH"){
      this.alertWords = "PH: 7.8~8.5，同时不超出该海域正常变动范围的0.2PH单位"
    }else if (this.waterParam === "DO"){
      this.alertWords = "DO: 应大于6"
    }else if (this.waterParam === "CODMn"){
      this.alertWords = "CODMn: 应小于等于2"
    }else if (this.waterParam === "NH3_N"){
      this.alertWords = "NH3-N: 应小与等于0.2"
    }
    // 暂时默认使用SVR，后期加入其他模型再更改即可
    // 默认预测后59个数据
    const res = await this.http.get(`http://localhost:8000/model/train?param=${this.waterParam}&model=${this.model}&step=${this.step}`).toPromise()
    if (res["err"] === 0) {
      // 预测数据格式调整
      let predict_data = [res["data"]["train_data"][res["data"]["train_data"].length - 1], ...res["data"]["last_predict"]];
      for (let i = 0; i < res["data"]["train_data"].length - 1; i++) {
        predict_data.unshift("-");
      }
      let extendTime = ["2018-12-31", "2019-01-07", "2019-01-14", "2019-01-21", "2019-01-28", "2019-02-04", "2019-02-11", "2019-02-18", "2019-02-25", "2019-03-04", "2019-03-11", "2019-03-18", "2019-03-25"];
      this.initOptions = {
        height: "580px",
        width: "1100px"
      }
      this.chartOption = {
        legend: {
          data: ['预测值', '真实值'],
          align: 'left'
        },
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
          // data: [...res["data"]["train_time"], "2018-12-31", "2019-01-07", "2019-01-14", "2019-01-21"],
          data: [...res["data"]["train_time"], ...extendTime.slice(0, this.step)],

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
            // if (value.min < 7.8) {
            //   return Number((value.min + 0.5).toFixed(2));
            // }else{
            //   return Number(7.8);
            // }
            return Number((value.max + 0.5).toFixed(2));

          },
          max: function (value) {
            // if (value.max > 8.5) {
            //   return Number((value.max + 0.5).toFixed(2));
            // }else{
            //   return 8.5;
            // }
            return Number((value.max + 0.5).toFixed(2));
          }
        },
        series: [{
          data: res["data"]["train_data"],
          name: '历史数据',
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
        },
        {
          data: predict_data,
          name: '预测值',
          type: 'line',
          symbol: 'triangle',
          symbolSize: 8,
          lineStyle: {
            type: 'dashed'
          },
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
        }
        ]
      }
    }

  }

}
