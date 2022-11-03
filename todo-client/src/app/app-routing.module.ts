import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
  },
    {
      path: 'auth',
      loadChildren: () =>
        import('./auth/auth.module').then((m) => m.AuthModule),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
