import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../services/student.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.scss']
})
export class DeleteStudentComponent implements OnInit{
  form = new FormGroup({
    id: new FormControl('',Validators.required),
    name: new FormControl(''),
    address: new FormControl(''),
    salary: new FormControl('')
  });

  constructor(private studentservice : StudentService) {
  }
  ngOnInit(): void {
  }

  finduser() {
    this.studentservice.findStudent(
      this.form.get('id')?.value!
    ).subscribe(response=>{
      this.form.patchValue({
        name:response.data.name,
        address:response.data.address,
        salary:response.data.salary
      })
    });
  }

  deleteUser() {
    this.studentservice.deleteStudent(
      this.form.get('id')?.value!
    ).subscribe(response=>{
      alert('Deleted');
      console.log(response);
    },error=>{
      console.log(error);
    });
  }


}
