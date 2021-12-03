import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AlliedsComponent } from './components/allieds/allieds.component';
import { ClientsComponent } from './components/clients/clients.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'allieds', component: AlliedsComponent, canActivate: [AuthGuard] },
  { path: '**', component: Error404Component, canActivate: [AuthGuard] },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(appRoutes);
