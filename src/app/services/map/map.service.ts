import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public APIKey: string ='YOUR_API_KEY';
  public googleURL: string = 'https://maps.googleapis.com/maps/api';
  public current_coords: any;

  constructor(public httpClient: HttpClient) { }

  async getCurrentCoords(){
    if(!this.current_coords){
      const coordinates = await Geolocation.getCurrentPosition();
      console.log(coordinates);
      this.current_coords = coordinates.coords;
    }
    return await this.current_coords
  }

  getSavedCoords( ){
    return this.current_coords;
  }

  async getDistanceMatrix(places: any){
    const service = new google.maps.DistanceMatrixService();
    let coords = await this.getCurrentCoords();
    const origin = { lat: coords.latitude, lng: coords.longitude };
    // const destinationA = { lat: 3.2571357, lng: 101.6552533 };
    // const destinationB = { lat: 3.07373, lng: 101.54309 };

    let destinations_: Array<any> = [];

    // set the destinations in each branches (places)

    for (let place of places){
      let coord = { lat: place.latitude, lng: place.longitude };
      destinations_.push(coord);
    }

    const request = {
      origins: [origin],
      destinations: destinations_,
      unitSystem: google.maps.UnitSystem.METRIC,
      travelMode: google.maps.TravelMode.DRIVING
    }

    //request the distance using google distance matrix
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(request).then((response: any) => {
        resolve(response);
      }, (err: any) => { reject(err) });
    })
    
  }


}
