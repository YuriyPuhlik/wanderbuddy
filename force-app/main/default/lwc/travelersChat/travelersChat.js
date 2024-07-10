import { LightningElement } from 'lwc';
import person1Image from '@salesforce/resourceUrl/Person1';
import BackgroundImg from '@salesforce/resourceUrl/Chat_Background_Img';

export default class TravelersChat extends LightningElement {
    person1ImageUrl = person1Image;
    imageUrl = BackgroundImg;
    
    get chatBackgroundStyle(){
        return `background-image:url("${this.imageUrl}")`;
    }
}