import express from 'express';
import path from 'path';

const app : express.Application = express();
const port : number = Number(process.env.PORT) || 3004;

app.use(express.static(path.resolve(__dirname, "public")));

app.listen(port, ()=>{
    console.log(`Palvelin käynnistyi porttiin: ${port}`);
});