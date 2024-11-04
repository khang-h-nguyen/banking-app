import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account, Transaction } from '../../models/account.model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html'
})
export class TransactionHistoryComponent {
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedAccountId = '';

  constructor(private accountService: AccountService) {
    this.accounts = this.accountService.getAccounts();
    this.transactions = this.accountService.getTransactions();
    this.filterTransactions();
  }

  filterTransactions() {
    this.filteredTransactions = this.accountService.getTransactions().filter(t =>
      !this.selectedAccountId ||
      t.fromAccountId === this.selectedAccountId ||
      t.toAccountId === this.selectedAccountId
    );
  }

  getAccountName(accountId: string): string {
    const account = this.accountService.getAccountById(accountId);
    return account ? account.name : 'Unknown Account';
  }
}