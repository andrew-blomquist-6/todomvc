import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../common/todo.model';
import {TodoListService} from '../common/todo-list.service';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {Store} from '@ngrx/store';
import {State} from '../common/reducers';
import {UpdateEditingTodo} from '../common/actions/todo-list.actions';

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

  constructor(private todoListService: TodoListService,
              private store: Store<State>) { }

  ngOnInit() {
    // TODO: cloneDeep is messing up the editingTodo comparison
    //  (when deep cloned, they are no longer equal, even if their guts are the same)
    this.originalTodo = _.cloneDeep(this.todo);
    // TODO: get the form's initial value set
    this.resetForm();
  }

  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
    this.todoListService.updateTodo(this.todo);

    // this.store.dispatch(new UpdateTodo(this.todo, this.index));
  }

  editTodo() {
    this.editing = true;
    this.form.controls.title.setValue(this.todo.title);
    this.store.dispatch(new UpdateEditingTodo(this.todo));
  }

  removeTodo() {
    this.todoListService.deleteTodo(this.todo);

    // this.store.dispatch(new RemoveTodo(this.index));
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

      // this.originalTodo = _.cloneDeep(this.todo);
      // this.store.dispatch(new UpdateTodo(this.todo, this.index));
    }
    this.resetForm();
  }

  revertEdits() {
    if (this.editing) {
      this.todo = _.cloneDeep(this.originalTodo);
      this.resetForm();
    }
  }

  resetForm() {
    this.editing = false;
    this.store.dispatch(new UpdateEditingTodo(null));
  }

}
