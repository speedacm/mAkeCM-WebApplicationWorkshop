import { Component, OnInit } from '@angular/core';
import { DataService, Project, Rating } from '../data/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  
  constructor(public data: DataService) { }

  ngOnInit() {
    this.updateProjects();
  }

  updateProjects (): void {
    this.data.getProjects().subscribe(
      result => this.projects = result
      );
  }

}
