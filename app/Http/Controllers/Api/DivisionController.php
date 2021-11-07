<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DivisionRequest;
use App\Models\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $divisions = Division::with('subdivisions','parent')->get();
        return response()->json([
            'success' => true,
            'divisions' => $divisions
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DivisionRequest $request)
    {
        $division = Division::create([
            'name' => $request->name,
            'level' => $request->level,
            'collaborator' => $request->collaborator,
            'ambassador' => $request->ambassador,
        ]);
        return response()->json([
            'success' => true,
            'division' => $division
        ],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $division = Division::findOrFail($id);
        return response()->json([
            'success' => true,
            'division' => $division
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function update(DivisionRequest $request, $id)
    {
        $division = Division::where('id',$id)->update([
            'name' => $request->name,
            'level' => $request->level,
            'collaborator' => $request->collaborator,
            'ambassador' => $request->ambassador,
        ]);
        return response()->json([
            'success' => true,
            'division' => $division
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Will delete a division and all its sub divisions
        try {
            $division = Division::findOrFail($id);
            $division->delete();
            return response()->json([
                'success' => true,
                'division' => $division
            ],200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ],500);
        }

    }
}
