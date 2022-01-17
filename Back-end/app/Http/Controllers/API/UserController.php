<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\OauthClient;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function register(Request $request ){
         
        if(OauthClient::find($request->clientId)->secret==$request->clientSecret){
        $userEmail = User::where('email', 'like' , $request->email)->get();
        $user = null;
        $token = null;
        
        if(count($userEmail)){
           
            return response()->json(['error'=>'this user email is used befor'],409)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
                ->header('Access-Control-Allow-Headers', '*');
        }else{
             
            $user = new User;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
//            return gettype(decbin(number_format($request->query('role'))));
            $user->role= boolval(number_format($request->query('role')));
            
           
            $user->save();
             
            $token = $user->createToken('access_token')->accessToken;
            
            return response()->json(['access_token'=>$token
                ,'message'=>'new user registered successfully',"userId"=>$user->user_id],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
                ->header('Access-Control-Allow-Headers', '*');


        }
            
        }else{
            
               return response()->json(['error'=>'not allowed client'],401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
                ->header('Access-Control-Allow-Headers', '*');
        }

    }

    public function signIn(Request $request){
      
        if(OauthClient::find($request->clientId)->secret==$request->clientSecret){
            $userInstance = User::where('email', 'like' , $request->email)->get();
            $user = null;
            $token = null;

            if(count($userInstance)){

                if(Hash::check($request->password , $userInstance[0]->password )){
                        $token =  $userInstance[0]->createToken('access_token')->accessToken;
                        return response()->json(['access_token'=>$token,'success'=>'signed in  successfully',
                                                "data"=>["foundData"=>$userInstance[0]->foundation,"userId"=>$userInstance[0]->user_id]],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
                    ->header('Access-Control-Allow-Headers', '*'); 
                }else{
                    return response()->json(['error'=>'password is not correct'],401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
                    ->header('Access-Control-Allow-Headers', '*'); 
                }
            }else{
                return response()->json(['error'=>'email is not correct'],401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
                    ->header('Access-Control-Allow-Headers', '*');

            }
        }else{
            
               return response()->json(['error'=>'not allowed client'],401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')
                ->header('Access-Control-Allow-Headers', '*');
        }



    }

    public function signOut($id){
        
        $userInstance = User::find(intval($id));
        $userTokens =$userInstance->tokens;
        foreach($userTokens as $token){
            $token->revoke();

        }
        return  response()->json(['success'=>'signed out successfully'],200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')
        ->header('Access-Control-Allow-Headers', '*');
        
    }

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
    public function store(Request $request)
    {
        //
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
