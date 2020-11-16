import { Component, OnInit, ViewChild } from '@angular/core';
import { IToDo } from '../interface/to-do';
import { ModalDeleteOrEditComponent } from '../modal-delete-or-edit/modal-delete-or-edit.component';
import { ToDoService } from '../to-do.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'text', 'isFinished', 'dateFinished', 'action'];
  displayFinished: string[] = ['id', 'text', 'dateFinished', 'action'];
  displayNotFinished: string[] = ['id', 'text', 'action'];
  dataSource = new MatTableDataSource<IToDo>();
  finishedTasks: IToDo[] = [];
  notFinishedTasks: IToDo[] = [];
  selection = new SelectionModel<IToDo>(true, []);
  exampleDatabase: ToDoService | null;
  toDos: IToDo[] = [];
  data = Object.assign(this.toDos);
  finishedToDos: IToDo[] = [];


  @ViewChild(MatTable, { static: true }) table: MatTable<any>

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

  constructor(
    private toDoService: ToDoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getToDoList();
    this.table.renderRows();
  }

  deleteMany() {
    const sel = this.selection.selected.length;
    if (sel > 1) {
      this.selection.selected.forEach(item => {
        let index: number = this.data.findIndex(d => d === item);
        console.log(this.data.findIndex(d => d === item));
        this.data.splice(index, 1)
        this.toDoService.deleteToDo(item.id).subscribe(
          result => {
            console.log(result);
            this.getToDoList();
          }
        )
      });
      this.selection = new SelectionModel<IToDo>(true, []);
    }
  }

  //onemogućuje da označi CHECKBOX u tom stupcu
  onEvent(event) {
    event.stopPropagation();
  }

  getToDoList(): void {
    this.toDoService.getToDos().subscribe(data => {
      this.toDos = data;
      this.sortTasksForOtherTables(data)
    })
  }

  sortTasksForOtherTables(data: IToDo[]) {
    // data.forEach( function(count){
    //   if(count.isFinished == true){
    //     this.finishedTasks = count;
    //   }
    //   return this.finishedTasks; 
    // })
    
    data.forEach(value =>{
      console.log('TASKS',value)
      if(value.isFinished == true){
        console.log('FT', value);
        this.finishedTasks.push(value);
      }
      else {
        this.notFinishedTasks.push(value);
      }
    })
    // tu napravit iteraciju kroz sve zadatke i pushati u finishedTasks one koji imaju status "true", a 
    // pushati u unfinishedTasks one koji ima status "false"
    // data.forEach i unutar toga if else koji gleda status i na temelju toga stavlja u finished/unfinished
  }

  // editOrDelete(row: IToDo): void {
  //   const dialogRef = this.dialog.open(ModalDeleteOrEditComponent,{
  //     width: '350px',
  //     height: '250px',
  //     data: {
  //       row: row
  //     }
  //   });

  AddEditOrDelete(action, object) {
    object.action = action;
    const dialogRef = this.dialog.open(ModalDeleteOrEditComponent, {
      width: '500px',
      height: '600px',
      data: object
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRow(result.data);
      } else if (result.event == 'Edit') {
        this.updateRow(result.data);
      }
      // else if(result.event == 'Delete'){
      //   this.deleteRow(result.data);
      // }
    });
  }

  // addRowData(row_obj){
  //   var data = new Date();
  //   this.toDos.push({
  //     id:data.getTime(),
  //     text:row_obj.text
  //   });
  //   this.table.renderRows();
  // }

  addRow(row) {
    this.toDoService.createToDo(row).subscribe((res) => {
      console.log(res);
      this.toDos.push(res);
      this.table.renderRows();
    })
  }

  // updateRowData(row_obj){
  //   this.toDos = this.toDos.filter((value,key)=>{
  //     if(value.id == row_obj.id){
  //       value.text = row_obj.text;
  //     }
  //     return true;
  //   });
  // }

  updateRow(row) {
    this.toDoService.updateToDo(row).subscribe(
      result => {
        console.log(result);
        this.getToDoList();
      }
    )
  }

  // deleteRowData(row_obj){
  //   this.toDos = this.toDos.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
  // }

  deleteRow(row) {
    this.toDoService.deleteToDo(row.id).subscribe(
      result => {
        console.log(result);
        this.getToDoList();
      }
    )
  }
}
