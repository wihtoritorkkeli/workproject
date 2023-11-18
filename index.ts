import express from 'express';
import path from 'path';
import virheenkasittelija from './virheenkasittelija';
import apiKayttajaRouter from './routes/apiKayttajat';
import apiLiidiRouter from './routes/apiLiidit';

const app : express.Application = express();
const port : number = Number(process.env.PORT) || 3004;

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/kayttajat", apiKayttajaRouter);
app.use("/api/liidit", apiLiidiRouter);

app.use(virheenkasittelija);

app.listen(port, ()=>{
    console.log(`Palvelin käynnistyi porttiin: ${port}`);
});