import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from 'src/app/services/map/map.service';
import { Browser } from '@capacitor/browser';

declare var google: any;

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.page.html',
  styleUrls: ['./branch-detail.page.scss'],
})
export class BranchDetailPage implements OnInit {
  public latitude: any;
  public longitude: any;

  constructor(public activatedRoute: ActivatedRoute, public map: MapService) { 
    this.latitude = this.activatedRoute.snapshot.paramMap.get('latitude'); 
    this.longitude = this.activatedRoute.snapshot.paramMap.get('longitude'); 
  }

  ngOnInit() {
    this.initMap();
  }

  //

  async navigateGoogleMap(){
    // Open in-app browser
    /**
     * 1. Install Capacitor plugin for in app browser. follow steps in https://capacitorjs.com/docs/apis/browser
       2. Get current location
       3. Sample URL: https://www.google.com/maps/dir/3.1981472,101.6976256/3.2571357,101.6552533
       4. Call in app browser with URL as above (need to change the current & destination)
     */
    //get current location
    let current_location: any = this.map.getSavedCoords();
    let fullGoogleMapDirection: string = `https://www.google.com/maps/dir/${current_location.latitude},${current_location.longitude}/${this.latitude},${this.longitude}`;

    await Browser.open({ url: fullGoogleMapDirection });
  }

  initMap() {
    // Create Map
    /**
     * 1. Get Google Map API key from Google Developer account
     * 2. Include Google map api in index.html
     * 3. Add Google map function as below
     * 4. Add div id="map" and set the css
     */
    const branch_location = { lat: Number(this.latitude), lng: Number(this.longitude) };
    // The map, centered 
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: branch_location,
    });

    const infowindow = new google.maps.InfoWindow({
      content: "<div style='color: black'>Lembaga Zakat Selangor</div>",
    });
  
    const marker = new google.maps.Marker({
      position: branch_location,
      map,
      title: "Lembaga Zakat Selangor",
    });
  
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });

  }

}
