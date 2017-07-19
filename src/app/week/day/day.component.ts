import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day = "Понедельник";
  @Input() code = "mon";
  @ViewChild('f') foodForm: NgForm;

  foods = [
    "Суп"
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f) {    
    this.foods.push(this.foodForm.value.food);
    this.foodForm.reset();
  }

}
