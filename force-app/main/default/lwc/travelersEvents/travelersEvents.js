import { LightningElement } from 'lwc';
import sunsetBoatTripImg from '@salesforce/resourceUrl/Sunset_Boat_Trip';
import castlesImg from '@salesforce/resourceUrl/Castles';
import lisbonImg from '@salesforce/resourceUrl/City_Tour';
import fadoMusicImg from '@salesforce/resourceUrl/Fado_Music';

export default class TravelersEvents extends LightningElement {
    sunsetBoatTripImgUrl = sunsetBoatTripImg;
    castlesImgUrl = castlesImg;
    fadoMusicImgUrl = fadoMusicImg;
    lisbonImgUrl = lisbonImg;
}