import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ExecutionService} from '../execution.service'; 
import { languageMap } from '../settings';
import { program } from '../request.config';
import * as auth from '../auth.key';
import { ProblemDetail } from '../utils';
export interface DialogData{
  detail:ProblemDetail
  lang:string,
  code:string
}
@Component({
  selector: 'app-submit-code',
  templateUrl: './submit-code.component.html',
  styleUrls: ['./submit-code.component.scss']
})
export class SubmitCodeComponent implements OnInit {
  results:Array<string>=[];
  code_output:Array<String>;
  code_result:string;
  test_case_in:string;
  test_case_out:Array<String>
  memory: any;
  time: any;
  constructor(
  public dialogRef: MatDialogRef<SubmitCodeComponent>, @Inject(MAT_DIALOG_DATA) private data: DialogData
  ,private service : ExecutionService){} 
  ngOnInit() {
    this.test_case_in=this.data.detail.input;
    this.test_case_out=this.data.detail.output.split('\n');
    if(this.test_case_out[this.test_case_out.length-1]=="") this.test_case_out.pop();
    $('#eval').hide();
    this.computeOutput();
  }
  computeOutput():void{
    let run_env=languageMap[this.data.lang];
    const req_data : program={
      script : this.data.code,
      language: run_env.apivalue,
      versionIndex: run_env.version,
      stdin:this.test_case_in,
      clientId:auth.client_ID,
      clientSecret:auth.client_SECRET
    }
    this.service.getResult(req_data).subscribe(
      data=>{
          this.code_result=data.output;
          this.memory=data.memory;
          this.time=data.cpuTime;
          if(data.output!==null && data.cpuTime!==null && data.memory!==null){
          this.code_output=this.code_result.split("\n");
          this.checkOutput();
         }
         $('#eval_spinner').hide(); 
         $('#eval').show();
         this.showOutput();
         
       }
    )
  }
  checkOutput():void{
    let x:string="test case ";
    let w:string='<i style="background-color:red" class="fa fa-times" aria-hidden="true"></i>'
    let t:string='<i style="background-color:blue" class="fa fa-check" aria-hidden="true"></i>'
    let c:string='<i style="color:yellow" class="fa fa-clock-o" aria-hidden="true"></i>'
    for (let index = 0; index < this.test_case_out.length; index++) {
      try{
      if(this.test_case_out[index]==this.code_output[index].trim()) this.results.push(x+(index+1)+": pass "+t)
      else this.results.push(x+(index+1)+": fail "+w);
      }
      catch(e){
        if(index >= this.code_output.length) this.results.push(x+(index+1)+": timeout "+c);
        else this.results.push(x+(index+1)+": fail "+w);
      }      
    }
  }
  showOutput():void{
    if(this.results.length==0){
     if(this.code_result.endsWith("output Limit reached.\n")) 
      $('#eval').html('<div style="color:white;padding-top:3vh">Time Limit Exeeded with Infinite Loop</div>');
     else $('#eval').html('<div style="color:white;padding-top:3vh">'+this.code_result+"</div>");
      return;
    }
    let resultant:string="<br/><br/>";
    for (let index = 0; index < this.results.length; index++) {
           if(index>0 && index%4==0) resultant+="<br/><br/>"
           resultant+='<span style="margin:10px 10px 10px 10px;color:white">'+this.results[index]+"</span>";
           
    }
    resultant+="<br/><br/>"+"memory :"+this.memory+"kb"+"<br/>"+"Time :"+this.time+"ms";
    $('#eval').html(resultant);
    $('#eval').css({"color":"white"});
  }
}
