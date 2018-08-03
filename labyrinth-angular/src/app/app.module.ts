import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlockComponent } from './block/block.component';
import { BlockContainerComponent } from './block-container/block-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    BlockContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
