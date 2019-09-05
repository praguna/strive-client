import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ExecutionService} from '../execution.service';
import {program} from '../request.config';
import * as $ from 'jquery';
import * as auth from '../auth.key';
import {languageMap} from '../settings'
import { __metadata } from 'tslib';
import { ProblemDetail } from '../utils';
export interface DialogData{
  detail:ProblemDetail,
  lang:string,
  code:string
}
@Component({
  selector: 'app-run-code',
  templateUrl: './run-code.component.html',
  styleUrls: ['./run-code.component.scss']
})
export class RunCodeComponent implements OnInit {
  private result:string=null;
  private sample_test_case:string="1\n";
  constructor(
    public dialogRef: MatDialogRef<RunCodeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData
    ,private service : ExecutionService){}  
  ngOnInit() {
    this.sample_test_case+=this.data.detail.input.split('\n')[1];
    $('textarea#test_case').html(this.sample_test_case);
  }
  showResult(){
    $("#spinner").show();
    $('span#output').html("");
    this.sample_test_case=$('textarea#test_case').val().toString();
    let run_env=languageMap[this.data.lang];
    const req_data : program={
      script : this.data.code,
      language: run_env.apivalue,
      versionIndex: run_env.version,
      stdin:this.sample_test_case,
      clientId:auth.client_ID,
      clientSecret:auth.client_SECRET
    }
    this.service.getResult(req_data).subscribe(
      (data) => {
        if(data.output!==null)
        this.result=data.output;
        else this.result="oops something went wrong! Try again";
        if(data.memory!==null)
        this.result+="\nMemory :"+data.memory+"kb";
        if(data.cpuTime!==null)
        this.result+="\nTime :"+data.cpuTime+"ms";
        $('#spinner').hide();
        $('span#output').html(this.result);
      }
    )
    this.result=null;
  }
}
