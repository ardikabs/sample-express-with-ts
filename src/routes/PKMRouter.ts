

import { Router, Request, Response, NextFunction } from 'express';

class PKMRouter{

    router: Router;

    constructor(){
        this.router = Router();
    }

    private getPKMList(req:Request, res:Response, next:NextFunction){
        console.log("Get All PKM List");
    }

    private getPKMById(req:Request, res:Response, next:NextFunction){
        console.log("Get PKM by Id :"+req.params.pkmid);
    }

    private addNewPKM(req:Request, res:Response, next:NextFunction){
        console.log("Adding a NEW PKM Information");
    }

    private deletePKMById(req:Request, res:Response, next:NextFunction){
        console.log("Delete PKM by Id");
    }

    private updatePKMById(req:Request, res:Response, next:NextFunction){
        console.log("Update PKM By Id");
    }

    routes(){
        this.router.post("/",this.addNewPKM);
        this.router.get("/",this.getPKMList);
        this.router.get("/:pkmid",this.getPKMById);
        this.router.delete("/:pkmid",this.deletePKMById);
        this.router.put("/:uid",this.updatePKMById);
    }
}

let pkmRouter = new PKMRouter();
pkmRouter.routes();
let router = pkmRouter.router;
export default router;