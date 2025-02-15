import { inject, Injectable, signal } from '@angular/core';
import { Job } from '@app/models/job.model';
import { of } from 'rxjs';
import mockJobs from '@app/mocks/data-jobs.json';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private state = signal({
    jobs: new Map<number, Job>(),
  });

  private previousSearchValues = { title: '', location: '' };
  filteredJobs = signal<Job[]>([]);

  private selectedJobId = signal<number | null>(null);

  constructor() {
    this.getJobs();

    this.route.queryParams.subscribe(params => {
      const title = params['title'] || '';
      const location = params['location'] || '';
      this.filterJobs(title, location);
    });
  }

  getJobs(): void {
    of(mockJobs).subscribe((result) => {
      result.forEach((job) => {
        this.state().jobs.set(job.job_id, job);
      });

      this.state.set({ jobs: this.state().jobs });

      this.filteredJobs.set(this.getFormattedJobs());

      this.selectFirstJob();
    });
  }

  getFormattedJobs(): Job[] {
    return Array.from(this.state().jobs.values());
  }

  getJobById(id: number): Job | undefined {
    return this.state().jobs.get(id);
  }

  filterJobs(title: string, location: string): void {

    if (title === this.previousSearchValues.title && location === this.previousSearchValues.location) {
      console.log('Los valores de búsqueda no han cambiado. No se realiza una nueva búsqueda.');
      return;
    }

    this.previousSearchValues = { title, location };

    const jobs = this.getFormattedJobs();

    if (!title && !location) {
      this.filteredJobs.set(jobs);
    } else {
      const filtered = jobs.filter((job) => {
        const matchesTitle = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
        const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
        return matchesTitle && matchesLocation;
      });

      this.filteredJobs.set(filtered);
    }

    this.selectFirstJob();
  }

  private selectFirstJob(): void {
    const jobs = this.filteredJobs();
    if (jobs.length > 0) {
      this.setSelectedJobId(jobs[0].job_id);
    }
  }

  setSelectedJobId(id: number): void {
    this.selectedJobId.set(id);

    this.router.navigate([], {
      queryParams: { jobId: id },
      queryParamsHandling: 'merge',
    });
  }

  getSelectedJob(): Job | undefined {
    const id = this.selectedJobId();
    return id ? this.getJobById(id) : undefined;
  }
}
