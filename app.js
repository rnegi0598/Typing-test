const paraText="King Dasaratha is about to announce that his Son Rama will be the next King. But Queen Kaikeyi wants her son to be king. A plot unfolds and the king faces a terrible dilemma.Read by Jana and featuring the voices of her Sister Cousins, Parveen and Elizabeth.For the past few days, workers had been scrubbing the stones of the Royal streets until they dazzled in the sunlight. And now soldiers in bright uniforms were lining the pavements and crowds were gathering behind them.The queen turned to him, and he wiped the tears off her face with a silk scarf, until, eventually, she said, “In my whole life, nobody has treated me with so much disrespect as you have done";

const resetBtnEl=document.querySelector('.reset-div button');
const timeEl=document.querySelector('.time');
const paraTextEl=document.querySelector('.para-text');
const inputEl=document.querySelector('.input-field');
const notification=document.querySelector('.notification');
const errorEl=document.querySelector('.errors span');
const wpmEl=document.querySelector('.wpm span');
const accuracyEl=document.querySelector('.accuracy span');
const cpmEl=document.querySelector('.cpm span');
let currentTime=60;
let timerId;
let ind=0;
let errors=0;
let correct=0;
let totalKeysPressed=0;

function resetTimer(){
    
    //reset timer
    currentTime=60;
    clearInterval(timerId);
    timerId=setInterval(()=>{
        if(currentTime<0){
            clearInterval(timerId);
            inputEl.blur();
            resetBtnEl.classList.remove('blur');
            resetBtnEl.innerHTML='Try Again';
            resetBtnEl.disabled=false;
            notification.innerHTML='Click on Try Again button to begin the game.'
            return ;
        }
        timeEl.innerHTML=`${currentTime}`;
        currentTime--;
        //update wpm
        min=(60-currentTime)/60;
        words=totalKeysPressed/5;
        wpm=words/min;
        wpmEl.innerHTML=`${parseInt(wpm)}`;
        //update accuracy
        var accuracy=(correct/totalKeysPressed)*100;
        accuracyEl.innerHTML=`${parseInt(accuracy)}`;
        //update cpm

        cpmEl.innerHTML=`${parseInt(totalKeysPressed*(60-currentTime)/60)}`
        
    },1000);
}

function resetText(){
    //reset text
    paraTextEl.innerHTML="";
    paraText.split("").forEach(word=>{
        paraTextEl.innerHTML+=`<span>${word}</span>`
    })
}
const resetApp=function(){
    inputEl.value='';
    ind=0;
    error=0;
    totalKeysPressed=0;
    wpmEl.innerHTML=0;
    errorEl.innerHTML=0;
    timeEl.innerHTML=0;
    notification.innerHTML='Start Typing !!!'
    resetBtnEl.disabled=true;
    resetBtnEl.classList.add('blur');
    inputEl.focus();
    resetTimer();
    resetText();
   


};
resetText();
clearInterval(timerId);

resetBtnEl.addEventListener('click',resetApp);



inputEl.value='';
//disable click on input field

// on typing 
inputEl.addEventListener('input',(e)=>{
    totalKeysPressed++;
    // min=(60-currentTime)/60;
    // words=totalKeysPressed/5;
    // wpm=words/min;
    // wpmEl.innerHTML=`${parseInt(wpm)}`;
    let inputValue=inputEl.value;
    typedChar=inputValue[inputValue.length-1];

    const spanEl=paraTextEl.querySelectorAll('span');
    
    
    //backpace is hit
    if(e.inputType==='deleteContentBackward'){
        if(ind<=0){
            return;
        }
        ind--;
        if(spanEl[ind].classList.contains('incorrect')){
            errors--;
        }
        errorEl.innerHTML=`${errors}`;
        spanEl[ind].classList.remove('correct','incorrect','active');        
        return ;
    }
    spanEl[ind].classList.add('active');

    if(spanEl[ind].innerHTML===typedChar){
        spanEl[ind].classList.add('correct');
        correct++;
    }else{
        spanEl[ind].classList.add('incorrect');
        errors++;
        errorEl.innerHTML=`${errors}`;
    }

    ind++;
});

// Total Number of Words = Total Keys Pressed / 5