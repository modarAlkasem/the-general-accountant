<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Foundation;
class FoundationController extends Controller
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
    public function store(Request $request , $id)
    {
        $foundInstance = new Foundation();
        $foundInstance->name = $request->name;
        $foundInstance->foundation_type_id = $request->foundation_type_id;
        $foundInstance->country = $request->country;
        $foundInstance->currency = $request->currency;
        $foundInstance->save();


        

        $userInstance = User::find(intval($id));
        $userInstance->first_name = $request->first_name;
        $userInstance->last_name = $request->last_name;
        $userInstance->foundation_id=  $foundInstance->foundation_id;
        $userInstance->save();
        
        return response()->json(["data"=>$foundInstance ,"userId"=>$userInstance->user_id,"message"=>"New Foundation Created Successfully"],201);


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
