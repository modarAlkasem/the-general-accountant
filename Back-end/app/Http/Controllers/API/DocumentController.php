<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Http\Controllers\API\EntryAccountController;
use Excel ;
use App\Exports\JournalExport;
use App\Models\Foundation;




class DocumentController extends Controller
{
    protected $entryAccountController;
    
    public function __construct(EntryAccountController $entryAccountController ){
        
        $this->entryAccountController= $entryAccountController ;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($foundId)
    {
        $documents = Document::where('foundation_id', '=' , intval($foundId))->orderBy('document_id', 'asc')->get();
        return response()->json(['documents'=>$documents,'message'=>' Documents Returned Successfully'],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')
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
        $document = new Document();
        $docId = -1;
        $date = strtotime($request->docDate);
        $document->date = date('y-m-d' , $date);
        $document->foundation_id = intval($foundId);
        $document->save();
        
        $docId = $document->document_id;
        
        foreach(  $request->docContent as $entryAccount){
            
            $data = ['accountId'=>$entryAccount['accountId'] ,'debit'=>$entryAccount['debit'] ,'credit'=>$entryAccount['credit'] ,
                     'description' =>$entryAccount['description'] , 'date'=>$entryAccount['date']];
             $this->entryAccountController->store($data ,$foundId ,  $docId );
            
        }
        
        return response()->json(['docAmount'=>$this->countDocs($foundId),"docId"=>$document->document_id,'message'=>'New Entry Document Added Successfully'],201)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
        ->header('Access-Control-Allow-Headers', '*');
        
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function countDocs($foundId){
        
        return Document::where('foundation_id', '=' , intval($foundId))->count();
        
    }
    public function show($foundId , $docId)
    { 
            $document = Document::find(intval($docId));
        
            $entriesAccounts=$this->entryAccountController->getEntriesAccounts($docId);
            
            return response()->json(["data"=>["docDate"=>$document->date , "docContent"=>$entriesAccounts["transformedEntriesAccounts"]
                                              ,"entryAccountsIds"=>$entriesAccounts["entryAccountsIds"] ] ,
                                    "message"=>'Entry Document Returned Successfully'],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')
                                    ->header('Access-Control-Allow-Headers', '*');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $docId)
    {   
        $convertedDocId = intval($docId);
        $document = Document::find($convertedDocId );
        $foundId = $document->foundation_id;
        $this->entryAccountController->destroyEntriesAccounts($docId);
        
        foreach(  $request->docContent as $entryAccount){
            $data = ['accountId'=>$entryAccount['accountId'] ,'debit'=>$entryAccount['debit'] ,'credit'=>$entryAccount['credit'] ,
                     'description' =>$entryAccount['description'] , 'date'=>$entryAccount['date']];
            $this->entryAccountController->store($data ,$foundId ,  intval($docId) );
            
        }
        
       return response()->json(['message'=>'Entry Document Edited Successfully'],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'PUT')
        ->header('Access-Control-Allow-Headers', '*');
        
        
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($docId)
    {
        $convertedDocId = intval($docId);
        $document = Document::find($convertedDocId );
        $document->delete();
        $this->entryAccountController->destroyEntriesAccounts($docId);
        
        return response()->json(["message"=>'Entry Document Deleted Successfully'] , 200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'DELETE')
                                    ->header('Access-Control-Allow-Headers', '*');
    }
    
    
    
    public function formJournal($foundId){
        
        $documents = Document::where('foundation_id' , '=' , intval($foundId))->orderBy('document_id' , 'asc')->get();
        
        $journal = [];
        $creditSum = 0;
        $debitSum = 0;
        $debitDocsSum = 0;
        $creditDocsSum = 0;
        $entriesAccounts = [];
        $count = 1;
        
        foreach($documents as $document){
            
            
            $entriesAccounts = $this->entryAccountController->getEntriesAccounts($document->document_id);
            $entriesAccounts = $entriesAccounts['transformedEntriesAccounts'];
            foreach($entriesAccounts  as $entryAccount){
                
                if($entryAccount['credit']==''){
                    
                    $debitSum = $debitSum + intval($entryAccount['debit']);
                    
                }elseif($entryAccount['debit']==''){
                    
                    $creditSum = $creditSum + intval($entryAccount['credit']);
                    
                }

                
                
            }
               array_push($journal , ['docNum'=>$count , 'docDate'=>$document->date ,'docCreditSum'=>$creditSum , 
                            'docDebitSum'=>$debitSum ,'docContent'=>$entriesAccounts ]);
                
                $debitDocsSum = $debitDocsSum + $debitSum ;
                $creditDocsSum = $creditDocsSum + $creditSum;
                $creditSum = 0;
                $debitSum = 0;
                $count++;
            
        }
        
        return response()->json(['data'=>['journal'=>$journal , 'journalCredit'=>$creditDocsSum , 'journalDebit'=> $debitDocsSum] , 'message'=>'Journal Created Successfully'], 200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET') ->header('Access-Control-Allow-Headers', '*');
        
        
        
    }
    
    public function exportJournal($foundId){
        $foundation = Foundation::find(intval($foundId));
        $documents = Document::where('foundation_id' , '=' ,$foundation->foundation_id )->orderBy('document_id' , 'asc')->get();
        $creditSum = 0;
        $debitSum = 0;
        $entriesAccounts = [];
        $count = 1;
        $title= $foundation->name.'_دفتر اليومية';
        $data = [];
         foreach($documents as $document){
            
            
            $entriesAccounts = $this->entryAccountController->getEntriesAccounts($document->document_id);
            $entriesAccounts = $entriesAccounts['transformedEntriesAccounts'];
            foreach($entriesAccounts  as $entryAccount){
                
                if($entryAccount['credit']==''){
                    
                    $debitSum = $debitSum + intval($entryAccount['debit']);
                    
                }elseif($entryAccount['debit']==''){
                    
                    $creditSum = $creditSum + intval($entryAccount['credit']);
                    
                }

                
                
            }
              foreach($entriesAccounts  as $entryAccount){
                array_push($data ,[ 'docDate'=>$document->date ,'docDebit'=>$debitSum , 'docCredit'=>$creditSum ,'docNum'=>$count,
                                 'accountNameAndIndex'=>$entryAccount['accountNameAndIndex'] ,'debit'=>$entryAccount['debit'] ,'credit'=>$entryAccount['credit'] , 'description'=>$entryAccount['description']]);

            }
                
                $creditSum = 0;
                $debitSum = 0;
                $count++;
             
             
         }
        return Excel::download(new JournalExport($data) , $title.'.xlsx' );
        
        
        
        

    }
    
    

    
    
}
