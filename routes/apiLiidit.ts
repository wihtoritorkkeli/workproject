import express from "express";
import { Virhe } from "../virheenkasittelija";
import { PrismaClient } from "@prisma/client";

const apiLiidiRouter : express.Router = express.Router();
const prisma : PrismaClient = new PrismaClient();

apiLiidiRouter.use(express.json());

//Poistetaan käyttäjä tietokannasta
apiLiidiRouter.delete("/:id",async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(await prisma.liidit.count({
        where: {
            id: Number(req.params.id)
        }
    })=== 1){
        try{
            res.status(200).json(await prisma.liidit.findUnique({where:{id: Number(req.params.id)}}));
            await prisma.liidit.delete({
                where: {
                    id: Number(req.params.id)
                }
            });
        }
        catch(e:any){
            next(new Virhe());
        }
    }
    else{
        next(new Virhe(404, "Not found"));
    }
});

//Muokataan käyttäjän tietoja tietokannassa
apiLiidiRouter.put("/:id", async(req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        if(await prisma.liidit.count({
            where: {
                id: Number(req.params.id)
            }
        })===1){
            if((req.body.kayttajatunnus.length > 0 && req.body.kayttajatunnus !== undefined)&&
            (req.body.liidi.length > 0 && req.body.liidi !== undefined)){
                try{
                    await prisma.liidit.update({
                        where:{
                            id: Number(req.params.id)
                        },
                        data : {
                            kayttajatunnus : req.body.kayttajatunnus,
                            liidi : req.body.liidi
                        }
                    });
                    res.status(200).json(await prisma.kayttaja.findUnique({where:{id: Number(req.params.id)}}));
                }
                catch(e:any){
                    next(new Virhe());
                }
            }
            else{
                next(new Virhe(400, "Tiedot puutteellisia"));
            }
        }
        else{
            next(new Virhe(404, "Not found"));
        }
    }
    catch(e:any){
        next(new Virhe());
    }
});


//Lisätään käyttäjä tietokantaan
apiLiidiRouter.post("/", async(req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try{
        if((req.body.kayttajatunnus.length > 0 && req.body.kayttajatunnus !== undefined)&&
        (req.body.liidi.length > 0 && req.body.liidi !== undefined)
        ){
            try{
                await prisma.liidit.create({
                    data: {
                        kayttajatunnus : req.body.kayttajatunnus,
                        liidi : req.body.liidi
                    }
                });
                res.status(200).json(await prisma.liidit.findMany({orderBy:{id: "desc"}, take: 1}));
            }
            catch(e:any){
                next(new Virhe());
            }
        }
    }
    catch(e:any){
        next(new Virhe());
    }
});


//Haetaan käyttäjä ID:n perusteella tietokannasta
apiLiidiRouter.get("/:id", async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        if(await prisma.liidit.count({
            where: {
                id: Number(req.params.id)
            }
        })===1){
            try{
                res.status(200).json(await prisma.liidit.findUnique({where:{id: Number(req.params.id)}}));
                res.json(await prisma.liidit.findUnique({where:{id: Number(req.params.id)}}));
            }
            catch(e:any){
                next(new Virhe());
            }
        }else{
            next(new Virhe(404, "Not Found"));
        }
    }
    catch(e:any){
        next(new Virhe());
    }
    
});

//Haetaan kaikki käyttäjät
apiLiidiRouter.get("/", async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        res.json(await prisma.liidit.findMany());
    }
    catch(e:any){
        next(new Virhe());
    }
});


export default apiLiidiRouter;
