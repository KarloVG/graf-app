import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IToDo } from '../interface/to-do';
import { ModalDeleteOrEditComponent } from '../modal-delete-or-edit/modal-delete-or-edit.component';
import { ToDoService } from '../to-do.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  displayedColumns: string[] = ['select','id','text','action'];
  dataSource = new MatTableDataSource<IToDo[]>();
  selection = new SelectionModel<IToDo[]>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // toDos: IToDo[] = [];
  toDos;

  constructor(private toDoService: ToDoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getToDoList();
  }
  onEvent(event){
    event.stopPropagation();
  }

  getToDoList(): void{
    this.toDoService.getToDos().subscribe(data => {
      this.toDos = new MatTableDataSource(data);
      console.log('šule',data);
    })
  } 

  editOrDelete(row: IToDo): void {
    const dialogRef = this.dialog.open(ModalDeleteOrEditComponent,{
      data: {
        row: row
      }
    });
    console.log('šule',row)
  }
}
