import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  empForm:FormGroup;
department:  string[]=[
  'Managment',
  'Developer',
  'HR'
]
company: string[]=[
'Tahses',
'Xoka',
'Ewnet'
]
employee: string[]=[
  'Candidate',
  'Employee',
  'UnEmployed'
]
 constructor(
  private _fb:FormBuilder,
  private _empService:EmployeeService,
  private _dialogRef:DialogRef<EmployeeComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any
  ){
 this.empForm = this._fb.group({
  firstName:'',
  lastName:'',
  phone:'',
  email:'',
  salary:'',
  department:'',
  employee:'',
  company:'',
  date:'',
  gender:'',
})
 }
 ngOnInit(): void {
     this.empForm.patchValue(this.data);
 }
 onFormSubmit(){
  if(this.empForm.valid){
     if(this.data){
      this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('Employee detail updated!');
          this._dialogRef.close();
        },
        error :(err:any) => {
          console.error(err);
        }
       })
     }else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('Employee Added Successfully!')
          this._dialogRef.close();
        },
        error :(err:any) => {
          console.error(err);
        }
       })
     }
  
  }
 }
 cancelDialogue(){
  this._dialogRef.close();
 }
}
