import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersListComponent, AddUserDialog } from './users/users-list.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UsersListComponent,
    AddUserDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
     
      { path: 'homePage', component: HomePageComponent },
      { path: 'users', component: UsersListComponent },
      { path: '', redirectTo: 'homePage', pathMatch: 'full' },
      { path: '**', redirectTo: 'homePage', pathMatch: 'full' }      
    ]),
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [AddUserDialog],
  bootstrap: [AppComponent],
  exports: [MatFormFieldModule]
})
export class AppModule { }
