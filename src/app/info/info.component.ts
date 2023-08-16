import { Component, Input } from '@angular/core';
import { MapInfo } from '../map-info.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input({ required: true }) mapInfo!: MapInfo;
}
