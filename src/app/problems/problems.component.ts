import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ExecutionService } from '../execution.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export interface ProblemData{
  id:string,
  name: string,
  tag : string,
  difficulty : string,
  company : string
}

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'tag', 'difficulty','company'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  problems:any[];
  constructor(private problem_service: ExecutionService,private authService:AuthService,private router : Router) {
   }

  ngOnInit() {
    this.problem_service.getProblems().subscribe((data:any[])=>{
      this.problems=data;
      this.dataSource = new MatTableDataSource(this.problems);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}

