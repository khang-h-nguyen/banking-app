import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { TransferFundsComponent } from './components/transfer-funds/transfer-funds.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountCreationComponent,
    TransferFundsComponent,
    TransactionHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }