import { Component, OnInit } from '@angular/core';
interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-sideMenu',
  templateUrl: './sideMenu.component.html',
})
export class SideMenuComponent implements OnInit {
  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ];

  constructor() {}

  ngOnInit() {}
}
