import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ModelsModule } from './models/models.module';
import { UniversalComponentsModule } from './shared/universal-components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ModelsModule,
    UniversalComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
