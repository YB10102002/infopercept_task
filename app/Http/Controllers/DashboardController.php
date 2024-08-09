<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Http\Resources\TaskResource;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalTasks = Task::query()->where('assigned_user_id',$user->id)->count();
        //$totalPendingTasks = Task::query()->where('status','pending')->count();
        $myPendingTasks = Task::query()->where('status','pending')->where('assigned_user_id',$user->id)->count();
        $myInprogressTasks = Task::query()->where('status','in_progress')->where('assigned_user_id',$user->id)->count();
        $myCompletedTasks = Task::query()->where('status','completed')->where('assigned_user_id',$user->id)->count();
        $activeTasks = Task::query()->whereIn('status',['pending','in_progress'])->where('assigned_user_id',$user->id)->limit(10)->get();
        $myactiveTasks = TaskResource::collection($activeTasks);
        return inertia('Dashboard', compact('myPendingTasks' , 'myInprogressTasks' , 'myCompletedTasks','totalTasks','myactiveTasks'));
    }
}
