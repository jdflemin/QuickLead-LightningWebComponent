public with sharing class QuickLead {

	/*
	* @description maps user input into a lead object and inserts/returns the lead
	* @method addQuickLead
	* @param {String} firstName 
	* @param {String} lastName
	* @param {String} company
	* @param {String} email
	* @param {String} phone
	* @return {Lead} newLead
	*
	*/
	@AuraEnabled
	public static Lead addQuickLead(String firstName, String lastName, String company, String email, String phone) {
		Lead newLead = new Lead(
			FirstName = firstName,
			LastName = lastName,
			Company = company
		);

		if (!String.isEmpty(email)) newLead.Email = email;
		if (!String.isEmpty(phone)) newLead.Phone = phone;
		
		insert newLead;
		return newLead;	
	}

}
