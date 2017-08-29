import { Injectable } from '@angular/core';
import { Task } from "task.model";
import { Http, Response } from "@angular/http";
import { SettingsService } from "app/settings/settings.service";
import { UUID } from "angular2-uuid";
import { NotificationsService } from "angular2-notifications";

@Injectable()
export class TodoistService {

  private token = ""
  // private 
  private getProjectId() {
    let project_id = this.settingsService.get("project_id")
    let project_name = this.settingsService.get("project_name")
    if (project_id == null) {
      let url = `https://todoist.com/api/v7/sync?token=${this.token}&sync_token=*&resource_types=[%22projects%22]`
      this.doQuery(url).subscribe(
        (response: Response) => {
          let projects = response.json().projects;
          for (var i = 0; i < projects.length; i++) {
            var project = projects[i];
            if (project.name === project_name) {
              this.settingsService.set("project_id", project.id)
              return project.id;
            }
          }
          let roject_id = this.createProject(project_name);
          this.settingsService.set("project_id", project_id)
        }
      )
    }
    // TODO: Wait for observable
    return Number(project_id);
  }

  private async createProject(name: string) {
    let task = [
      {
        "type": "project_add",
        "temp_id": UUID.UUID(),
        "uuid": UUID.UUID(),
        "args": {
          "name": name
        }
      }]
    let url = `https://todoist.com/api/v7/sync?token=${this.token}&commands=${JSON.stringify(task)}`
    this.doQuery(url).subscribe(
      (resp: Response) => {
        return resp.json()['temp_id_mapping'][task[0]["temp_id"]];
      }
    )
  }

  private getBaseUrl() {
    return `https://todoist.com/api/v7/sync?token=${this.token}&sync_token=*&resource_types=[%22projects%22, %22items%22]&commands=`;
  }

  private doQuery(url: string) {
    return this.http.get(url);
  }

  saveTasks(tasks: string[]) {
    let t: Task[] = [];

    for (var i = 0; i < tasks.length; i++) {
      t.push(new Task(tasks[i], this.getProjectId()))
    }
    let url = `${this.getBaseUrl()}${JSON.stringify(t)}`;
    this.doQuery(url).subscribe(
      (response: Response) => {
        this.notificationsService.success("Added", "Products was added to Todoist shopping list", {
          showProgressBar: true,
          timeOut: 0
        });
        console.log(response);
      },
      (err)=>{
        this.notificationsService.success("!!!!", "Error while adding products to shopping list", {
          showProgressBar: true,
          timeOut: 0
        });
        console.log(err);
      }
    )
  }

  constructor(
    private http: Http,
    private settingsService: SettingsService,
    private notificationsService:NotificationsService
  ) {
    this.token = this.settingsService.get("apikey")
  }

}
