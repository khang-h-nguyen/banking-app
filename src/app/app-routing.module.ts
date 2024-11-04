import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { TransferFundsComponent } from './components/transfer-funds/transfer-funds.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/create-account', pathMatch: 'full' },
  { path: 'create-account', component: AccountCreationComponent },
  { path: 'transfer', component: TransferFundsComponent },
  { path: 'history', component: TransactionHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
