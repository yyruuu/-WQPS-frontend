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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: WaterDataComponent
      },
      {
        path: 'water-plot',
        component: WaterPlotComponent
      },
      {
        path: 'weather',
        component: WeatherDataComponent
      },
      {
        path: 'weather-plot',
        component: WeatherPlotComponent
      },
      {
        path: 'user-admin',
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
