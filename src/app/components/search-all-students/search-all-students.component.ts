import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-search-all-students',
  templateUrl: './search-all-students.component.html',
  styleUrls: ['./search-all-students.component.scss']
})
export class SearchAllStudentsComponent implements OnInit{

  page:number | undefined  = 0;
  size:number | undefined  = 2;
  studentArray:any = [];
  options= [3,5, 10, 25, 100];
  studentCount = 0;
  pageEvent: PageEvent | undefined;
  searchText: string = '';

  search: FormGroup = new FormGroup(
    {text: new FormControl}
  );

  constructor(private studentservice : StudentService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(
      data=> {console.log(data);this.searchText=data.text; this.loadData();}
    )
  }

  getServerData(event?: PageEvent): any{
    this.page = event?.pageIndex;
    this.size = event?.pageSize;
    this.loadData();
  }
  private loadData() {
    this.studentservice.searchAllStudents(this.page,this.size,this.searchText).subscribe(response=>{
      this.studentArray = response.data.dataList;
      this.studentCount = response.data.count;
    });
  }

}
