//API CALORIE

//aggiungo event listener ai form
const form=document.querySelector('form');
form.addEventListener('submit', search);

function search(event){
    //impedisco il submit del form
    event.preventDefault();
    //leggo il valore del campo di testo
    const input = document.querySelector("#ricerca");
    const nomeAlimento=encodeURIComponent(input.value);
    console.log('Eseguo ricerca: ' + nomeAlimento);
    //preparo la richiesta
    fetch('https://nutritionix-api.p.rapidapi.com/v1_1/search/' + nomeAlimento + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com',
		    'X-RapidAPI-Key': '27eb10cde7mshcaf4542e4f0e9a2p165667jsn604c225b7208'
          }
    })  .then(onResponse, onError)
        .then(onSearchFood);
}

function onResponse(response) {
    if(!response.ok) {
        console.log('Problema con la risposta');
        return null;
    }
    return response.json();
}

function onError(error){ 
    console.log('Errore' + error); 
}

function onSearchFood(json){
    if (!json) {
        console.log('Nessun json ritornato');
        return;
    }
    console.log(json);
    console.log(json.hits[0].fields.item_name);
    console.log(json.hits[0].fields.nf_calories);

    const foodToDisplay = document.querySelector('#cal-view');
    foodToDisplay.innerHTML='';

    const calories=json.hits[0].fields.nf_calories;
    const item_name=json.hits[0].fields.item_name;
    const risultatoRicerca = document.createElement('p');
    risultatoRicerca.textContent=item_name + ' :  ' + calories + ' calories';

    foodToDisplay.appendChild(risultatoRicerca);
 

}

//FUNZIONI ESCLUSIVAMENTE GRAFICHE

const clickHome = document.querySelector('#home');
clickHome.addEventListener("click", displayHome);

function displayHome(){
    const article=document.querySelector("article");
    article.classList.remove('hidden');
    const apicalories=document.querySelector("#apicalories");
    apicalories.classList.remove('hidden');
    const apispotify=document.querySelector('#apispotify');
    apispotify.innerHTML='';
    const header=document.querySelector('h1');
    header.innerHTML="L'ABC DEL BODYBUILDING: I FONDAMENTALI";

    clickPlaylist.addEventListener("click", displayPlaylist);
}

//API SPOTIFY

const clickPlaylist = document.querySelector('#playlist');
clickPlaylist.addEventListener("click", displayPlaylist);

function displayPlaylist(){
    const article=document.querySelector("article");
    article.classList.add('hidden');
    const apicalories=document.querySelector("#apicalories");
    apicalories.classList.add('hidden');
    const apispotify=document.querySelector('#apispotify');
    apispotify.classList.remove('hidden');
    const header=document.querySelector('h1');
    header.innerHTML='PLAYLIST';

    fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXe6bgV3TmZOL?si=45be24a93ddf46da', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        }).then(onResponse, onError).then(mostraPlaylist);


    clickPlaylist.removeEventListener("click", displayPlaylist);
}

//OAuth credentials
const client_id = 'dc39de066a3e4437851ca00ca2ec9c9b';
const client_secret = 'bcf30f1cde444cab85583afbdbbcfe41';
let token;

//richiedo il token
fetch("https://accounts.spotify.com/api/token", {
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
}).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response)
{
  return response.json();
}

function onTokenJson(json)
{
  // Imposta il token global
  token = json.access_token;
}

function mostraPlaylist(json){

    //console.log(json);
    
    const playlist = document.querySelector('#apispotify');

    for(let i=0; i<100; i++){
    
        const display = document.createElement('div');
        display.classList.add('listSongs');

        const immagine=document.createElement('img');
        immagine.src=json.tracks.items[i].track.album.images[0].url;

        const titolo = json.tracks.items[i].track.name;
        const title = document.createElement('span');
        title.textContent = titolo;

        display.appendChild(immagine);
        display.appendChild(title);
        playlist.appendChild(display);
    }


}





