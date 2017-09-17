import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SettingsService } from "app/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    let controls = {};
    for (let k: number = 0; k < this.settingsService.settings.length; k++) {
      let key = this.settingsService.settings[k];
      controls[key] = new FormControl(null, [Validators.required])
    }
    this.settingsForm = new FormGroup(controls);
    let init_settings = {}
    for (let k: number = 0; k < this.settingsService.settings.length; k++) {
      let key = this.settingsService.settings[k];
      init_settings[key] = this.settingsService.get(key);
    }
    this.settingsForm.setValue(init_settings);
  }

  onSave() {
    for (var key in this.settingsForm.value) {
      if (this.settingsForm.value.hasOwnProperty(key)) {
        var value = this.settingsForm.value[key];
        this.settingsService.set(key, value);
      }
    }
    this.settingsService.saveSettings();
  }

}
