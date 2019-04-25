@isTest
private class QuickLeadTest {
    
		@IsTest
		static void methodName(){
			System.Test.startTest();
				QuickLead.addQuickLead('firstName', 'lastName', 'company', 'email@email.com', '');
			System.Test.stopTest();
			
			List<Lead> leads = [SELECT FirstName, LastName FROM Lead];

			System.assertEquals(1, leads.size());
			System.assertEquals('firstName', leads[0].FirstName);
			System.assertEquals('lastName', leads[0].LastName);
		}
}
