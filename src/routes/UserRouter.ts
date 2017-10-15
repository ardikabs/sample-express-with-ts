

import { Router, Request, Response, NextFunction } from 'express';

class UserRouter{

    router: Router;

    constructor(){
        this.router = Router();
    }

    private getUsers(req:Request, res:Response, next:NextFunction){
        console.log("Get All User");
    }

    private getUserById(req:Request, res:Response, next:NextFunction){
        console.log("Get User by Id :"+req.params.uid);
    }

    private addUser(req:Request, res:Response, next:NextFunction){
        console.log("Adding User");
    }

    private deleteUserById(req:Request, res:Response, next:NextFunction){
        console.log("Delete User");
    }

    private updateUserById(req:Request, res:Response, next:NextFunction){
        console.log("Updating User Information");
    }

    private getUserPKMList(req:Request,res:Response, next:NextFunction){
        console.log("Get PKM List of the user");
    }

    routes(){
        this.router.post("/",this.addUser);
        this.router.get("/",this.getUsers);
        this.router.get("/:uid",this.getUserById);
        this.router.delete("/:uid",this.deleteUserById);
        this.router.put("/:uid",this.updateUserById);

        this.router.get("/:uid/pkm",this.getUserPKMList);
    }
}

let userRouter = new UserRouter();
userRouter.routes();

let router = userRouter.router;
export default router;