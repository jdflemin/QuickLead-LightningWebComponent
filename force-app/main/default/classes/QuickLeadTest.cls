@isTest
private class QuickLeadTest {
    
		// success inserting one lead
		@IsTest
		static void successLeadInsert(){
			System.Test.startTest();
				QuickLead.addQuickLead('firstName', 'lastName', 'company', 'email@email.com', '');
			System.Test.stopTest();
			
			List<Lead> leads = [SELECT FirstName, LastName FROM Lead];

			System.assertEquals(1, leads.size());
			System.assertEquals('firstName', leads[0].FirstName);
			System.assertEquals('lastName', leads[0].LastName);
		}
}
