import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { LoginPage } from '../login/login';
import { Location } from '../../models/location.interface';
import { AngularFirestore } from 'angularfire2/firestore';

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

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public geolocation: Geolocation,
      public firestore: AngularFirestore
      ) { }

  //insert location in Firebase DB
  insertLocation(
    location: Location
  ): Promise<void> {
    const id = this.firestore.createId();
    console.log(id);
    return this.firestore.doc(`locations/${id}`).set(location);
}

  ionViewDidLoad() //runs when the view is loaded
  {
    this.loadMap();
  }

  loadMap()
  {

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = 
      {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      let location: Location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        timestamp: position.timestamp
      };

      console.log(location);
      this.insertLocation(location);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    })

    // let position = await this.geolocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 30000,
    //   maximumAge: 60000
    // });

    
  }

  addMarker()
  {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = marker.position;
    console.log("content: " + content)

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content)
  {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })
  }

  goToLoginPage()
  {
    this.navCtrl.push(LoginPage);
  }

}
