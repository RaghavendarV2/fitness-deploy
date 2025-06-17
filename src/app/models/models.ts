export interface User{
    id?:number;
    userName?:string;
    email?:string;
    password?:string;
    profile:Profile;
}

export interface Profile{
    id?:number;
    age?:number;
    height?:number;
    weight?:number;
    user?:User;
}

export interface Activity{
    id?:number;
    steps?:number;
    distance?:number;
    caloriesBurned?:number;
    userId?:number;
    date?: Date
}


export interface Goal{
    id?:number;
    targetSteps?:number;
    targetCalories?: number;
    activity ?: Activity
}