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
  public marklines = {
    PH: {
      symbol: "none",               //去掉警戒线最后面的箭头
      label: {
        // formatter: "最低PH值",
        position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
      },
      data: [{
        name: "最低PH值",
        lineStyle: {               //警戒线的样式  ，虚实  颜色
          type: "solid",
          color: "#FA3934",
        },
        yAxis: 7.8       // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
      },
      {
        silent: false,             //鼠标悬停事件  true没有，false有
        name: "最高PH值",
        lineStyle: {               //警戒线的样式  ，虚实  颜色
          type: "solid",
          color: "#FA3934",
        },
        yAxis: 8.5       // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
      }
    ]
    },
    DO: {
      symbol: "none",               //去掉警戒线最后面的箭头
      label: {
        formatter: ">6",
        position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
      },
      data: [{
        // name: ">6",
        lineStyle: {               //警戒线的样式  ，虚实  颜色
          type: "solid",
          color: "#FA3934",
        },
        yAxis: 6       // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
      },
    ]
    },
    CODMn: {
      symbol: "none",               //去掉警戒线最后面的箭头
      label: {
        formatter: "<=2",
        position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
      },
      data: [{
        lineStyle: {               //警戒线的样式  ，虚实  颜色
          type: "solid",
          color: "#FA3934",
        },
        yAxis: 2       // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
      },
    ]
    },
    NH3_N: {
      symbol: "none",               //去掉警戒线最后面的箭头
      label: {
        formatter: "<=0.2",
        position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
      },
      data: [{
        lineStyle: {               //警戒线的样式  ，虚实  颜色
          type: "solid",
          color: "#FA3934",
        },
        yAxis: 0.2      // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
      }
    ]
    }
  }
  public marklineRange = this.marklines.PH;
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
    // 暂时默认使用SVR，后期加入其他模型再更改即可
    // 默认预测后59个数据
    const res = await this.http.get(`http://localhost:8000/model/train?param=${this.waterParam}&model=${this.model}`).toPromise()
    if (res["err"] === 0) {
      // 预测数据格式调整
      let predict_data = [res["data"]["train_data"][res["data"]["train_data"].length - 1], ...res["data"]["last_predict"]];
      for (let i = 0; i < res["data"]["train_data"].length - 1; i++) {
        predict_data.unshift("-");
      }
      this.marklineRange = this.marklines[this.waterParam]
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
          data: [...res["data"]["train_time"], "2018-12-31", "2019-01-07", "2019-01-14", "2019-01-21"],
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
          // markLine: this.marklineRange,
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
