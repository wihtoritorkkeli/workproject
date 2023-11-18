import express from "express";
import { Virhe } from "../virheenkasittelija";
import { PrismaClient } from "@prisma/client";

const apiKayttajaRouter : express.Router = express.Router();
const prisma : PrismaClient = new PrismaClient();

apiKayttajaRouter.use(express.json());

//Poistetaan käyttäjä tietokannasta
apiKayttajaRouter.delete("/:id",async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(await prisma.kayttaja.count({
        where: {
            id: Number(req.params.id)
        }
    })=== 1){
        try{
            res.status(200).json(await prisma.kayttaja.findUnique({where:{id: Number(req.params.id)}}));
            await prisma.kayttaja.delete({
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


//Lisätään käyttäjä tietokantaan


//Haetaan käyttäjä ID:n perusteella tietokannasta
apiKayttajaRouter.get("/:id", async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(await prisma.kayttaja.count({
        where: {
            id: Number(req.params.id)
        }
    })===1){
        try{
            res.status(200).json(await prisma.kayttaja.findUnique({where:{id: Number(req.params.id)}}));
            res.json(await prisma.kayttaja.findUnique({where:{id: Number(req.params.id)}}));
        }
        catch(e:any){
            next(new Virhe());
        }
    }else{
        next(new Virhe(404, "Not Found"));
    }
});

//Haetaan kaikki käyttäjät
apiKayttajaRouter.get("/", async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        res.json(await prisma.kayttaja.findMany());
    }
    catch(e:any){
        next(new Virhe());
    }
});


export default apiKayttajaRouter;
