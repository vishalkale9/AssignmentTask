import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskServiceService } from 'src/Services/task-service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  [x: string]: any;
    
  newTask : any;

  constructor(private fb : FormBuilder, 
    private service : TaskServiceService,
    private _dialog : MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public  data : any,
   private toastr : ToastrService){ }

  ngOnInit(): void {

    this.newTask = this.fb.group({
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: [''],
      priority: ['', Validators.required],
      description:[''],
     
    });

    this.newTask.patchValue(this.data);
  }

  ngAfterViewInit() {
    // Initialize jQuery datepicker once the view is initialized
    $('#datepicker input').datepicker({
      dateFormat: 'dd-mm-yy',  // Example format, you can customize this
    });
  }




  onSubmit(){
    if(this.newTask.valid){

      if(this.data){
        this.service.editData(this.data.id,this.newTask.value).subscribe({
          next :(data : any)=>{
            this._dialog.close(true);
            Swal.fire({
              title: "Updated!",
              text: "Task Updated Successfully",
              icon: "success"
            });
           
              // this.toastr.success('Hello world!', 'Toastr fun!');
            
          },
          error : (data : any) => {
            Swal.fire({
              title: "Unable to Update Task!",
              text: "Something went Wrong While Update Task",
              icon: "error"
              
            });
            this._dialog.close();
          }
        });

      }
      else{
      this.service.addNewTask(this.newTask.value).subscribe({
        next :(data : any)=>{
          this._dialog.close(true);
          // this.toastr.success( 'New Task Addedd Successfully','Successfull!',{
          //   timeOut: 2000,
          // });
          Swal.fire({
            title: "New Task Added!",
            text: "New Task Addedd Successfully",
            icon: "success"
          });
        },
        error : (data : any) => {
          Swal.fire({
            title: "Unable to Add Task!",
            text: "Something went Wrong While Adding New Task",
            icon: "error"
          });
          this._dialog.close();
        }
      });
    }
    }

  }
  cancle(){
    this._dialog.close(true);
  }
}
