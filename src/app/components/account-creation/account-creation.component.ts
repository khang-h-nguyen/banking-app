import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html'
})
export class AccountCreationComponent {
  accountForm: FormGroup;
  showSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
  ) {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      type: ['chequing', Validators.required],
      balance: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      try {
        this.accountService.createAccount(this.accountForm.value);
        this.accountForm.reset({ type: 'chequing', balance: 0 });
        this.showSuccess = true;
        this.errorMessage = '';

        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        }
        this.showSuccess = false;
      }
    }
  }
}