import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ModelsModule } from './models/models.module';
import { UniversalComponentsModule } from './shared/universal-components.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './layout/login/login.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ModelsModule,
    UniversalComponentsModule,
    HttpClientModule,
    AmplifyAngularModule,
    FormsModule
  ],
  providers: [ AmplifyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
