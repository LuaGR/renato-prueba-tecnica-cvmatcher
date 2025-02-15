import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Job } from '@app/models/job.model';
import { JobService } from '@app/services/job.service';

@Component({
  selector: 'app-job-list',
  imports: [],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListComponent {

  private jobService = inject(JobService)
  protected jobs: Signal<Job[]> = this.jobService.filteredJobs;

  selectJob(id: number): void {
    this.jobService.setSelectedJobId(id);
  }
}
