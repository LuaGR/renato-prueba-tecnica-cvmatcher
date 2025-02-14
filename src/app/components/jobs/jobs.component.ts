import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent, JobListComponent, JobDetailsComponent } from "./components";

@Component({
  selector: 'app-jobs',
  imports: [SearchBarComponent, JobListComponent, JobDetailsComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsComponent {

}
