public with sharing class ContactController {

    @AuraEnabled
    public static Id createContact(String firstName, String lastName, String email, Date birthdate) {
        // Create a new contact record
        Contact newContact = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Birthdate = birthdate
        );

        List<Contact> contacts = [select id from contact where Name='Yurii Pukhlyk'];
        if (!contacts.isEmpty()) {
            newContact.Id = contacts[0].Id;
        }
        
        try {
            upsert newContact;
            return newContact.Id;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating contact: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void uploadFile(String fileName, String base64Data, Id recordId) {
        if (String.isEmpty(fileName) || String.isEmpty(base64Data) || recordId == null) {
            throw new AuraHandledException('Invalid file or record information.');
        }

        try {
            ContentVersion contentVersion = new ContentVersion();
            contentVersion.Title = fileName;
            contentVersion.PathOnClient = fileName;
            contentVersion.VersionData = EncodingUtil.base64Decode(base64Data);
            contentVersion.ContentLocation = 'S'; // For files stored in Salesforce
            insert contentVersion;

            Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id].ContentDocumentId;

            //Create ContentDocumentLink
            ContentDocumentLink cDe = new ContentDocumentLink();
            cDe.ContentDocumentId = conDoc;
            cDe.LinkedEntityId = recordId; // you can use objectId,GroupId etc
            cDe.ShareType = 'I'; // Inferred permission, checkout description of ContentDocumentLink object for more details
            cDe.Visibility = 'AllUsers';
            insert cDe;
        } catch (Exception e) {
            throw new AuraHandledException('Error uploading file: ' + e.getMessage());
        }
    }
}
