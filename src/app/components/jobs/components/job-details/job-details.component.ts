import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Job } from '@app/models/job.model';
import { JobService } from '@app/services/job.service';

@Component({
  selector: 'app-job-details',
  imports: [],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobDetailsComponent {
  private jobService = inject(JobService)
  protected selectedJob: Signal<Job | undefined> = computed(() => this.jobService.getSelectedJob());
}
