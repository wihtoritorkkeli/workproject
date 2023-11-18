import express from 'express';

export class Virhe extends Error {
    status: number
    viesti: string

    constructor(status? : number, viesti?: string){
        super();
        this.status = status || 500;
        this.viesti = viesti || "Palvelimella tapahtui odottamaton virhe";
    }
}

const virheenkasittelija = ((err : Virhe, req : express.Request, res : express.Response, next: express.NextFunction) =>{
    res.status(err.status).json({virhe : err.viesti});
});

export default virheenkasittelija;