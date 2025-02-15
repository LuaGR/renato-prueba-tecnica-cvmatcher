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

  private previousSearchValues = { title: '', location: '', years_experience: -1 };
  filteredJobs = signal<Job[]>([]);

  private selectedJobId = signal<number | null>(null);

  constructor() {
    this.getJobs();
    this.route.queryParams.subscribe(params => {
      const title = params['title'] || '';
      const location = params['location'] || '';
      const years_experience = params['years_experience'] ? Number(params['years_experience']) : -1; // Nuevo campo
      this.filterJobs(title, location, years_experience); // Pasamos el nuevo parámetro
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

  filterJobs(title: string, location: string, years_experience: number): void {
    if (
      title === this.previousSearchValues.title &&
      location === this.previousSearchValues.location &&
      years_experience === this.previousSearchValues.years_experience
    ) {
      console.log('Los valores de búsqueda no han cambiado. No se realiza una nueva búsqueda.');
      return;
    }

    this.previousSearchValues = { title, location, years_experience };

    const jobs = this.getFormattedJobs();

    if (!title && !location && years_experience === -1) {
      this.filteredJobs.set(jobs);
    } else {
      const filtered = jobs.filter((job) => {
        const matchesTitle = title ? job.title.toLowerCase().includes(title.toLowerCase()) : true;
        const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
        const matchesExperience =
          years_experience !== -1 ? job.years_experience === years_experience : true; // Nuevo filtro
        return matchesTitle && matchesLocation && matchesExperience;
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
