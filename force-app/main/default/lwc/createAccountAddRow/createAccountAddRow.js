import { LightningElement,track } from 'lwc';
import saveAllAccount from '@salesforce/apex/CreateAccountAddRowController.saveAllAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateAccountAddRow extends LightningElement {
    @track newAccountsLst = [];
    @track showTable = false;

    addNew(event){
        
        console.log('Add button clicked ');
        console.log('Before @@@');
        console.log(this.newAccountsLst.length);
        
        let newAccount = {
                            Name : "",
                            Phone : "",
                            AccountNumber : ""
                        };
        this.newAccountsLst.push({key:this.newAccountsLst.length,value:newAccount});
        this.showTable = true;
        console.log('After @@@');
        console.log(this.newAccountsLst.length);                
        console.log(this.newAccountsLst);                
    }

    handleDelete(event){
        console.log('handle delete clicked');
        var indexSelected = event.target.className;
        console.log(indexSelected);
        this.newAccountsLst.splice(indexSelected,1);
        var i ;
        for(i=0 ; i < this.newAccountsLst.length ; i++){
            var accountdata = this.newAccountsLst[i];
            accountdata.key = i;
        }
        // var j ;
        // for(j=0 ;j <this.newAccountsLst.length ; j++){
        //     var accountdata = this.newAccountsLst[j];
        //     console.log(j);
        //     console.log(accountdata.key);
        //     console.log(accountdata.value);
        // }
        
    }

    handleNameChange(event){
        var indexSelected = event.target.name;
        console.log('Index selected');
        console.log(indexSelected);
        this.newAccountsLst[indexSelected].value.Name = event.target.value;
        console.log(this.newAccountsLst[indexSelected].value);        
    }

    handleNumberChange(event){
        var indexSelected = event.target.name;
        console.log('Index selected');
        console.log(indexSelected);
        this.newAccountsLst[indexSelected].value.AccountNumber = event.target.value;
        console.log(this.newAccountsLst[indexSelected].value);
    }

    handlePhoneChange(event){
        var indexSelected = event.target.name;
        console.log('Index selected');
        console.log(indexSelected);
        this.newAccountsLst[indexSelected].value.Phone = event.target.value;
        console.log(this.newAccountsLst[indexSelected].value);
    }

    saveAll(event){
        console.log('Save all called @@@');
        let newAccountInsertLst = [];
        //console.log(this.newAccountsLst);
        this.newAccountsLst.forEach(function(item){
            console.log(item.value);
            newAccountInsertLst.push(item.value);
        })
        
        saveAllAccount({acclst : newAccountInsertLst})
        .then(result => {
            console.log(result);
            if(result){
                this.newAccountsLst = [];
                this.showTable = false;
                const evt = new ShowToastEvent({
                    title: 'Success !',
                    message: 'The Accounts are created successfully!',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            }else{
                console.log('Some problem');
            }
        })
        .catch(error =>{
            console.log('Error @@@@');
            console.log(error);
        })
    }
}