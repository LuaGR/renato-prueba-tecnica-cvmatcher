import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { firstValueFrom } from 'rxjs';
import { JobService } from '@app/services/job.service';
import { Job } from '@app/models/job.model';

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
  private jobService = inject(JobService);

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

    this.jobService.updateSearchValues(title || '', location || '');

    this.jobService.filterJobs();
  }
}
