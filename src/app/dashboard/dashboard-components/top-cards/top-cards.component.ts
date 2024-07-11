import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards:topcard[];
  dataListAllFormDA: any[] = [];
  dataListFormITCM: any[] = [];
  dataListAllBA: any[] = [];

  constructor() { 

    this.topcards=topcards;
    
  }

  ngOnInit(): void {
    this.fetchDataFormDA();
    this.fetchDataFormITCM();
    this.fetchAllDataBA();
  }

  fetchDataFormDA(): void {
    axios.get(`${environment.apiUrl2}/dampak/analisa`)
      .then(response => {
        this.dataListAllFormDA = response.data;
        console.log(response.data);
        this.topcards[0].subtitle = this.dataListAllFormDA.length;

      })
      .catch(error => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        }
      });
  }

  fetchDataFormITCM() {
    axios.get(`${environment.apiUrl2}/form/itcm`)
      .then(response => {
        this.dataListFormITCM = response.data;
        console.log(response.data)
        this.topcards[1].subtitle = this.dataListFormITCM.length;})
      .catch(error => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        } else if (error.response.status === 404) {
          console.log(error.response.data.message)
        }
      });
  }

  fetchAllDataBA(): void {
    axios.get(`${environment.apiUrl2}/form/ba`)
      .then((response) => {
        console.log(response.data);
        this.dataListAllBA = response.data;
        this.topcards[2].subtitle = this.dataListAllBA.length;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 500) {
          console.log(error.response.data.message);
        }
      });
  }
}
