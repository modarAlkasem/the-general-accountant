<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EntryAccount;
use App\Models\LedgerAccount;
use App\Models\Account;
    

class EntryAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    public function getEntriesAccounts($docId){
        $entriesAccounts  = EntryAccount::where('document_id' , '=' , intval($docId))->orderBy('entry_account_id' , 'asc')->get();
        $index =0;
        $parentAccount = null;
        $account = null;
        $count = 1;
        $entryAccountsIds = [];
        
        $transformedEntriesAccounts = [];
        foreach( $entriesAccounts as $entryAccount ){
            array_push($entryAccountsIds ,$entryAccount->account_id );
            $account = Account::find($entryAccount->account_id);
            $parentAccount =Account::find($account->parent_account_id);
            $index = "$parentAccount->child_number"."$account->child_number";
            $parentAccount  = Account::find($parentAccount->parent_account_id );
            $index = "$parentAccount->child_number".$index;
            if($entryAccount->type==0){
                array_push($transformedEntriesAccounts , ["rowId"=>$count,"accountNameAndIndex"=>"$index"."-"."$account->name", 
                                                      "description"=>$entryAccount->description ,"credit"=>"$entryAccount->amount",
                                                        "debit"=>'',"date"=>$entryAccount->date , "correspondingAcc"=>'']);   
            }elseif($entryAccount->type==1){
                array_push($transformedEntriesAccounts , ["rowId"=>$count,"accountNameAndIndex"=>"$index"."-"."$account->name", 
                                                      "description"=>$entryAccount->description ,"credit"=>'',
                                                        "debit"=>"$entryAccount->amount","date"=>$entryAccount->date, "correspondingAcc"=>'']);   
                
            }
            $count++;

            
            
        }
        return ["transformedEntriesAccounts"=>$transformedEntriesAccounts , "entryAccountsIds"=>$entryAccountsIds];
        
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($data , $foundId , $docId)
    {
        $ledgerAccountId = 0;
        $ledgerAccount = null;
        $flag = -1;
        $credit_balance = 0;
        $debit_balance = 0;
        
        $entryAccount = new EntryAccount();
        if($data['credit']!=''){
            $entryAccount->amount = intval($data['credit']);
            $entryAccount->type = 0;//for credit type=0 and for debit =1
            $flag= 0;
            
            
        }elseif($data['debit']!=''){
            $entryAccount->amount = intval($data['debit']);
            $entryAccount->type = 1;
            $flag = 1;
        }
        $entryAccount->account_id = $data['accountId'];
        $date = strtotime($data['date']);
        $entryAccount->date = date('y-m-d',$date);
        $entryAccount->description = $data['description'];
        $entryAccount->document_id = $docId;
        $ledgerAccount = LedgerAccount::where('account_id' , '=' , $data['accountId'])->get();
        $ledgerAccountId= $ledgerAccount[0]->ledger_account_id;
        $entryAccount->ledger_account_id = $ledgerAccountId;
        $entryAccount->save();
        if($flag==0){
            $credit_balance = $ledgerAccount[0]->credit_balance+$entryAccount->amount;
            $ledgerAccount[0]->credit_balance = $credit_balance;
            
        }elseif($flag==1){
            $debit_balance = $ledgerAccount[0]->debit_balance+$entryAccount->amount;
            $ledgerAccount[0]->debit_balance = $debit_balance;
            
        }
        $ledgerAccount[0]->balance = $debit_balance - $credit_balance;
        $ledgerAccount[0]->save();
        
        
        
    }
    
    public function destroyEntriesAccounts($docId){
        $convertedDocId = intval($docId);
        $entriesAccounts  = EntryAccount::where('document_id' , '=' , $convertedDocId )->get();
        $ledgerAccount = null;
        $creditBalance = 0;
        $debitBalance = 0;
        $balance = 0;
        foreach(  $entriesAccounts as $entryAccount){
            
            $ledgerAccount = LedgerAccount::find($entryAccount->ledger_account_id);
            if($entryAccount->type==0){
                $creditBalance = $ledgerAccount->credit_balance - $entryAccount->amount ;
                $balance = $ledgerAccount->debit_balance - $creditBalance ;
                $ledgerAccount->credit_balance = $creditBalance;
                $ledgerAccount->balance =$balance;
                $ledgerAccount->save();
                $entryAccount->delete();
                   
            }elseif($entryAccount->type==1){
                $debitBalance = $ledgerAccount->debit_balance - $entryAccount->amount ;
                $balance = $debitBalance -$ledgerAccount->credit_balance ;
                $ledgerAccount->debit_balance =  $debitBalance;
                $ledgerAccount->balance =$balance;
                $ledgerAccount->save();
                $entryAccount->delete();
                
            }
            $ledgerAccount = null;
            $creditBalance = 0;
            $debitBalance = 0;
            $balance = 0;
            
            
            
            
            
        }
        
        
    }
    
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
