import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../common/todo.model";
import {TodoListService} from "../common/todo-list.service";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @Input() index: number;

  originalTodo: Todo;
  editing: boolean;
  savedEvent: string;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.originalTodo = _.cloneDeep(this.todo);
    this.editing = false;
  }

  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
    this.todoListService.updateTodo(this.index, this.todo);
  }

  editTodo() {
    this.editing = true;
  }

  removeTodo() {
    this.todoListService.deleteTodo(this.index);
  }

  saveEdits(mode: string, form: NgForm) {
    //blur is triggered on a submit, this is here to prevent a double-submit
    if(mode === 'blur' && this.savedEvent === 'submit') {
      this.savedEvent = '';
      return;
    }
    this.savedEvent = mode;


    this.editing = false;
  }

  revertEdits() {
    this.todo = _.cloneDeep(this.originalTodo);
    this.editing = false;
  }

}
