import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html'
})
export class TransferFundsComponent {
  transferForm: FormGroup;
  accounts: Account[] = [];
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.accounts = this.accountService.getAccounts();
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });

    // Validate amount when either amount or fromAccount changes
    this.transferForm.get('amount')?.valueChanges.subscribe(() => this.validateAmount());
    this.transferForm.get('fromAccount')?.valueChanges.subscribe(() => this.validateAmount());
  }

  validateAmount() {
    const amountControl = this.transferForm.get('amount');
    const fromAccountId = this.transferForm.get('fromAccount')?.value;
    const account = this.accounts.find(a => a.id === fromAccountId);

    // Only validate if there's both an amount and an account selected
    if (amountControl?.value && account && Number(amountControl.value) > account.balance) {
      amountControl.setErrors({ insufficientFunds: true });
    } else if (amountControl?.errors?.['insufficientFunds']) {
      // Clear only the insufficientFunds error while preserving other validations
      const errors = { ...amountControl.errors };
      delete errors['insufficientFunds'];
      amountControl.setErrors(Object.keys(errors).length ? errors : null);
    }
  }

  onSubmit() {
    if (this.transferForm.valid) {
      const { fromAccount, toAccount, amount } = this.transferForm.value;
      this.accountService.transferFunds(fromAccount, toAccount, Number(amount));
      this.transferForm.reset();
      this.accounts = this.accountService.getAccounts();
      this.showSuccess = true;
      setTimeout(() => this.showSuccess = false, 3000);
    }
  }
}