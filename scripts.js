
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

// Answers
const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const verbsContainer = document.getElementById("verbs-container");



const numberOfVerbs = verbs.length;

console.log(numberOfVerbs);

let answerRoullete = [0,1,1,1];
let everyNumberOfVerbs = [];
let rightAnswer;
let rightAnswersCounter = 0;

// al darle click al sgv play vamos a ocultarlo
next.addEventListener("click",function(){
  ponerVerbo();
      //ocultar play
  next.style.display = 'none';
});

// creamos la funcion 
//js lee primero todos los llamados de funcion
makeRandomList();
let lastPosition = everyNumberOfVerbs.length-1;

//llamamos la funcion   ---- crea una lista aleatoria de verbs
function makeRandomList(){

  for (var i = 0; i < numberOfVerbs; i++){
    everyNumberOfVerbs.push(i);
  }
  everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}


//funcion evexto de respuesta correcta o incorrecta
function buttonEffect(itsRight,button){// necesita de dos parametros
      //si la respuesta es correcta 
  if (itsRight){
    button.classList.add('rightAnswer');
    setTimeout(function(){
      button.classList.remove('rightAnswer');
    },1000);

 //! ---------------Mejora de REFACTORIZACION--------------------
    // rightAnswersCounter = rightAnswersCounter+1;
    rightAnswersCounter++;
//!--------------------------------------------------------------
  }      
  // en caso de ser incorrecto cambia el stilo 
else{
    button.classList.add('wrongAnswer');
    setTimeout(function(){
      button.classList.remove('wrongAnswer');
    },1000);
  }
  setTimeout(function(){
    ponerVerbo();
  },500);
}

// crear evento para el First boton 
first.addEventListener("click",function(){
      //si se da click en este btn se pinta
  buttonEffect(isItRight_(first.innerHTML),this);
});

// Second button 
second.addEventListener("click", function(){
  buttonEffect(isItRight_(second.innerHTML),this);
});

// Third button 
third.addEventListener("click", function(){
  buttonEffect(isItRight_(third.innerHTML),this);
});

// Fourth button 
fourth.addEventListener("click", function(){
  buttonEffect(isItRight_(fourth.innerHTML),this);
});



//esta funcion cambia el orden de los elementos del array --- pone al azar los bt0nes 

//?-------------------------------Error no hace anda se cambio el nombre --------------------------------------------------
//? function shuffleAnswers(array) {

//?   let numberOfAnswerButtons = array.length;
//?   let randomIndex;

//?   while (numberOfAnswerButtons != 0) {

//?     randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
//?     numberOfAnswerButtons--;
//?         //intercambia el orden de los elementos
//?     [array[numberOfAnswerButtons], array[randomIndex]] = [
//?     array[randomIndex], array[numberOfAnswerButtons]];
//?  }

//?   return array;
//? }

//esta funcion cambia el orden de los elementos del array --- pone al azar los bt0nes 
//!----------------------------- Se cambio el nombre array por ordenVerbs-----------------------------------------------
function shuffleAnswers(ordenVerbs) {

  let numberOfAnswerButtons = ordenVerbs.length;
  let randomIndex;

  while (numberOfAnswerButtons != 0) {

    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
        //intercambia el orden de los elementos
    [ordenVerbs[numberOfAnswerButtons], ordenVerbs[randomIndex]] = [
      ordenVerbs[randomIndex], ordenVerbs[numberOfAnswerButtons]];
  }

  return ordenVerbs;
}
//!--------------------------------------------------------------------------------------------------------------------


function isItRight_(answer){
  return answer==rightAnswer?true:false;
}

function randomVerbo(notThisOne){
  theOne = Math.floor(Math.random()*verbos.length);

  return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo(){

  // al darle cambia la leyenda de play por bitcoins
    // showVerb.innerHTML = "Deposita 200 bitcoins para jugar"
  answerRoullete = shuffleAnswers(answerRoullete);
    //agrega la imagen aleatoriamente
  let randomPosition = everyNumberOfVerbs[lastPosition];
  let imgText = "<img src='img/"+verbs[randomPosition]+".jpg' height:'140px' width='100px'>";

  //? -------------------- Sin Refactorizar --------------------
  //? agregamos class de los btones
  //? first.classList.add("btn","btn-outline-primary","btn-md");
  //? second.classList.add("btn","btn-outline-primary","btn-md");
  //? third.classList.add("btn","btn-outline-primary","btn-md");
  //? fourth.classList.add("btn","btn-outline-primary","btn-md");

  //!-----------------------Refactorizado----------------------------------
  const button = [...document.querySelectorAll(".verbs-answer")];
  button.forEach(function(element){
    element.classList.add("btn","btn-outline-primary", "btn-md")
  });
//!------------------------------------------------------------------------

  // iniciamos de atras hacia adelante
  if (lastPosition >= 0){
    var just_position = lastPosition+1;
  //sirve para actualizar el contador 
    verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    //sustituimos la palabra de bitcoins por el verbo a mostrar en forma aleatoria
    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;

    //tambien trae el audio aleatoriamente
    showAudio.src = "audio/"+verbs[randomPosition]+".mp3";
    showAudio.play();

    first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];

    rightAnswer = verbos[randomPosition];
    lastPosition =lastPosition - 1;
  }else{
    //Cuando se terminan las preguntas, y cuanndo se llega a 0 muestra el msj Thank you 
    verbsCounter.innerHTML = "0 / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    showVerb.innerHTML = "Thank you !";

    //Oculta los verbos
    verbsContainer.innerHTML = "";
  }
}

