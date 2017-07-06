import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { NgProgressService } from "ng2-progressbar";

import {} from '@types/googlemaps'; 

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // initial center position for the map
  lat: number = 28.7041;
  lng: number = 77.1025;
  public searchControl: FormControl;
  public zoom: number = 5;

  public markers: marker[] = []; 

  public places: Array<any> = [
    {
      name: 'AIRPORT',
      value: 'airport'
    },
    {
      name: 'RAILWAY STATION',
      value: 'train_station'
    },
    {
      name: 'BUS STATION',
      value: 'bus_station'
    },
    {
      name: 'BANKS',
      value: 'bank'
    },
    {
      name: 'MOVIE THEATER',
      value: 'movie_theater'
    },
    {
      name: 'POLICE',
      value: 'police',
    },
    {
      name: 'PHARMACY',
      value: 'pharmacy',
    },
    {
      name: 'SCHOOLS',
      value: 'school'
    },
    {
      name: 'ATMs',
      value: 'atm'
    },
    {
      name: 'HOSPITALS',
      value: 'hospitals'
    },
    {
      name: 'RESTAURANT',
      value: 'restaurant'
    },
  ];

  public place: google.maps.places.PlaceResult;

  public service;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, 
              private ngZone: NgZone,
              private pService: NgProgressService
  ){ }

  ngOnInit(){
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.place = autocomplete.getPlace();

          if(this.place.geometry === undefined || this.place.geometry === null){
            return;
          }

          this.lat = this.place.geometry.location.lat();
          this.lng = this.place.geometry.location.lng();
          this.zoom = 12;

          this.markers = [
            {
              lat: this.lat,
              lng: this.lng,
              label: 'A',
              draggable: true
            }
          ];
        });
      });
    });
    
  }

  loadPlaces(place: string){

    this.pService.start();
    
    this.markers = [];
    console.log("Place is ",place);
    // default is 2 KMS
    let radius = 2000;

    
    if(place === 'airport'){
      radius = 50000;
    }
    if(place === 'train_station'){
      radius = 20000;
    }

    var request = {
      location: new google.maps.LatLng(this.lat, this.lng),
      radius: radius,
      type: [ place ]
    };

    this.service = new google.maps.places.PlacesService(this.searchElementRef.nativeElement);
    this.service.nearbySearch(request, (results, status) => {
      if(status == google.maps.places.PlacesServiceStatus.OK){
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            this.markers.push({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              draggable: false
            });
          }
      }
       this.pService.done();
    });
  }
 
}
