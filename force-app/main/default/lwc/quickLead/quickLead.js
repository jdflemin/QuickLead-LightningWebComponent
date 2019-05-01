// imports
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// built in method for inserting records 
import { createRecord } from 'lightning/uiRecordApi';
// Lead imports
import LEAD_OBJECT from '@salesforce/schema/Lead';
import LEAD_FIRST_NAME from '@salesforce/schema/Lead.FirstName';
import LEAD_LAST_NAME from '@salesforce/schema/Lead.LastName';
import LEAD_COMPANY from '@salesforce/schema/Lead.Company';
import LEAD_PHONE from '@salesforce/schema/Lead.Phone';
import LEAD_EMAIL from '@salesforce/schema/Lead.Email';

export default class QuickLead extends LightningElement {
	// variables we use on page and in js
	@track firstName;
	@track lastName;
	@track company;
	@track email;
	@track phone;
	@track working = false;

	/**
	 * @description call the constructor to setup the inputs
	 * @method constructor
	 */
	constructor() {
		super();
		this.setInputs();
		let self = this;
		this.template.addEventListener('keydown', function(event) {
			if(event.key === 'Enter'){
				self.createLead();
			} 
		}, true);
	}

	/**
	 * @description creates the new lead from the input fields
	 * @method createLead
	 */
	createLead() {
		this.working = true;
		const fields = {};		
		let valid = this.validateInputs();
		if (valid) {
			fields[LEAD_FIRST_NAME.fieldApiName] = this.firstName;
			fields[LEAD_LAST_NAME.fieldApiName] = this.lastName;
			fields[LEAD_COMPANY.fieldApiName] = this.company;
			fields[LEAD_PHONE.fieldApiName] = this.phone;
			fields[LEAD_EMAIL.fieldApiName] = this.email;
			const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };	
			createRecord(recordInput)
			.then(res => {
				this.messageHandler(false, 'Success', `${res.fields.FirstName.value} ${res.fields.LastName.value} was successfully created`);
			})
			.catch(err => {
				this.messageHandler(true, 'Error', err.body.message);
			});
		}
	
	}
	
	/**
	 * @description onblur event calls this method and updates variables
	 * @method inputOnBlur
	 * @param {Object} event 
	 */
	inputOnChange(event) {
		let currentName = event.target.name;
		let currentValue = event.target.value;

		if (currentName === 'firstName') this.firstName = currentValue;
		else if (currentName === 'lastName') this.lastName = currentValue;
		else if (currentName === 'company') this.company = currentValue;
		else if (currentName === 'email') this.email = currentValue;
		else if (currentName === 'phone')  this.phone = currentValue;
		else this.messageHandler(true, 'Error', 'Unknown error, refresh and try again.')		
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
		if (!error) this.setInputs();
		const message = new ShowToastEvent({
										title: header,
										message: details,
										variant: error ? 'error' : 'success',
										mode: 'sticky'
								});
		this.dispatchEvent(message);
		this.working = false;
	}

	/**
	 * @description sets inputs to blank strings
	 * @method setInputs
	 */
	setInputs() {
		this.firstName = '';
		this.lastName = '';
		this.company = '';
		this.email = '';
		this.phone = '';
	}
}
