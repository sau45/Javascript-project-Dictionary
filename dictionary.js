const wrapper = document.querySelector(".wrapper");
const searchInput= document.querySelector("input");
const infoText =document.querySelector(".info-text");

const synonym = document.querySelector('.synonyms .list')

const volume = document.querySelector(".word i");

const removeIcon=document.querySelector(".search span");

let audio;

//data function
function data(result,word){
  if(result.title){
    // if api returns the message of can't find word
    infoText.innerHTML=`Can't find the meaning of <span>"${word}"</span>.Please, try to search another word.`;

  }
  else{
    console.log(result);
    wrapper.classList.add("active");

    let definitions = result[0].meanings[0].definitions[0]
    

    phonetics =`${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;

    // Now passing the particular response data to a particular html element

    document.querySelector(".word p").innerText = result[0].word;

    document.querySelector(".word span").innerText = phonetics;

    document.querySelector('.meaning span').innerText=definitions.definition;

    if(definitions.example==undefined){
      document.querySelector(".example span").textContent='No available'
    }
    else{
      document.querySelector('.example span').innerText=definitions.example;

    }


    audio =new Audio(result[0].phonetics[0].audio);

  if(definitions.synonyms[0]==undefined){
    synonym.parentElement.style.display="none";
  }
  else{
    synonym.parentElement.style.direction="block";
    synonym.innerHTML="";
    for(let i =0;i<5;i++){
      //getting only five synonyms out of many
      let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);

      //passing all five synonyms inside synonyms div
      synonym.insertAdjacentHTML("beforeend",tag)
    }
  }
  
  }
}


function search(word){
  fetchApi(word);
  searchInput.value = word;
}


//fetch api function
function fetchApi(word){
  infoText.style.color='#ff0000'
  infoText.innerHTML=`Searching the meaning of :<span>${word}</span>`
  let url =`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  //fetching api response and returning it with parsing into js obj and in another then
  //method calling data function with passing api response and searched word as an argument
  fetch(url).then(res =>res.json()).then(result => data (result,word));

}
  
// The keyup event occurs when a keyboard key is released. The keyup() method triggers the keyup event, or attaches a function to run when a keyup event occurs. 

searchInput.addEventListener('keyup',e=>{
  if(e.key=="Enter"&&e.target.value){
    fetchApi(e.target.value);
  }
})

volume.addEventListener("click", ()=>{
  volume.style.color = "#4D59FB";
  audio.play();
  setTimeout(() =>{
      volume.style.color = "#999";
  }, 800);
});

removeIcon.addEventListener("click", ()=>{
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.style.color = "#9A9A9A";
  infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});


