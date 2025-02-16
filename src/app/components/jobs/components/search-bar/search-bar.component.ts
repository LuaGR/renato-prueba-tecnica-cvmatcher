import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { Router } from '@angular/router';

interface SearchForm {
  title: FormControl<string>,
  location: FormControl<string>,
  years_experience: FormControl<number>,
  salary_min: FormControl<number>
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
    years_experience: new FormControl(-1, {
      nonNullable: true,
    }),
    salary_min: new FormControl(-1, {
      nonNullable: true,
    })
  });

  onSubmit(): void {
    const { title, location, years_experience, salary_min } = this.searchForm.value;
    this.router.navigate([], {
      queryParams: { title, location, years_experience, salary_min },
      queryParamsHandling: 'merge',
    });
  }
}
