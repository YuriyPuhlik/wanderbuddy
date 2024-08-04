import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import hikeImg from '@salesforce/resourceUrl/Hike_Img';
import joinEvent from '@salesforce/apex/TravelEventController.joinEvent';
import getApplicationState from '@salesforce/apex/TravelEventController.getApplicationState';

export default class EventHiking extends LightningElement {
    hikeImgUrl = hikeImg;
    description = `📍 Join us for a weekend hiking adventure in Sesimbra!
    
    🚌  Meet at 10:00 AM on Saturday at Praça de Espanha, Lisbon, and take Bus No. 1234 at 10:30 AM.
    
    🛏  We'll camp overnight in tents , explore secret beaches, and enjoy guided climbing sessions. 
    
    🚌  Return to Lisbon on Sunday at 7:00 PM via Bus No. 4321.
    
    👕 🩳 🧢  Bring your camping gear, swimwear, and snacks for an unforgettable nature escape!`;

    isCollapsed = true;
    applicationStatus;
    loading = false;

    get shortDescription() {
        const approxLineLength = 54;
        const numberOfLines = 4;
        return this.description.substring(0, approxLineLength * numberOfLines) + (this.description.length > approxLineLength * numberOfLines ? '...' : '');
    }

    get applied() {
        return this.applicationStatus === 'Applied';
    }

    get approved() {
        return this.applicationStatus === 'Approved';
    }

    get rejected() {
        return this.applicationStatus === 'Rejected';
    }

    get canJoin() {
        return !this.applicationStatus;
    }

    expandDescription() {
        this.isCollapsed = false;
    }

    collapseDescription() {
        this.isCollapsed = true;
    }

    async handleJoin() {
        try {
            await joinEvent();
            this.applicationStatus = 'Applied';

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Join request sent!',
                    variant: 'success'
                })
            );
        } catch (error) {
            this.applicationStatus = null;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    async getState() {
        try {
            this.applicationStatus = await getApplicationState();
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    connectedCallback() {
        this.getState();
    }
}