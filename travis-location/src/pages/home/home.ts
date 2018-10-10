import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google; //prevents TypeScript warnings about the google object

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage 
{

  @ViewChild('map') 
  mapElement: ElementRef; //member variable that references the map element
              //the one we added #map to in home.html
  map: any; //member variable to hold our map

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  }

  ionViewDidLoad() //runs when the view is loaded
  {
    this.loadMap();
  }

  loadMap()
  {
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = 
    {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
