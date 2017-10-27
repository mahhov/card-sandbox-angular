import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppComponent} from "./app";
import {Editor} from "./editorComponent/editor";
import {ScriptEditorService} from "./layer/scriptEditorService";
import {ScriptRepostiory} from "./layer/scriptRepository";
import {MainPanel} from "./mainPanelComponent/mainPanel";
import {TableCanvas} from "./tableCanvasComponent/tableCanvas";

@NgModule({
    declarations: [
        AppComponent,
        MainPanel,
        TableCanvas,
        Editor
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        HttpClientModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ScriptEditorService,
        ScriptRepostiory
    ]
})

export class AppModule {
}