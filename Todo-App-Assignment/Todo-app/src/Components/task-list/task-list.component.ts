import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskServiceService } from 'src/Services/task-service.service';
import Swal from 'sweetalert2';


// or via CommonJS


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  data1 : any;
  show : boolean = false;
  displayedColumns: string[] = ['assignedTo', 'status', 'dueDate', 'priority', 'description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog : MatDialog , private service : TaskServiceService,
    
  ){

  }
  ngOnInit(): void {
    this.get();
  }

  get()
  {
    this.service.getData().subscribe({
      next:(data : any)=>
      {
        this.data1 = data;
        console.log("Data Fetching Successfully",this.data1);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error:(err : any)=>{
        console.log("Oops!",err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 


/** Builds and returns a new User. */

  openSignUp(){
    const dialofRef =this._dialog.open(TaskFormComponent,{
      width: '90%',height: '75%',panelClass: 'custom-dialog',
      position: {
        top: '70px', // Customize the top position
        // Customize the left position
      }
    });
    dialofRef.afterClosed().subscribe({
        next : (val) =>
        {
          if(val){
            this.get();
          }
        }
    });
  }

  openEdit(data : any){
    const dialofRef = this._dialog.open(TaskFormComponent,{data,
      width: '90%',height: '550px',panelClass: 'custom-dialog',
      position: {
        top: '70px', // Customize the top position
        // Customize the left position
      }

    });
    dialofRef.afterClosed().subscribe({
      next : (val) =>
      {
        if(val){
          this.get();
        }
      }
  });

  }

  delete(id : any){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

    //Delete Logic
    this.service.deleteTask(id).subscribe({
        next : (data : any) => {
          Swal.fire({
            title: "Deleted!",
            text: "Task is Deleted",
            icon: "success"
          });
          this.get();
        },
        error : (data : any) => {
          Swal.fire({
            title: "Not Deleted!",
            text: "Something went Wrong While Deleting Task",
            icon: "error"
          });
        }
    });
  }
});
  }

  refresh(){
    this.get();
  }


}

