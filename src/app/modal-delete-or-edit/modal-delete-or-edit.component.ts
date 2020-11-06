import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IToDo } from '../interface/to-do';

@Component({
  selector: 'app-modal-add-or-edit',
  templateUrl: './modal-delete-or-edit.component.html',
  styleUrls: ['./modal-delete-or-edit.component.css']
})
export class ModalDeleteOrEditComponent implements OnInit {

  formGroup: FormGroup;

  constructor( private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public row: IToDo) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id:[''],
      text:['', Validators.required]
    });
  }

}
