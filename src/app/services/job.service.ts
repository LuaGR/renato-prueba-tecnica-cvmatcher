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

  private previousSearchValues = { title: '', location: '', years_experience: -1, salary_min: -1 };
  filteredJobs = signal<Job[]>([]);

  private selectedJobId = signal<number | null>(null);

  constructor() {
    this.getJobs();
    this.route.queryParams.subscribe(params => {
      const title = params['title'] || '';
      const location = params['location'] || '';
      const years_experience = params['years_experience'] ? Number(params['years_experience']) : -1;
      const salary_min = params['salary_min'] ? Number(params['salary_min']) : -1;
      this.filterJobs(title, location, years_experience, salary_min);
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

  filterJobs(title: string, location: string, years_experience: number, salary_min: number): void {
    if (
      title === this.previousSearchValues.title &&
      location === this.previousSearchValues.location &&
      years_experience === this.previousSearchValues.years_experience &&
      salary_min === this.previousSearchValues.salary_min
    ) {
      console.log('Los valores de búsqueda no han cambiado. No se realiza una nueva búsqueda.');
      return;
    }

    this.previousSearchValues = { title, location, years_experience, salary_min };

    const jobs = this.getFormattedJobs();

    if (!title && !location && years_experience === -1 && salary_min === -1) {
      this.filteredJobs.set(jobs);
    } else {
      const filtered = jobs.filter((job) => {
        const matchesTitle = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
        const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesExperience = years_experience !== -1 ? job.years_experience === years_experience : true;
        const matchesSalary = salary_min !== -1 ? Number( job.salary_min ) >= salary_min : true;
        return matchesTitle && matchesLocation && matchesExperience && matchesSalary;
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
