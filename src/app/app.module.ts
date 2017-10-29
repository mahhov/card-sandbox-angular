import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppComponent} from "./app";
import {Editor} from "./editorComponent/editor";
import {ScriptEditorService} from "./layer/scriptEditorService";
import {ScriptRepostiory} from "./layer/scriptRepository";
import {TableCreatorService} from "./layer/tableCreatorService";
import {TableCanvas} from "./tableCanvasComponent/tableCanvas";


const appRoutes: Routes = [
    {
        path: 'editor',
        component: Editor
    }, {
        path: '',
        redirectTo: 'editor',
        pathMatch: 'full'
    }, {
        path: 'table',
        component: TableCanvas,
    }];

@NgModule({
    declarations: [
        AppComponent,
        TableCanvas,
        Editor
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {enableTracing: true})
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ScriptEditorService,
        ScriptRepostiory,
        TableCreatorService
    ]
})

export class AppModule {
}