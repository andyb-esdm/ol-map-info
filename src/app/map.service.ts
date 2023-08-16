import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapInfo } from './map-info.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly mapInfoSubject = new BehaviorSubject<MapInfo | null>(null);
  readonly mapInfo$ = this.mapInfoSubject.asObservable();

  constructor() { }

  updateMapInfo(mapInfo: MapInfo | null) {
    this.mapInfoSubject.next(mapInfo);
  }
}
