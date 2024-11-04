import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Input() type: 'chequing' | 'savings' = 'chequing';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<any>();

  getButtonClass() {
    return {
      'btn-chequing': this.type === 'chequing',
      'btn-savings': this.type === 'savings'
    };
  }
}