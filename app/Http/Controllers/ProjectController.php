<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{

    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $qry = Project::query();
        $sortFields = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")) {
            $qry->where("name","like","%".request("name")."%");
        }

        if(request("status")){
            $qry->where("status",request("status"));
        }

        $Projects = $qry->orderBy($sortFields,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Project/Index",[
            "projects" => ProjectResource::collection($Projects),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile  */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        // dd($data);
        if($image){
           $data['image_path'] =  $image->store('project/'.Str::random(),'public');
        }
        Project::create($data);
        return to_route('project.index')->with('success','Project Created...');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $qry = $project->tasks();
        $sortFields = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if(request("name")) {
            $qry->where("name","like","%".request("name")."%");
        }

        if(request("status")){
            $qry->where("status",request("status"));
        }
        $tasks = $qry->orderBy($sortFields,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Project/Show",[
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]); 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $name = $project->name;
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        // dd($data);
        if($image){
            if($project->image_path){
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
           $data['image_path'] =  $image->store('project/'.Str::random(),'public');
        }
        $project->update($data);
        return to_route('project.index')->with('success',"Project \"$name\" Updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $project->delete();
        if($project->image_path){
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        return to_route('project.index')->with('success',"Project \"$name\" Deleted.");
    }
}
