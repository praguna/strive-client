import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { AceEditorModule } from 'ng2-ace-editor';
import {MatSelectModule} from '@angular/material/select'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule,MatProgressBarModule, MatTableModule, MatDialogModule } from "@angular/material";
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RunCodeComponent } from './run-code/run-code.component';
import {MatButtonModule} from '@angular/material/button';
import { SubmitCodeComponent } from './submit-code/submit-code.component';
import { HttpClientModule } from '@angular/common/http';
import { SolutionDialogComponent } from './solution-dialog/solution-dialog.component'; 
import { ExecutionService } from './execution.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemsComponent,
    ProblemDetailComponent,
    NotFoundComponent,
    RunCodeComponent,
    SubmitCodeComponent,
    SolutionDialogComponent,
    LoginComponent,
    RegisterComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    AngularFontAwesomeModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    AceEditorModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [ExecutionService],
  bootstrap: [AppComponent],
  entryComponents:[RunCodeComponent,SolutionDialogComponent,SubmitCodeComponent]
})
export class AppModule { }
