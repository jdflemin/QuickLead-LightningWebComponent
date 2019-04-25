public with sharing class QuickLead {

	@AuraEnabled
	public static Lead addQuickLead(String firstName, String lastName, String company, String email, String phone) {
		System.debug('here');
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
