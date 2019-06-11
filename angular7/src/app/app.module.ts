import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {FormsModule} from '@angular/forms';
import { FocusDirective } from './common/focus.directive';
import { EscapeDirective } from './common/escape.directive';
import {HttpClientModule} from '@angular/common/http';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './common/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {TodoListEffects} from './common/effects/todo-list.effects';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    FocusDirective,
    EscapeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([TodoListEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'http://localhost:5100'}),
      cache: new InMemoryCache()
    });
  }
}
