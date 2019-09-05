/*Add a function to beautify code*/ 
import { Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as $ from 'jquery';
import { RunCodeComponent } from '../run-code/run-code.component';
import {SolutionDialogComponent} from '../solution-dialog/solution-dialog.component';
import {SubmitCodeComponent} from '../submit-code/submit-code.component';
import {languages,themes,fontSize,starterCode} from '../settings'
import { ExecutionService } from '../execution.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Problem,ProblemDetail} from '.././utils'
import { AuthService } from '../auth/auth.service';
@Component({ 
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.scss']
})
export class ProblemDetailComponent implements AfterViewInit{
  selectedLanguage: string='java';
  selectedTheme : string ='monokai';
  fontValue : string = "15px";
  problem_name:string;
  problem : Problem;
  detail :ProblemDetail;
  empty :boolean=true;
  output_test_case:Array<String>=["1","2","3","4","5","5","6","7","8","9"];
  constructor(private problem_service:ExecutionService,private run_dialog: MatDialog,private submit_dialog:MatDialog,
    private solution_dialog:MatDialog,private route : ActivatedRoute,private router : Router,private auth :AuthService) {
      this.problem_name=this.route.snapshot.paramMap.get("name");
      this.problem=new Problem();
      this.detail=new ProblemDetail();
      problem_service.getProblemByName(this.problem_name).subscribe((data:any)=>{
        if(data==null) router.navigate(['/problems']);
        else this.problem.author=data.author;
      });
      problem_service.getProblemDetailByName(this.problem_name).subscribe((data:any)=>{
        this.empty=false;
        this.detail.attempts=data.attempts;
        this.detail.background=data.background.replace(/(?:\r\n|\r|\n)/g, '<br>');
        this.detail.description=data.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
        this.detail.input=data.input;
        this.detail.output=data.output;
        this.detail.success=data.success;
        this.detail.solution=data.solution;
      });
      
  }
  languages=languages;
  themes=themes;
  fontsizes=fontSize;
  @ViewChild('editor',{static: false}) editor;
    text: string = "";
     ngAfterViewInit() {
      this.editor.getEditor().setValue(starterCode[this.selectedLanguage]); 
      this.editor.getEditor().setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }); 
      this.editor.getEditor().selection.moveCursorFileStart();

    }

setLanguage() {
    this.editor.setMode(this.selectedLanguage);
    this.editor.getEditor().setValue(starterCode[this.selectedLanguage]);
    this.editor.getEditor().selection.moveCursorFileStart();
}    
setTheme(){
  this.editor.setTheme(this.selectedTheme);
}
setSize(){
  $('.editor').css({fontSize: this.fontValue});
}
getCode():string{
  const code:string = this.editor.getEditor().getValue();
  return code;
} 
runCode():void{
  this.run_dialog.open(RunCodeComponent,{
    width:"50vw",
    height:"70vh",
    data:{detail:this.detail,lang:this.selectedLanguage,code:this.getCode()}
  });
 }
 submitCode():void{
  this.submit_dialog.open(SubmitCodeComponent,{
    width:"70vw",
    height:"80vh",
    data:{detail:this.detail,lang:this.selectedLanguage,code:this.getCode()}
   });
  } 
 showSolution():void{
   this.solution_dialog.open(SolutionDialogComponent,{
     width:"70vw",
     height:"80vh",
     data:this.detail
   });
 }  
}
