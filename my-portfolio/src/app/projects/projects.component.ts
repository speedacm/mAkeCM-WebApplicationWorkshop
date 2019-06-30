import { Component, OnInit } from '@angular/core';
import { DataService, Project, Rating } from '../data/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  userRatings: { [projectId: number]: Rating } = {};
  projects: Project[];

  constructor(public data: DataService) { }

  ngOnInit() {
    this.updateProjects();
  }

  updateProjects(): void {
    this.data.getProjects().subscribe(
      result => this.projects = result
    );
  }

  getAverageRating(project: Project): number {
    let total = 0, count = 0;
    for (let rating of project.ratings)
    {
      count++;
      total += rating.value;
    }
    return count > 0 ? total / count : undefined;
  }

  submitRating(projectId: number): void {
    if (this.userRatings[projectId].value)
    {
      if (!this.userRatings[projectId].comment)
      {
        this.userRatings[projectId].comment = null;
      }

      this.data.addRating(projectId, this.userRatings[projectId]).subscribe(
        () => {
          this.userRatings[projectId] = undefined;
          this.updateProjects();
        }
      );
    }
  }

}
