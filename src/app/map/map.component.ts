import { Component, OnInit } from '@angular/core';
import { View, Map as olMap } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import { MapService } from '../map.service';
import { Pixel } from 'ol/pixel';
import { MapInfo } from '../map-info.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: olMap | null = null;
  constructor(private mapService: MapService) { }
  ngOnInit(): void {
    this.setupMap();
    this.setupInfoClick();
  }

  private setupMap() {
    const style = new Style({
      fill: new Fill({
        color: '#eeeeee',
      }),
    });

    const vectorLayer = new VectorLayer({
      background: '#1a2b39',
      source: new VectorSource({
        url: 'https://openlayers.org/data/vector/ecoregions.json',
        format: new GeoJSON(),
      }),
      style: function (feature) {
        const color = feature.get('COLOR') || '#eeeeee';
        style.getFill().setColor(color);
        return style;
      },
    });

    this.map = new olMap({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  private setupInfoClick() {
    this.map!.on('click', (event) => {
      const feature = this.map!.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        const mapInfo: MapInfo = {
          biomeName: feature.get('BIOME_NAME'),
          realm: feature.get('REALM'),
          ecoName: feature?.get('ECO_NAME')
        };
        this.mapService.updateMapInfo(mapInfo);
      } else {
        this.mapService.updateMapInfo(null);
      }
    });

  }

}
