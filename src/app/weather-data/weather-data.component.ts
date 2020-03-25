import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
interface WeatherData {
  id?: number;
  T?: number;
  Po?: number;
  P?: number;
  U?: number;
  Ff?: number;
  VV?: number;
  Td?: number;
  RRR?: number;
  time?: Date;
}
@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss']
})
export class WeatherDataComponent implements OnInit {
  public datas = [];
  public pageNation = {
    pageSize: 10,
    offset: 1,
    totalRecords: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  };
  modalRef: BsModalRef;
  public currId = null;
  public currData: WeatherData = {} as WeatherData;
  public addStatus = 0;
  constructor(
    public http: HttpClient,
    private modalService: BsModalService,
  ) { }

  async ngOnInit() {
    await this.getDatas();
  }

  async getDatas() {
    const res = await this.http.get(`http://localhost:8000/weather/data?offset=${this.pageNation.offset}&num=${this.pageNation.pageSize}`).toPromise();
    console.log(res);
    if (res["err"] === 0) {
      this.datas = JSON.parse(res["data"].results);
      this.pageNation.totalRecords = res["data"].total_records;
      this.pageNation.totalPages = res["data"].total_pages;
      this.pageNation.offset = res["data"].page;
      this.pageNation.hasNext = res["data"].has_next;
      this.pageNation.hasPrev = res["data"].has_prev;
    }
  }

  async getAData(id) {
    const res = await this.http.get(`http://localhost:8000/weather/data/${id}`).toPromise();
    if (res["err"] === 0) {
      this.currData = res["data"];
    }
  }

  async pageChange(event: any) {
    this.pageNation.offset = event
    await this.getDatas();
  }

  async refresh() {
    if (this.currId === 0) {
      //新增数据
      const res = await this.http.post(`http://localhost:8000/weather/add`, { ...this.currData }).toPromise();
      if (res["err"] === 0) {
        this.addStatus = 1;
        this.pageChange(this.pageNation.offset)
        this.modalRef.hide()
      } else {
        this.addStatus = 2;
      }
    } else {
      //编辑气象数据
      this.currData.id = this.currId;
      const res = await this.http.post(`http://localhost:8000/weather/edit`, { ...this.currData }).toPromise();
      if (res["err"] === 0) {
        this.addStatus = 3
        this.pageChange(this.pageNation.offset)
        this.modalRef.hide()
      } else {
        this.addStatus = 4;
      }
    }
  }

  async deleteData() {
    const res = await this.http.get(`http://localhost:8000/weather/delete/${this.currId}`).toPromise();
    if(res["err"] === 0){
      this.addStatus = 5;
      this.pageChange(this.pageNation.offset)
      this.modalRef.hide();
    }else{
      this.addStatus = 6;
    }
  }

  async editModal(template: TemplateRef<any>, id) {
    this.addStatus = 0;
    if (id === 0) {
      //新增数据
      this.currId = 0;
      this.currData = {} as WeatherData;
      this.modalRef = this.modalService.show(template);
    } else {
      this.currId = id;
      await this.getAData(id);
      this.modalRef = this.modalService.show(template);
    }
  }

  deleteModal(template: TemplateRef<any>, id) {
    this.addStatus = 0;
    this.currId = id;
    this.modalRef = this.modalService.show(template);
  }

  async addData(template: TemplateRef<any>) {
    await this.editModal(template, 0)
  }

}
