import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } from '../app.routing';

import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    Error404Component,
    ProjectsComponent,
    LoginComponent,
    TeamComponent,
    TopbarComponent,
    NavbarComponent,
    TableComponent,
  ],
  exports: [
    Error404Component,
    ProjectsComponent,
    LoginComponent,
    TeamComponent,
    TopbarComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, routing, ReactiveFormsModule, HttpClientModule],
  providers: [appRoutingProviders],
})
export class ComponentsModule {}
