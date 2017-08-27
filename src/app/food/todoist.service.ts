import { Injectable } from '@angular/core';
import { Task } from "task.model";
import { Http, Response } from "@angular/http";
import { SettingsService } from "app/settings/settings.service";

@Injectable()
export class TodoistService {

  private token = ""
  private getProjectId() {
    return 143385136; // FIXME: Hardcode Имя проекта в настройках, если такого нет, создать проект, иначе вернуть id
  }

  private getBaseUrl() {
    return `https://todoist.com/api/v7/sync?token=${this.token}&sync_token=*&resource_types=[%22projects%22, %22items%22]&commands=`;
  }

  private doQuery(url: string) {
    this.http.get(url).subscribe(
      (response: Response) => {
        console.log(response);
      }
    )
  }

  saveTasks(tasks: string[]) {
    let t: Task[] = [];

    for (var i = 0; i < tasks.length; i++) {
      t.push(new Task(tasks[i], this.getProjectId()))
    }
    let url = `${this.getBaseUrl()}${JSON.stringify(t)}`;
    this.doQuery(url)
  }

  constructor(
    private http: Http,
    private settingsService: SettingsService
  ) {
    this.token = this.settingsService.get("apikey")
  }

}
