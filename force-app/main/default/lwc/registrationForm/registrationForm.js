import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContact from '@salesforce/apex/ContactController.createContact';
import uploadFile from '@salesforce/apex/ContactController.uploadFile';

export default class RegistrationForm extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track day = '';
    @track month = '';
    @track year = '';
    @track avatar;
    @track avatarUrl = 'https://lh3.googleusercontent.com/a/ACg8ocK9XdploX3EKyBbIZj-CUl-nbkB3QWX4WL_tGNRrouDh3fjwTuY=s96-c';

    days = Array.from({ length: 31 }, (_, i) => ({ label: String(i + 1), value: String(i + 1) }));
    months = [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' }
    ];
    years = Array.from({ length: 100 }, (_, i) => ({ label: String(2024 - i), value: String(2024 - i) }));

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleDateChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleAvatarChange(event) {
        this.avatar = event.target.files[0];
        this.avatarUrl = URL.createObjectURL(this.avatar);
    }

    triggerFileInput() {
        this.template.querySelector('#avatarUpload').click();
    }

    async handleSubmit() {
        const fields = ['firstName', 'lastName', 'email', 'day', 'month', 'year'];
        let valid = true;
    
        fields.forEach(field => {
            if (!this[field]) {
                valid = false;
            }
        });
    
        if (valid) {
            try {
                // Create the Contact record
                // Construct the date with correct time zone handling
                const birthdate = new Date(`${this.year}-${this.month.padStart(2, '0')}-${this.day.padStart(2, '0')}T00:00:00Z`);
                const contactId = await createContact({ 
                    firstName: this.firstName, 
                    lastName: this.lastName, 
                    email: this.email, 
                    birthdate: birthdate
                });
    
                // Upload the file to the ContentDocument
                if (this.avatar) {
                    console.log(this.avatar)
                    const base64 = await this.toBase64(this.avatar);
                    console.log({
                        fileName: 'Photo',
                        base64Data: base64,
                        recordId: contactId
                    })
                    await uploadFile({
                        fileName: 'Photo',
                        base64Data: base64,
                        recordId: contactId
                    });
                }
    
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created successfully',
                        variant: 'success'
                    })
                );
    
                // Clear form fields
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.day = '';
                this.month = '';
                this.year = '';
                this.avatar = null;
                this.avatarUrl = null;
            } catch (error) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating contact',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            }
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please fill out all required fields.',
                    variant: 'error'
                })
            );
        }
    }
    

    toBase64(file) {
        console.log('toBase64')
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }
}
