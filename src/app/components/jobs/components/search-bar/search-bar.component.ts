import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { Router } from '@angular/router';

interface SearchForm {
  title: FormControl<string>,
  location: FormControl<string>,
  years_experience: FormControl<number>,
}

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  private router = inject(Router)

searchForm = new FormGroup<SearchForm>({
    title: new FormControl('', {
      nonNullable: true,
    }),
    location: new FormControl('', {
      nonNullable: true,
    }),
    years_experience: new FormControl<number>(-1, {  // Nuevo campo
      nonNullable: true, // Permitimos que sea opcional
    }),
  });

  onSubmit(): void {
    const { title, location, years_experience } = this.searchForm.value;
    this.router.navigate([], {
      queryParams: { title, location, years_experience }, // Añadimos el nuevo parámetro
      queryParamsHandling: 'merge',
    });
  }
}
