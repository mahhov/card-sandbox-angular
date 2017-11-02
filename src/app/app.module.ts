import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppComponent} from "./app";
import {CreateLogin} from "./createLoginComponent/createLogin";
import {Editor} from "./editorComponent/editor";
import {AuthenticationRepostiory} from "./layer/authenticationRepository";
import {AuthenticationService} from "./layer/authenticationService";
import {ScriptEditorService} from "./layer/scriptEditorService";
import {ScriptRepository} from "./layer/scriptRepository";
import {TableCreatorService} from "./layer/tableCreatorService";
import {Library} from "./libraryComponent/library";
import {Login} from "./loginComponent/login";
import {Navigation} from "./navigationComponent/navigation";
import {TableCanvas} from "./tableCanvasComponent/tableCanvas";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, {
        path: 'login',
        component: Login
    }, {
        path: 'createLogin',
        component: CreateLogin
    }, {
        path: 'editor',
        component: Editor
    }, {
        path: 'library',
        component: Library
    }, {
        path: 'table',
        component: TableCanvas,
    }];

@NgModule({
    declarations: [
        AppComponent,
        Navigation,
        Login,
        CreateLogin,
        Editor,
        Library,
        TableCanvas
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
        AuthenticationRepostiory,
        ScriptRepository,
        AuthenticationService,
        ScriptEditorService,
        TableCreatorService
    ]
})

export class AppModule {
}