import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlockContainerComponent } from './block-container/block-container.component';
import { PointComponent } from './components/point/point.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockContainerComponent,
    PointComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
