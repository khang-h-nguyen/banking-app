import { Injectable } from '@angular/core';
import { Account, Transaction } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [];
  private transactions: Transaction[] = [];

  constructor() {
    // Load saved data when service initializes
    const savedAccounts = sessionStorage.getItem('accounts');
    const savedTransactions = sessionStorage.getItem('transactions');

    if (savedAccounts) {
      this.accounts = JSON.parse(savedAccounts);
    }
    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions).map((t: any) => ({
        ...t,
        date: new Date(t.date) // Convert date string back to Date object
      }));
    }
  }

  private saveData(): void {
    sessionStorage.setItem('accounts', JSON.stringify(this.accounts));
    sessionStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  createAccount(account: Omit<Account, 'id'>): void {
    // Check for duplicate account
    const isDuplicate = this.accounts.some(
      existingAccount =>
        existingAccount.name.toLowerCase() === account.name.toLowerCase() &&
        existingAccount.type === account.type
    );

    if (isDuplicate) {
      throw new Error('An account with this name and type already exists');
    }

    const newAccount = {
      ...account,
      id: this.accounts.length.toString()
    };
    this.accounts.push(newAccount);
    this.saveData();
  }

  transferFunds(fromId: string, toId: string, amount: number): void {
    const fromAccount = this.accounts.find(a => a.id === fromId);
    const toAccount = this.accounts.find(a => a.id === toId);

    if (!fromAccount || !toAccount || fromAccount.balance < amount) {
      throw new Error('Invalid transfer');
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    const newTransaction: Transaction = {
      id: this.transactions.length.toString(),
      fromAccountId: fromId,
      toAccountId: toId,
      amount,
      date: new Date()
    };

    this.transactions.push(newTransaction);
    this.saveData();
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getAccountById(id: string): Account | undefined {
    return this.accounts.find(a => a.id === id);
  }
}