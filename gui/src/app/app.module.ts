import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'users', component: UsersListComponent },
      { path: 'homePage', component: HomePageComponent },
      { path: '', redirectTo: 'homePage', pathMatch: 'full' },
      { path: '**', redirectTo: 'homePage', pathMatch: 'full' }      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
