import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-custom-input',
    imports: [ReactiveFormsModule],
    templateUrl: './custom-input.component.html',
    styleUrl: './custom-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputComponent {

  control = input.required<AbstractControl<string, string> | null>()
  label = input<string>()
  type = input.required<string>()
  placeholder = input.required<string>()
  errorMessage = input.required<string>()
  style = input<string>()

}

