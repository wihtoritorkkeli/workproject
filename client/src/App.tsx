import React, { useEffect, useState } from 'react';
import { Container, Typography, Alert, Backdrop, CircularProgress, Stack, ListItem, ListItemText, List } from '@mui/material';
import './App.css';

interface Kayttaja {
  id : number
  kayttajatunnus : string
  salasana : string
  admin : boolean
}

interface apiData {
  kayttajat : Kayttaja[]
  virhe : string
  haettu : boolean
}

const App : React.FC = () : React.ReactElement => {

  const [apiData, setApidata] = useState<apiData>({
    kayttajat : [],
    virhe: "",
    haettu : false
  });


  //Kutsutaan palvelimelta tietoa käyttäjien osalta
  const apiKutsu = async (metodi? : string, kayttaja? : Kayttaja) : Promise<void> => {
    //Default asetukset fetch -pyynnön metodille
    let asetukset : any = {
      method : metodi || "GET"
    };

    //POST pyynnön käsittely
    if(metodi === "POST"){
      asetukset = {
        ...asetukset,
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(kayttaja)
      }
    }

    //GET pyyntö palvelimelle aina apiKutsu -funktion viimeisenä pyyntönä. Tämä pitää palvelimelta saadut tiedot aina ajantasalla.
    try{
      
      const kayttajaYhteys = await fetch('http://localhost:3004/api/kayttajat', asetukset);

      if (kayttajaYhteys.status === 200){
        setApidata({
          ...apiData,
          kayttajat: await kayttajaYhteys.json(),
          haettu : true
        })
      }else{

        let virheteksti : string = "";

        //Virhe ilmoituksien hallinta palvelimen palauttaman statuksen perusteella
        switch( kayttajaYhteys.status){
          case 400 : virheteksti = "400: Virhe pyynnön tiedoissa"; break;
          default : virheteksti = "Palvelimella tapahtui odottamaton virhe"; break;
        }

        setApidata({
          ...apiData,
          virhe: virheteksti,
          haettu: true
        })
      }

    }
    catch(e:any){

      setApidata({
        ...apiData,
        virhe : "palvelimeen ei saada yhteyttä",
        haettu : true
      })

    }
  };

  useEffect(() =>{
    apiKutsu();
  }, []);

  return (
    <Container>
      <Typography variant='h1'>Hello World!</Typography>
      <Typography variant='h6'>Käyttäjät:</Typography>

      {(Boolean(apiData.virhe))
        ? <Alert severity='error'>apiData.virhe</Alert>
        : (apiData.haettu)
          ? <Stack>
              <List>
                {apiData.kayttajat.map((Kayttaja : Kayttaja) => {
                  return  <ListItem key={Kayttaja.id}>
                            <ListItemText primary={Kayttaja.kayttajatunnus}/>
                          </ListItem>
                })}
              </List>
          </Stack>
          : <Backdrop open={true}><CircularProgress color='inherit'/></Backdrop>
      }
    </Container>
  );
}

export default App;
