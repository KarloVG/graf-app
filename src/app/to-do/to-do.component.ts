import { Component, OnInit, ViewChild } from '@angular/core';
import { IToDo } from '../interface/to-do';
import { ModalDeleteOrEditComponent } from '../modal-delete-or-edit/modal-delete-or-edit.component';
import { ToDoService } from '../to-do.service';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { SelectionModel} from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  displayedColumns: string[] = ['select','id','text','action'];
  dataSource = new MatTableDataSource<IToDo>();
  selection = new SelectionModel<IToDo>(true, []);
  exampleDatabase: ToDoService | null;
  toDos: IToDo[] = [];

  @ViewChild(MatTable, {static:true}) table: MatTable<any>

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
  }
  onEvent(event){
    event.stopPropagation();
  }

  getToDoList(): void{
    this.toDoService.getToDos().subscribe(data => {
      this.toDos = data;
      console.log('šule',data);
    })
  } 

  // editOrDelete(row: IToDo): void {
  //   const dialogRef = this.dialog.open(ModalDeleteOrEditComponent,{
  //     width: '350px',
  //     height: '250px',
  //     data: {
  //       row: row
  //     }
  //   });

  editOrDelete(action, object){
    object.action = action;
    const dialogRef = this.dialog.open(ModalDeleteOrEditComponent, {
      width: '300px',
      height: '300px',
      data: object
    });
  

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRow(result.data);
      }else if(result.event == 'Edit'){
        this.updateRow(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRow(result.data);
      }
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

  addRow(row){
    this.toDoService.createToDo(row).subscribe((res) =>{
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

  updateRow(row){
    this.toDoService.updateToDo(row).subscribe(
      result =>{
        console.log(result);
        this.getToDoList();
      }
    )
  }

  deleteRowData(row_obj){
    this.toDos = this.toDos.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  deleteRow(row){
    this.toDoService.deleteToDo(row.id).subscribe(
      result => {
        console.log(result);
        this.getToDoList();
      }
    )
  }
}
