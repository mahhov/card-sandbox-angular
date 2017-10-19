import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from "./app";
import {Editor} from "./editorComponent/editor";
import {MainPanel} from "./mainPanelComponent/mainPanel";
import {TableCanvas} from "./tableCanvasComponent/tableCanvas";


@NgModule({
    declarations: [
        AppComponent,
        MainPanel,
        TableCanvas,
        Editor
    ],
    imports: [BrowserModule, NgbModule.forRoot(), FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}