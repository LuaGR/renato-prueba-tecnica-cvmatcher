import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { Router } from '@angular/router';

interface SearchForm {
  title: FormControl<string>,
  location: FormControl<string>
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
  });

  onSubmit(): void {
    const { title, location } = this.searchForm.value;

    this.router.navigate([], {
      queryParams: { title, location },
      queryParamsHandling: 'merge'
    });
  }
}
