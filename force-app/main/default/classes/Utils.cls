public without sharing class Utils {

    private static final String EVENT_NAME = '2-day Hiking at Arrábida Park';

    public class PortalException extends Exception {}

    public static Contact CurrentContact {
        get {
            if (CurrentContact == null) {
                User user = [SELECT Id, ContactId FROM User WHERE Id = :UserInfo.getUserId()];
                List<Contact> contacts = [SELECT Id, FirstName, LastName, Name, Email FROM Contact WHERE Id = :user.ContactId];
                if (contacts.isEmpty()) {
                  throw new PortalException('User not found');
                }
                CurrentContact = contacts[0];
            }
            return CurrentContact;
        }
        private set;
    }

    public static Travel_Event__c HikingEvent {
        get {
            if (HikingEvent == null) {
                HikingEvent = [SELECT Id, Organiser__c, Number_of_People__c FROM Travel_Event__c WHERE Name = :EVENT_NAME];
            }
            return HikingEvent;
        }
        private set;
    }
}