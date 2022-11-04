import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export const childRoutes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
];

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class TodoModule {}
