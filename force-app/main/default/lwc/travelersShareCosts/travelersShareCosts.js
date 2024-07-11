import { LightningElement } from 'lwc';
import person1Image from '@salesforce/resourceUrl/Person1';
import person2Image from '@salesforce/resourceUrl/Person2';
import person3Image from '@salesforce/resourceUrl/Person3';

export default class TravelersShareCosts extends LightningElement {
    person1ImageUrl = person1Image;
    person2ImageUrl = person2Image;
    person3ImageUrl = person3Image;
}