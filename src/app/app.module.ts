import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { ElModule } from 'element-angular';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { WeatherDataComponent } from './weather-data/weather-data.component';
import { WaterDataComponent } from './water-data/water-data.component'
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { WaterPlotComponent } from './water-plot/water-plot.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { WeatherPlotComponent } from './weather-plot/weather-plot.component';
import { ModelTrainComponent } from './model-train/model-train.component';
import { ModelPredictComponent } from './model-predict/model-predict.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    LeftNavComponent,
    WeatherDataComponent,
    WaterDataComponent,
    UserAdminComponent,
    WaterPlotComponent,
    WeatherPlotComponent,
    ModelTrainComponent,
    ModelPredictComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    NgxEchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
