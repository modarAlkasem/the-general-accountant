<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LedgerAccount;
use App\Models\EntryAccount;
use App\Models\Document;
use App\Models\Foundation;
use App\Models\Account;
use Excel ;
use App\Exports\LedgerExport;
use App\Exports\TrialBalanceExport;
use App\Exports\FinalAccountExport;

class LedgerAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($accountId , $foundId )
    {
        $ledgerAccount = new LedgerAccount();
        $ledgerAccount->account_id = $accountId;
        $ledgerAccount->balance =0;
        $ledgerAccount->debit_balance = 0;
        $ledgerAccount->credit_balance =0;
        $ledgerAccount->foundation_id =  $foundId;
        $ledgerAccount->save();
        
        
        
    }
    
    
    public function show($foundId , $accountId){
        $convertedAccountId = intval($accountId);
        $documents = Document::where('foundation_id' , '=' , intval($foundId))->orderBy('document_id','asc')->get();
        $ledgerAccount = LedgerAccount::where('account_id' , '=',$convertedAccountId )->get();
        $ledgerAccount = $ledgerAccount[0];
        $entriesAccount = EntryAccount::where('ledger_account_id' , '=' ,$ledgerAccount->ledger_account_id )->orderBy('entry_account_id','asc')->get();
        $transformedEntriesAccount = [];
        $docNum = 1;
        $ledgerPage = [];
        $data = [];
        
        foreach($entriesAccount as $entryAccount){
            
            foreach($documents as $document){
                if($document->document_id==$entryAccount->document_id){
                    break;
                }
                
                $docNum++;
                
            }
            if($entryAccount->type==1){
                $data = ['entry_account_id'=>$entryAccount->entry_account_id , 'date'=>$entryAccount->date , 'description'=>$entryAccount->description , 'credit'=>'','debit'=>$entryAccount->amount , 'docNum'=>$docNum , 'docId'=>$entryAccount->document_id]  ;                  
        
            }elseif($entryAccount->type==0){
                $data = ['entry_account_id'=>$entryAccount->entry_account_id , 'date'=>$entryAccount->date , 'description'=>$entryAccount->description , 'credit'=>$entryAccount->amount,'debit'=>'' , 'docNum'=>$docNum , 'docId'=>$entryAccount->document_id]  ; 
            }
            array_push($transformedEntriesAccount , $data);
            $data  = [];
            
               
        }
        
        $ledgerPage = ['AccountCreditBalance'=>$ledgerAccount->credit_balance , 'AccountDebitBalance'=>$ledgerAccount->debit_balance , 'accountBalance'=>$ledgerAccount->balance , 'content'=>$transformedEntriesAccount];
        
        return response()->json(['data'=>$ledgerPage , 'message'=>'Ledger Page Created Successfully'],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET') ->header('Access-Control-Allow-Headers', '*');
        
        
        
        
    }
    
    
    public function exportLedger($foundId , $accountId){
        
        $convertedAccountId = intval($accountId);
        $documents = Document::where('foundation_id' , '=' , intval($foundId))->orderBy('document_id','asc')->get();
        $ledgerAccount = LedgerAccount::where('account_id' , '=',$convertedAccountId )->get();
        $ledgerAccount = $ledgerAccount[0];
        $entriesAccount = EntryAccount::where('ledger_account_id' , '=' ,$ledgerAccount->ledger_account_id )->orderBy('entry_account_id','asc')->get();
        $transformedEntriesAccount = [];
        $docNum = 1;
        $data = [];
        $foundation = Foundation::find(intval($foundId));
        $fileName= "$foundation->name".'_دفتر الأستاذ'.'_'.date("Y").'.xlsx';
        
        foreach($entriesAccount as $entryAccount){
            
            foreach($documents as $document){
                if($document->document_id==$entryAccount->document_id){
                    break;
                }
                
                $docNum++;
                
            }
            if($entryAccount->type==1){
                $data = ['date'=>$entryAccount->date , 'description'=>$entryAccount->description , 'credit'=>'','debit'=>$entryAccount->amount , 'docNum'=>$docNum ]  ;                  
        
            }elseif($entryAccount->type==0){
                $data = [ 'date'=>$entryAccount->date , 'description'=>$entryAccount->description , 'credit'=>$entryAccount->amount,'debit'=>'' , 'docNum'=>$docNum ]  ; 
            }
            array_push($transformedEntriesAccount , $data);
            $data = [];
            
               
        }
        
    return Excel::download(new LedgerExport($transformedEntriesAccount),$fileName);
    }
    
    
    public function getTrialBalance($foundId , $accountId){
       
        $response = $this->formTrialBalance($foundId ,$accountId );
        return response()->json(["data"=>$response , "message"=>'Trial Balance Created Successfully'],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET') ->header('Access-Control-Allow-Headers', '*');
        
    }
    
    public function exportTrialBalance($foundId , $accountId){
        
        
        $trialBalance = $this->formTrialBalance($foundId ,$accountId );
        return Excel::download(new TrialBalanceExport($trialBalance),'ميزان_المراحعة.xlsx');
        
        
        
    }
    
    
    public function formTrialBalance($foundId , $accountId){

        $ledgerAccount = LedgerAccount::where('account_id', '=',intval($accountId))->get();
        $ledgerAccount = $ledgerAccount[0];
        $ledgerAccountBalance = $ledgerAccount->balance;
        $balance = 0;
        $account = Account::find($accountId);
        $index = 0;
        $parentAccount = null;
        $searchResults = [];
        $parentAccount = Account::find($account->parent_account_id);
        $index = $parentAccount->child_number;
        $parentAccount  = Account::find($parentAccount->parent_account_id);
        $index = "$parentAccount->child_number"."$index".$account->child_number;
        $response = [];
        
        if($ledgerAccountBalance>0){
            $balance = $ledgerAccountBalance;
            $response = [['accountNameAndIndex'=>$index.'-'.$account->name , 'creditBalance'=>$balance , 'debitBalance'=>'']];
            
        }elseif($ledgerAccountBalance<0){
            $balance = -1*$ledgerAccountBalance;
            $response = [['accountNameAndIndex'=>$index.'-'.$account->name , 'creditBalance'=>'' , 'debitBalance'=>$balance]];
        }elseif($ledgerAccountBalance ==0 && $ledgerAccount->credit_balance==0 && $ledgerAccount->debit_balance==0 ){
            $response = [['accountNameAndIndex'=>'-', 'creditBalance'=>'-' , 'debitBalance'=>'-']];
        }elseif($ledgerAccountBalance ==0 && $ledgerAccount->credit_balance!=0 && $ledgerAccount->debit_balance!=0 ){
            $response = [['accountNameAndIndex'=>'-', 'creditBalance'=>0 , 'debitBalance'=>0]];
        }
        
        return $response;
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function getFinalAccount($foundId , $accountId){
        
        
        
        $finalAccountName = Account::find(intval($accountId))->name;
        if(strpos($finalAccountName , 'متاجرة')){
            $response = $this->formTradingAccount($foundId , $accountId);
            return response()->json(['data'=>$response , 'message'=>'A Trading Account Created Successfully'],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET') ->header('Access-Control-Allow-Headers', '*');
            
        }
        
        
        
        
        
        
        
    }
    
    public function formTradingAccount($foundId , $accountId){
        
        
        $contentDebit = [];
        $contentCredit = [];
        $creditBalance = 0;
        $debitBalance = 0;
        $tradingAccountBalance = 0;
        $tradingAccountDebitSum = 0;
        $tradingAccountCreditSum = 0;
        $creditAmounts = [];
        $debitAmounts = [];
        $ledgerAccount = null;
        $balance = 0;
        $resultContent =[];
        $contentCreditLength = 0;
        $contentDebitLength = 0;
        $firstTermMerchandise = $this->calculateFirstLevelAccBalance(7 , 25);
        

        if($firstTermMerchandise['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$firstTermMerchandise['balance'],'accountNameAndIndex'=>$firstTermMerchandise['accountNameAndIndex']]) ; 
           array_push( $creditAmounts ,-1*$firstTermMerchandise['balance'] );
        }elseif($firstTermMerchandise['balance']>0){
          array_push($contentDebit , ['balance'=>$firstTermMerchandise['balance'],'accountNameAndIndex'=>$firstTermMerchandise['accountNameAndIndex']]) ;
            array_push( $debitAmounts ,$firstTermMerchandise['balance'] );
        }
        
        /*----------------------------------------------------------------------------------------------------------------------*/
        
        $lastTermMerchandise =$this->calculateFirstLevelAccBalance(7 , 26);
        if($lastTermMerchandise['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$lastTermMerchandise['balance'],'accountNameAndIndex'=>$lastTermMerchandise['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$lastTermMerchandise['balance'] );
        }elseif($lastTermMerchandise['balance']>0){
          array_push($contentDebit , ['balance'=>$lastTermMerchandise['balance'],'accountNameAndIndex'=>$lastTermMerchandise['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$lastTermMerchandise['balance'] );
        }
        
     /*----------------------------------------------------------------------------------------------------------------------*/
        $procurement = $this->calculateFirstLevelAccBalance(3 , 14);

        if($procurement['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$procurement['balance'],'accountNameAndIndex'=>$procurement['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$procurement['balance'] );
        }elseif($procurement['balance']>0){
          array_push($contentDebit , ['balance'=>$procurement['balance'],'accountNameAndIndex'=>$procurement['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$procurement['balance'] );
        }
        
          /*----------------------------------------------------------------------------------------------------------------------*/
        
        $procurementTransportExpenses = $this->calculateFirstLevelAccBalance(3 , 16);
        
        if($procurementTransportExpenses['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$procurementTransportExpenses['balance'],'accountNameAndIndex'=>$procurementTransportExpenses['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$procurementTransportExpenses['balance'] );
        }elseif($procurementTransportExpenses['balance']>0){
          array_push($contentDebit , ['balance'=>$procurementTransportExpenses['balance'],'accountNameAndIndex'=>$procurementTransportExpenses['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$procurementTransportExpenses['balance'] );
        }
        
        /*----------------------------------------------------------------------------------------------------------------------*/
        $purchaseReturns = $this->calculateFirstLevelAccBalance(3 , 15);
        
        if($purchaseReturns['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$purchaseReturns['balance'],'accountNameAndIndex'=>$purchaseReturns['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$purchaseReturns['balance'] );
        }elseif($purchaseReturns['balance']>0){
          array_push($contentDebit , ['balance'=>$purchaseReturns['balance'],'accountNameAndIndex'=>$purchaseReturns['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$purchaseReturns['balance'] );
        }
        
        /*----------------------------------------------------------------------------------------------------------------------*/
        $earnedDiscount = $this->calculateFirstLevelAccBalance(3 , 17);
        if($earnedDiscount['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$earnedDiscount['balance'],'accountNameAndIndex'=>$earnedDiscount['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$earnedDiscount['balance'] );
        }elseif($earnedDiscount['balance']>0){
          array_push($contentDebit , ['balance'=>$earnedDiscount['balance'],'accountNameAndIndex'=>$earnedDiscount['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$earnedDiscount['balance'] );
        }
      /*----------------------------------------------------------------------------------------------------------------------*/
        $sales = $this->calculateFirstLevelAccBalance(4 , 18);
        
        if($sales['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$sales['balance'],'accountNameAndIndex'=>$sales['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$sales['balance'] );
        }elseif($sales['balance']>0){
          array_push($contentDebit , ['balance'=>$sales['balance'],'accountNameAndIndex'=>$sales['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$sales['balance'] );
        }
      /*----------------------------------------------------------------------------------------------------------------------*/
        $returnSales = $this->calculateFirstLevelAccBalance(4 , 19);
        if($returnSales['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$returnSales['balance'],'accountNameAndIndex'=>$returnSales['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$returnSales['balance'] );
        }elseif($returnSales['balance']>0){
          array_push($contentDebit , ['balance'=>$returnSales['balance'],'accountNameAndIndex'=>$returnSales['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$returnSales['balance'] );
        }
        
      /*----------------------------------------------------------------------------------------------------------------------*/
        
        $salesEarnedDiscount = $this->calculateFirstLevelAccBalance(4 , 20);
        
        if($salesEarnedDiscount['balance']<0){
          array_push($contentCredit , ['balance'=>-1*$salesEarnedDiscount['balance'],'accountNameAndIndex'=>$salesEarnedDiscount['accountNameAndIndex']]) ;
            array_push( $creditAmounts ,-1*$salesEarnedDiscount['balance'] );
        }elseif($salesEarnedDiscount['balance']>0){
          array_push($contentDebit , ['balance'=>$salesEarnedDiscount['balance'],'accountNameAndIndex'=>$salesEarnedDiscount['accountNameAndIndex']]) ;  
            array_push( $debitAmounts ,$salesEarnedDiscount['balance'] );
        }
        
      /*----------------------------------------------------------------------------------------------------------------------*/
       
        
        $contentCreditLength =sizeof($contentCredit) ;
        $contentDebitLength = sizeof($contentDebit);
        if($contentCreditLength==$contentDebitLength){
            for($i=0;$i<$contentCreditLength;$i++){
                
                array_push($resultContent,['debitBalance'=>$contentDebit[$i]['balance'], 'accountNameAndIndexD'=>$contentDebit[$i]['accountNameAndIndex'], 'creditBalance'=>$contentCredit[$i]['balance'],'accountNameAndIndexC'=>$contentCredit[$i]['accountNameAndIndex']]);
                
            }
        }
        elseif($contentCreditLength>$contentDebitLength ){
            
            for($i=0;$i<$contentCreditLength;$i++){
                if($i>=$contentDebitLength){
                   array_push($resultContent,['debitBalance'=>'', 'accountNameAndIndexD'=>'', 'creditBalance'=>$contentCredit[$i]['balance'],'accountNameAndIndexC'=>$contentCredit[$i]['accountNameAndIndex']]); 
                }else{
                    array_push($resultContent,['debitBalance'=>$contentDebit[$i]['balance'], 'accountNameAndIndexD'=>$contentDebit[$i]['accountNameAndIndex'], 'creditBalance'=>$contentCredit[$i]['balance'],'accountNameAndIndexC'=>$contentCredit[$i]['accountNameAndIndex']]);

                }
            }
            
        }
        
        elseif($contentCreditLength<$contentDebitLength ){
            
            for($i=0;$i<$contentDebitLength;$i++){
                if($i>=$contentCreditLength){
                array_push($resultContent,['debitBalance'=>$contentDebit[$i]['balance'], 'accountNameAndIndexD'=>$contentDebit[$i]['accountNameAndIndex'], 'creditBalance'=>'','accountNameAndIndexC'=>'']);
                }else{
                    array_push($resultContent,['debitBalance'=>$contentDebit[$i]['balance'], 'accountNameAndIndexD'=>$contentDebit[$i]['accountNameAndIndex'], 'creditBalance'=>$contentCredit[$i]['balance'],'accountNameAndIndexC'=>$contentCredit[$i]['accountNameAndIndex']]);

                }
            }
            
        }
        

        foreach($creditAmounts as $creditAmount){
            
            $tradingAccountCreditSum = $tradingAccountCreditSum + $creditAmount;
        }
        foreach($debitAmounts as $debitAmount){
           $tradingAccountDebitSum = $tradingAccountDebitSum +  $debitAmount;
        }
        
        $tradingAccountBalance = $tradingAccountDebitSum - $tradingAccountCreditSum;
        
    return ['tradingAccountDebitSum'=>$tradingAccountDebitSum, 'tradingAccountCreditSum'=>$tradingAccountCreditSum, 'tradingAccountBalance'=>$tradingAccountBalance , 'tradingAccountContent'=>$resultContent];
    }
    

    
    
   public function calculateFirstLevelAccBalance($rootAccountId ,$accountId){
       $rootAccount = Account::find($rootAccountId);
       $account = Account::find($accountId);
       $accountRelatedAccounts = Account::where('parent_account_id','=',$account->account_id)->get(); 
        $creditBalance = 0;
        $debitBalance = 0;
        foreach($accountRelatedAccounts as $accountRelatedAccount){
            
            $ledgerAccount = LedgerAccount::where('account_id' ,'=',$accountRelatedAccount->account_id)->get();
            $ledgerAccount = $ledgerAccount[0];
            
            $creditBalance =$creditBalance+ $ledgerAccount->credit_balance;
            $debitBalance = $debitBalance + $ledgerAccount->debit_balance ;
        }
       
       $balance = $debitBalance  - $creditBalance;
       return ['balance'=>$balance , 'accountNameAndIndex'=>"$rootAccount->account_id".$account->account_id.'-'.$account->name];
   }
    
    
    public function exportFinalAccount($foundId , $accountId){
        
        $finalAccountName = Account::find(intval($accountId))->name;
        if(strpos($finalAccountName , 'متاجرة')){
            $response = $this->formTradingAccount($foundId , $accountId);
            return Excel::download(new FinalAccountExport($response['tradingAccountContent']), 'حساب المراجعة.xlsx');
            
        }
        
    }
    
    
    
    
    
    
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
