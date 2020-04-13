import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { LoginComponentComponent } from './login-component/login-component.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponentComponent
  },
  {
    path: 'exp',
    component: ExpenseEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
