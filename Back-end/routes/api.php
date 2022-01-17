<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FoundationController;
use App\Http\Controllers\API\AccountController;
use App\Http\Controllers\API\DocumentController;
use App\Http\Controllers\API\LedgerAccountController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register' , [UserController::class , 'register']);
Route::post('/signin' , [UserController::class , 'signIn']);
Route::get('/signout/{id}' , [UserController::class , 'signOut'])->middleware('auth:api');
Route::post('/onboarding/{id}' , [FoundationController::class , 'store'])->middleware('auth:api');
Route::apiResource('foundations.accounts' , AccountController::class)->except(['show' , 'destroy']);  
Route::get('/accounts/search' , [AccountController::class  ,'search'])->middleware('auth:api');
Route::post('/foundations/{id}/documents' , [DocumentController::class , 'store'])->middleware('auth:api');
Route::get('/foundations/{id}/documents' ,[DocumentController::class ,'index'])->middleware('auth:api');
Route::get('/foundations/{foundId}/documents/{docId}' ,[DocumentController::class ,'show'])->middleware('auth:api');
Route::delete('/documents/{docId}', [DocumentController::class , 'destroy'])->middleware('auth:api');
Route::put('/documents/{docId}', [DocumentController::class , 'update'])->middleware('auth:api');
Route::get('/foundations/{foundId}/journal', [DocumentController::class , 'formJournal'])->middleware('auth:api');
Route::get('/foundations/{foundId}/exportjournal', [DocumentController::class , 'exportJournal'])->middleware('auth:api');
Route::get('/foundations/{foundId}/ledgeraccounts/{accountId}', [LedgerAccountController::class , 'show'])->middleware('auth:api');
Route::get('/foundations/{foundId}/ledgeraccounts/{accountId}/exportledger', [LedgerAccountController::class , 'exportLedger'])->middleware('auth:api');

Route::get('/foundations/{foundId}/ledgeraccounts/{accountId}/trialbalance', [LedgerAccountController::class , 'getTrialBalance'])->middleware('auth:api');

Route::get('/foundations/{foundId}/ledgeraccounts/{accountId}/exporttrialbalance', [LedgerAccountController::class , 'exportTrialBalance'])->middleware('auth:api');



Route::get('/accounts/finalaccountssearch' , [AccountController::class  ,'finalAccountsSearch'])->middleware('auth:api');
Route::get('/foundations/{foundId}/ledgeraccounts/{accountId}/finalaccount' , [LedgerAccountController::class  ,'getFinalAccount'])->middleware('auth:api');

Route::get('/foundations/{foundId}/ledgeraccounts/{accountId}/exportfinalaccount', [LedgerAccountController::class , 'exportFinalAccount'])->middleware('auth:api');







