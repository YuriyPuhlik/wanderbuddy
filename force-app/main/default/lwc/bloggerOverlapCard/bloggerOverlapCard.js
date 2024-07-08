import {LightningElement, api} from 'lwc';

export default class BloggerOverlapCard extends LightningElement {
    @api imgSrc;
    @api name;
    @api value;
}