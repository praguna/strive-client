import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ProblemDetail} from '.././utils'
interface DialogData{
  solution:string;
}
@Component({
  selector: 'app-solution-dialog',
  templateUrl: './solution-dialog.component.html',
  styleUrls: ['./solution-dialog.component.scss']
})
export class SolutionDialogComponent implements OnInit {
  text:string="";
  constructor(
  public dialogRef: MatDialogRef<SolutionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : ProblemDetail){} 

  ngOnInit() {
  }

}
