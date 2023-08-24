import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'xoka_test_project';
  displayedColumns: string[] = [
    'id',
    'firstName', 
    'lastName',
    'gender',
    'Phone', 
    'Email',
    'Employee' ,
    'Department',
    'Salary',
    'Company',
    'Date',
    'action'
  ];
    dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _dialog: MatDialog,
    private _empService:EmployeeService,
    private _liveAnnouncer: LiveAnnouncer,
    ){}

  ngOnInit(): void {
      this.getEmployeeList();
  }
  openEmployeeForm(){
    const dialogRef = this._dialog.open(EmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        if (val){
          this.getEmployeeList();
        }
      }
    })
    this._dialog.open(EmployeeComponent);
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res) => {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort=this.sort
      },
      error:console.log
    })
  }
   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee deleted');
        this.getEmployeeList()
      },
      error :console.log,
    })
  }
  openEditForm(data: any){
    const dialogRef = this._dialog.open(EmployeeComponent,{
      data,
    })

    dialogRef.afterClosed().subscribe({
      next:(val) => {
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }
}
