<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Foundation;
use App\Http\Controllers\API\LedgerAccountController;

class AccountController extends Controller
{
    protected $ledgerAccount;
    
    public function __construct(LedgerAccountController $ledgerAccount)
    {
         $this->middleware('auth:api');
         $this->ledgerAccount = $ledgerAccount;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($foundId)
    {
            $id=intval($foundId);
            $response = [];
            $accountsArrayFirstLevel = [];
            $accountsArraySecondLevel = [];
            $rootAccounts = Account::where('level' , '=' , 0)->get();
            $relatedAccountsFirstlevel = Account::where('level' , '=' , 1)->get();
            $relatedAccountsSecondlevel = Account::where('foundation_id' , '=' , $id)->get();
            foreach($rootAccounts as $account){
                $relatedAccountsSecondlevelAmount=0;
                foreach($relatedAccountsFirstlevel as $accountFirstlevel ){
                    if($account->account_id==$accountFirstlevel->parent_account_id){
                        foreach($relatedAccountsSecondlevel as $accountSecondlevel ){
                            if($accountFirstlevel->account_id==$accountSecondlevel->parent_account_id){
                                $relatedAccountsSecondlevelAmount++;
                                array_push( $accountsArraySecondLevel , ["name"=>$accountSecondlevel->name,
                                "index"=>intval("$account->child_number"."$accountFirstlevel->child_number"."$accountSecondlevel->child_number"),
                                "description"=> $accountSecondlevel->description ,"id"=>$accountSecondlevel->account_id]);
                            }
                        }
                        array_push( $accountsArrayFirstLevel , ["name"=>$accountFirstlevel->name 
                        ,"index"=>intval("$account->child_number"."$accountFirstlevel->child_number"),
                        "description"=> $accountFirstlevel->description,"relatedAccountsSecondLevel"=>$accountsArraySecondLevel,"id"=>$accountFirstlevel->account_id]);
                        $accountsArraySecondLevel = [];
                    }

                }
                array_push($response , ["name"=>$account->name , "index"=>$account->child_number , "description"=>$account->description,
               "relatedAccountsSecondlevelAmount"=>$relatedAccountsSecondlevelAmount ,"relatedAccountsFirstLevel"=>$accountsArrayFirstLevel]);
                $accountsArrayFirstLevel = [];

            }

            return response()->json(["data"=>$response] , 200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')
            ->header('Access-Control-Allow-Headers', '*');




    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request , $foundId)
    {
        $account = new Account();
        $account->name = $request->name;
        $account->description= $request->description;
        $account->level = 2;
        $account->child_number = intval($request->index)%10;
        $account->parent_account_id = $request->parent_account_id;
        $account->foundation_id = intval($foundId);
        $account->save();
        $this->ledgerAccount->store($account->account_id ,$account->foundation_id);
        return response()->json(["data"=>$account],201)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
        ->header('Access-Control-Allow-Headers', '*');
        
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
    public function update(Request $request,$foundId, $accountId)
    {
        
        $account = Account::find(intval($accountId)); 
        $account->name =  $request->name;
        $account->description= $request->description;
        $account->save();
        return response()->json(["data"=>$account],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'PUT,PATCH')
        ->header('Access-Control-Allow-Headers', '*');
    }
    
    public function search(Request $request){
        $index = 0;
        $parentAccount = null;
        $searchResults = [];
        $accounts  = Foundation::find(intval($request->query('foundId')))->accounts()->where('name' , 'like' ,'%'.$request->query('string').'%')->get();
        if(count($accounts)>0){
            foreach($accounts as $account){
                $parentAccount = Account::find($account->parent_account_id);
                $index = $parentAccount->child_number;
                $parentAccount  = Account::find($parentAccount->parent_account_id);
                $index = "$parentAccount->child_number"."$index".$account->child_number;
                array_push( $searchResults , ["id"=>$account->account_id,"name"=>$account->name , "index"=>$index]);
                $index = 0;
                $parentAccount = null;
            }
            return response()->json([
                'message'=>'search done successfully',
                "data"=>$searchResults
            ],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')
                  ->header('Access-Control-Allow-Headers', '*');
            
        }else{
            
            return response()->json(["message"=>"No Results Found"],404)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', '*');
        }
        
    }
    
    public function finalAccountsSearch(Request $request){
        $string = urldecode($request->query('string') );
        $index = 0 ;
        $parentAccount = '8';
        $searchResults = [];
        $firstLevelFinalAccounts = Account::where('parent_account_id' , '=' , 8)->get();
        $secondLevelFinalAccounts = [];
        
        foreach($firstLevelFinalAccounts as $firstLevelFinalAccount){
            if(strpos($firstLevelFinalAccount->name,$string)){
                 array_push( $searchResults ,["id"=>$firstLevelFinalAccount->account_id,"name"=>$firstLevelFinalAccount->name , "index"=>'8'.$firstLevelFinalAccount->child_number]);
            }
            
            $secondLevelFinalAccounts = Account::where('parent_account_id' , '=' , $firstLevelFinalAccount->account_id)->where('foundation_id','=',intval($request->query('foundId')))->get() ;
               if(count($secondLevelFinalAccounts)>0){
                    foreach($secondLevelFinalAccounts as $secondLevelFinalAccount){

                    if(strpos($secondLevelFinalAccount->name,$string)){
                        
                        $index = '8'.$firstLevelFinalAccount->child_number.$secondLevelFinalAccount->child_number;
                         array_push( $searchResults ,["id"=>$secondLevelFinalAccount->account_id,"name"=>$secondLevelFinalAccount->name , "index"=>$index]);                       
                    }

                }
            }

        }
    
       return response()->json([
                'message'=>'search done successfully',
                "data"=>$searchResults
            ],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')
                  ->header('Access-Control-Allow-Headers', '*');
        
        
    }
    
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

}
