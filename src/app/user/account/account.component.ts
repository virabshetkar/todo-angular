import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  oldTitle = this.titleService.getTitle();

  constructor(private titleService: Title) {}

  ngOnDestroy(): void {
    this.titleService.setTitle(`${this.oldTitle}`);
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.oldTitle} | Account`);
  }
}
