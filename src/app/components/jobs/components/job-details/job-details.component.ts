import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute)
  private jobService = inject(JobService)
  protected selectedJob: Signal<Job | undefined> = computed(() => this.jobService.getSelectedJob());

  constructor() {
    this.route.queryParams.subscribe(params => {
      const jobId = Number(params['jobId']);
      if (jobId) {
        this.jobService.setSelectedJobId(jobId);
      }
    });
  }
}
