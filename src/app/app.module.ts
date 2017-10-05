import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app';
import {MyDirective} from './mainPanelComponent/mainPanel';

@NgModule({
    declarations: [
        AppComponent,
        MyDirective,
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
