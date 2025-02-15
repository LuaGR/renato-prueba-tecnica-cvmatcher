import { inject, Injectable, signal } from '@angular/core';
import { Job } from '@app/models/job.model';
import { of } from 'rxjs';
import mockJobs from '@app/mocks/data-jobs.json';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  state = signal({
    jobs: new Map<number, Job>(),
  });

  searchValues = signal({
    title: '',
    location: '',
  });

  private previousSearchValues = { title: '', location: '' };

  filteredJobs = signal<Job[]>([]);

  private selectedJobId = signal<number | null>(null);

  constructor() {
    this.getJobs();
  }

  getFormattedJobs(): Job[] {
    return Array.from(this.state().jobs.values());
  }

  getJobs(): void {
    of(mockJobs).subscribe((result) => {
      result.forEach((job) => {
        this.state().jobs.set(job.job_id, job);
      });

      this.state.set({ jobs: this.state().jobs });

      this.filteredJobs.set(this.getFormattedJobs());
    });
  }

  getJobById(id: number): Job | undefined {
    return this.state().jobs.get(id);
  }

  updateSearchValues(title: string, location: string): void {
    this.searchValues.set({ title, location });
  }

  filterJobs(): void {
    const { title, location } = this.searchValues();

    if (title === this.previousSearchValues.title && location === this.previousSearchValues.location) {
      console.log('Los valores de búsqueda no han cambiado. No se realiza una nueva búsqueda.');
      return;
    }

    this.previousSearchValues = { title, location };

    const jobs = this.getFormattedJobs();

    if (!title && !location) {
      this.filteredJobs.set(jobs);
      return;
    }

    const filtered = jobs.filter((job) => {
      const matchesTitle = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
      const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
      return matchesTitle && matchesLocation;
    });

    this.filteredJobs.set(filtered);
  }

  setSelectedJobId(id: number): void {
    this.selectedJobId.set(id);
  }

  getSelectedJob(): Job | undefined {
    const id = this.selectedJobId();
    return id ? this.getJobById(id) : undefined;
  }
}
