import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-find-all-students',
  templateUrl: './find-all-students.component.html',
  styleUrls: ['./find-all-students.component.scss']
})
export class FindAllStudentsComponent implements OnInit{

  page:number | undefined  = 0;
  size:number | undefined  = 2;
  studentArray:any = [];
  options= [3,5, 10, 25, 100];
  studentCount = 0;
  pageEvent: PageEvent | undefined;

  constructor(private studentservice : StudentService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  getServerData(event?: PageEvent): any{
    this.page = event?.pageIndex;
    this.size = event?.pageSize;
    this.loadData();
  }
  private loadData() {
    this.studentservice.findAllStudents(this.page,this.size).subscribe(response=>{
      this.studentArray = response.data.dataList;
      this.studentCount = response.data.count;
    });
  }
}
