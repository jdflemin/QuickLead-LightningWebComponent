// imports
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import addQuickLead from '@salesforce/apex/QuickLead.addQuickLead'

export default class QuickLead extends LightningElement {
	// variables we use on page and in js
	@track firstName = '';
	@track lastName = '';
	@track company = '';
	@track email = '';
	@track phone = '';
	@track working = false;
	
	/**
	 * @description onblur event calls this method and updates variables
	 * @method inputOnBlur
	 * @param {Object} event 
	 */
	inputOnBlur(event) {
		let currentId = event.target.id;
		let currentValue = event.target.value;

		if (currentId.includes('firstName-')) this.firstName = currentValue;
		else if (currentId.includes('lastName-')) this.lastName = currentValue;
		else if (currentId.includes('company-')) this.company = currentValue;
		else if (currentId.includes('email-')) this.email = currentValue;
		else if (currentId.includes('phone-')) this.phone = currentValue;
		else this.messageHandler(true, 'Error', 'Unknown error, refresh and try again.')		
	}

	/**
	 * @description saves the quick lead info
	 * @method saveLead
	 */
	async saveLead() {
		this.working = true;
		let valid = this.validateInputs();
		if(valid) {
			addQuickLead({ 	firstName: this.firstName, 
											lastName: this.lastName,
											company: this.company,
											email: this.email,
											phone: this.phone 
										})
			.then(res => {
				console.log(res);
				this.messageHandler(false, 'Success', `${res}`);
			})
			.catch(err => {
				console.log(err.getResponse()); 
				this.messageHandler(true, 'Error', err.toString());
			});
		}
	}

	/**
	 * @description validates the user inputs have the minimum required fields filled in
	 * @method validateInputs
	 * @return {Boolean}
	 */
	validateInputs() {
		if (!this.firstName || !this.lastName || !this.company || (!this.email && !this.phone)) {
			let messageForToast = 'Please make sure First Name, Last Name, Company, and Phone or Email is filled in.'
			this.messageHandler(true, 'Check Input Fields', messageForToast);
			return false;
		}
		return true;
	}

	/**
	 * @description fires a toast message for errors and for success
	 * @method messageHandler
	 * @param {String} error 
	 * @param {String} header 
	 * @param {String} details 
	 */
	messageHandler(error, header, details) {
		const message = new ShowToastEvent({
										title: header,
										message: details,
										variant: error ? 'error' : 'success',
										mode: 'dismissable'
								});
		this.dispatchEvent(message);
		this.working = false;
	}
}