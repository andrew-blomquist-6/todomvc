import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../common/todo.model';
import {TodoListService} from '../common/todo-list.service';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;

  @ViewChild('f') form: NgForm;

  originalTodo: Todo;
  editing: boolean;
  savedEvent: string;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.originalTodo = _.cloneDeep(this.todo);
    // TODO: get the form's initial value set
    this.resetForm();
  }

  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
    this.todoListService.updateTodo(this.todo);
  }

  editTodo() {
    this.editing = true;
    this.todoListService.setEditingTodo(this.todo);
  }

  removeTodo() {
    this.todoListService.deleteTodo(this.todo);
  }

  saveEdits(mode: string) {
    // blur is triggered on a submit, this is here to prevent a double-submit
    if (mode === 'blur' && this.savedEvent === 'submit') {
      this.savedEvent = '';
      return;
    } else if (mode !== 'blur') {
      // it was a submit
      this.savedEvent = mode;
      this.todo.title = this.form.value.title;
      this.todoListService.updateTodo(this.todo);
    }
    this.resetForm();
  }

  revertEdits() {
    this.todo = _.cloneDeep(this.originalTodo);
    this.resetForm();
  }

  resetForm() {
    this.form.value.title = this.todo.title;
    this.editing = false;
    this.todoListService.setEditingTodo(null);
  }

}
