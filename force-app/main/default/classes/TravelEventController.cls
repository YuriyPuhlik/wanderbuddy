public without sharing class TravelEventController {

    @AuraEnabled
    public static String getApplicationState() {
        try {
            List<Travel_Event_Member__c> members = [
                SELECT Id, Status__c FROM Travel_Event_Member__c
                WHERE Event__c = :Utils.HikingEvent.Id
                AND Traveler__c = :Utils.CurrentContact.Id
            ];
            return !members.isEmpty() ? members[0].Status__c : null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void joinEvent() {
        try {    
            insert new Travel_Event_Member__c(
                Traveler__c = Utils.CurrentContact.Id,
                Event__c = Utils.HikingEvent.Id,
                Status__c = 'Applied'
            );
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}