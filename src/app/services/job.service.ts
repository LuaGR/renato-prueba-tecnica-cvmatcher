import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Job } from '@app/models/job.model';
import { Observable, of } from 'rxjs';
import mockJobs from '@app/mocks/data-jobs.json'

@Injectable({
  providedIn: 'root'
})
export class JobService {
  state = signal({
    jobs: new Map<number, Job>()
  })

  private selectedJobId = signal<number | null>(null); // Agregamos un signal para el ID seleccionado

  constructor() {
    this.getJobs()
  }

  getFormattedJobs() {
    return Array.from(this.state().jobs.values())
  }

  getJobs(): void {
    of(mockJobs).subscribe(result => {
      result.forEach(job => {
        this.state().jobs.set(job.job_id, job);
      });

      this.state.set({ jobs: this.state().jobs });
    });
  }

  getJobById(id: number) {
    return this.state().jobs.get(id)
  }

// Métodos para gestionar el trabajo seleccionado
  setSelectedJobId(id: number) {
    this.selectedJobId.set(id);
  }

  getSelectedJob(): Job | undefined {
    const id = this.selectedJobId();
    return id ? this.getJobById(id) : undefined;
  }
}
