public  class CreateAccountAddRowController {
    @AuraEnabled
    public static string saveAllAccount(List<Account> acclst){
        System.debug(acclst);
        if(acclst != null  && acclst.size() > 0){
            insert acclst;
        }

        return 'success';
    }
}
