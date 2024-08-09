<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $qry = User::query();
        $sortFields = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")) {
            $qry->where("name","like","%".request("name")."%");
        }

        if(request("email")) {
            $qry->where("email","like","%".request("email")."%");
        }

        $Users = $qry->orderBy($sortFields,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("User/Index",[
            "users" => UserResource::collection($Users),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        User::create($data);
        return to_route('user.index')->with('success','User Created...');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("User/Edit",[
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $name = $user->name;
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password){
            $data['password'] = bcrypt($password);
        }
        else
        {
            unset($data['password']);
        }
        // dd($data);
        $user->update($data);
        return to_route('user.index')->with('success',"User \"$name\" Updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) 
    {
        $name = $user->name;
        $user->delete(); 
        return to_route('user.index')->with('success',"User \"$name\" Deleted.");
    }
}
