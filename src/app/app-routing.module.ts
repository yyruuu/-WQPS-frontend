import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { WeatherDataComponent } from './weather-data/weather-data.component';
import { WaterDataComponent } from './water-data/water-data.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { WaterPlotComponent } from './water-plot/water-plot.component';
import { WeatherPlotComponent } from './weather-plot/weather-plot.component';
import { ModelTrainComponent } from './model-train/model-train.component';
import { ModelPredictComponent } from './model-predict/model-predict.component';
import { LoginGuardGuard } from './auth/login-guard.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: WaterPlotComponent
      },
      {
        path: 'water',
        canActivate: [LoginGuardGuard],
        component: WaterDataComponent
      },
      {
        path: 'water-plot',
        component: WaterPlotComponent
      },
      {
        path: 'weather',
        canActivate: [LoginGuardGuard],
        component: WeatherDataComponent
      },
      {
        path: 'weather-plot',
        component: WeatherPlotComponent
      },
      {
        path: 'model-train',
        component: ModelTrainComponent
      },
      {
        path: 'model-predict',
        component: ModelPredictComponent
      },
      {
        path: 'user-admin',
        canActivate: [LoginGuardGuard],
        component: UserAdminComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
