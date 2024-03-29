import { Component, Input, OnInit } from '@angular/core';
import { WidgetComponent } from "../widget/widget.component";
import { RouterLink } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  imports: [WidgetComponent, RouterLink, PlayerComponent, MatIconModule]
})
export class NavComponent {
  @Input() isShort!: boolean

  constructor() { }
}
