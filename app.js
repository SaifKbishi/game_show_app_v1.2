document.addEventListener('DOMContentLoaded', ()=> {
  const keyboard = document.getElementById('qwerty');
  const phraseSection = document.getElementById('phrase');
  const overlay = document.getElementById('overlay');
  const startGameBtn = overlay.lastElementChild;
  const title = overlay.firstElementChild;
  const ul = document.getElementById('lettersul');
  const scoreboard = document.getElementById('scoreboard');
  const hearts = document.getElementsByClassName('tries');
  //const li = hearts.getElementsByTagName('li');
  const withClassLetter = document.getElementsByClassName('letter');

  const keyrow = document.getElementsByClassName('keyrow');


  let phrases = ['To kill two birds with one stone', 'To add insult to injury', 'A piece of cake', 'Once in a blue moon', 'The best of both worlds',
    'No Pain No Gain', 'it does not matter how slowly you go as long as you do not stop'];
  let missed = 0;
  let letterFound = null;
  let guessedLetter = 0;
  let transitions = ['all ','ease ' , 'ease-in ' , 'ease-out ' , 'ease-in-out'];

  startGameBtn.addEventListener('click',(e)=>{
        overlay.style.display = 'none';
  });

  function getRandomPhraseAsArray(arr){
    let randIndex = Math.floor(Math.random() * arr.length);
    let charsArray = arr[randIndex];
    return charsArray;
  }
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));

  function addPhraseToDisplay(arr){
    for(let i=0; i < arr.length; i+=1){
        const li = document.createElement('li');
        if(arr[i] == ' '){
          li.innerHTML = '&nbsp &nbsp';
            ul.appendChild(li);
        }else{
          li.textContent = arr[i];
          ul.appendChild(li);
          if(arr[i].toLowerCase().match(/[a-z]/i)){
            li.className = 'letter';
          }
        }

    }
  }

  function checkLetter(btnClicked){
    let matchLetter = null;
    for( i = 0; i<withClassLetter.length; i +=1){
      if(btnClicked === withClassLetter[i].textContent.toLowerCase()){
        withClassLetter[i].classList.add('show');
        withClassLetter[i].style.transition = transitions[i % 5] + i +'s';
        guessedLetter+=1;
        matchLetter = true;
      }
    }
    return matchLetter;
  }

keyboard.addEventListener('click', (e)=> {
  if(e.target.type === 'submit'){
    let clickedbtn = e.target.textContent;
    e.target.classList.add('chosen');
    e.target.disabled = true;
    letterFound = checkLetter(clickedbtn);
    if(letterFound === null){
      hearts[missed].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
      missed++;
    }
  }

  checkWin();
});

function checkWin(){
    if(guessedLetter === withClassLetter.length){
      overlay.style.display = 'flex';
      overlay.classList.remove('lose');
      overlay.classList.add('win');
      title.innerHTML ='You WON';
      /*const WannaPlayAgainButton = document.createElement('button');
      WannaPlayAgainButton.textContent = 'Wanna Play Again';
      title.insertBefore(WannaPlayAgainButton,startGameBtn);*/
      //addWannaPlayAgainButton():
    //  startGameBtn.innerHTML = 'Wanna Play Again';
      //startGameBtn.style.display = 'none';
      removePhraseFromDisplay();
      console.log('addPhraseToDisplay');
      addPhraseToDisplay(getRandomPhraseAsArray(phrases));

    }else if(missed === 5){
      overlay.style.display = 'flex';
      overlay.classList.add('lose');
      title.innerHTML ='You Lose';
  /*    startGameBtn.innerHTML = 'Wanna Play Again';
      startGameBtn.addEventListener('click',(e)=>{
        missed = 0;
        for(i=0; i<hearts.length; i+=1){
          hearts[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
        }

        removePhraseFromDisplay();
        console.log('addPhraseToDisplay');
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));
      });*/
    }
}

function removePhraseFromDisplay(){
  const lisul = keyboard.getElementsByTagName('button');
  for(let i=0; i < lisul.length-1; i+=1){
    console.log(lisul[i]);
    lisul[i].classList.remove('chosen');
    lisul[i].disabled = false;
  }
  while(ul.firstElementChild){
    ul.removeChild(ul.firstElementChild);
  }
}






});
