import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from 'ng2-charts';
import { IToDo } from '../interface/to-do';

@Component({
  selector: 'app-modal-add-or-edit',
  templateUrl: './modal-delete-or-edit.component.html',
  styleUrls: ['./modal-delete-or-edit.component.css']
})
export class ModalDeleteOrEditComponent implements OnInit {

  action: string;
  local_data:any;
  color:'accent';
  checked = false;

  textGroup: FormGroup;

  constructor( private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ModalDeleteOrEditComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: IToDo) { 
                console.log(data);
                this.local_data = {...data};
                this.action = this.local_data.action;
              }

  doAction(){
    this.dialogRef.close({event:this.action, data:this.local_data});
    if(this.action ='Add'){
      console.log(this.action)
    }
  }
  changed(){
    console.log(this.checked)
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {

    this.textGroup = this.formBuilder.group({
      id:[''],
      text:['', Validators.required],
      isFinished:[false]
    });
  }

  getErrorMessage() {
    this.text.hasError('required') 
    return 'You must enter some text';
}

  get text(): AbstractControl {
    return this.textGroup.get('text');
  }

}
