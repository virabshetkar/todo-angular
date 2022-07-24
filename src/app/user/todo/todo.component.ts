import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  oldTitle = this.titleService.getTitle();

  constructor(private titleService: Title) {}

  ngOnDestroy(): void {
    this.titleService.setTitle(`${this.oldTitle}`);
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.oldTitle} | Todo`);
  }
}
