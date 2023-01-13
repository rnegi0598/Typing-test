let paraText='';

const resetBtnEl=document.querySelector('.reset-div button');
const timeEl=document.querySelector('.time');
const paraTextEl=document.querySelector('.para-text');
const inputEl=document.querySelector('.input-field');
const notification=document.querySelector('.notification');
const errorEl=document.querySelector('.errors span');
const wpmEl=document.querySelector('.wpm span');
const accuracyEl=document.querySelector('.accuracy span');
const cpmEl=document.querySelector('.cpm span');
let maxDuration=30; //default
let currentTime=maxDuration;
let timerId;
let ind=0;
let errors=0;
let correct=0;
let totalKeysPressed=0;
let accuracy=0;
let test=false;  //tell if test is going or not
// update maxDuration 
document.querySelector('.thirty-sec').onclick=function(){
    console.log('30 clicked');
    maxDuration=30;
    timeEl.innerHTML='30';
}
document.querySelector('.sixty-sec').onclick=()=>{
    console.log('60 clicked');
    maxDuration=60;
    timeEl.innerHTML='60';
}
//set paragraph
function setPara(){
    let ind=Math.floor(Math.random()*paragraph.length);
    paraText=paragraph[ind];
}
setPara();
// change paragraph
document.querySelector('.change-para').onclick=()=>{
    if(!test){
        setPara();
        resetText();
        inputEl.value='';
    }
}
//focus on input field on clicking on paragraph
paraTextEl.onclick=()=>{
    if(test){
        inputEl.focus();
    }
       
}
function resetTimer(){
    
    //reset timer
    currentTime=maxDuration;
    clearInterval(timerId);
    timerId=setInterval(()=>{
        if(currentTime<0){
            inputEl.blur();
            clearInterval(timerId);
            resetBtnEl.classList.remove('blur');
            resetBtnEl.innerHTML='Try Again';
            resetBtnEl.disabled=false;
            notification.innerHTML='Click on Try Again button to begin the test again.'
            test=false;
            return ;
        }
        timeEl.innerHTML=`${currentTime}`;
        currentTime--;
        //update wpm
        min=(maxDuration-currentTime)/60;
        words=totalKeysPressed/5;
        wpm=words/min;
        wpmEl.innerHTML=`${parseInt(wpm)}`;
        //update accuracy
        accuracy=(correct/totalKeysPressed)*100;
        if(Object.is(NaN,accuracy)){
            accuracy=0;
        }
        accuracyEl.innerHTML=`${parseInt(accuracy)}`;
        //update cpm
        cpmEl.innerHTML=`${parseInt(totalKeysPressed*(maxDuration-currentTime)/60)}`
        
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
    test=true;
    setPara();
    inputEl.value='';
    ind=0;
    error=0;
    accuracy=0;
    totalKeysPressed=0;
    correct=0
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
    let inputValue=inputEl.value;
    typedChar=inputValue[inputValue.length-1];

    const spanEl=paraTextEl.querySelectorAll('span');
    
    
    //backpace is hit
    if(e.inputType==='deleteContentBackward'){
        if(ind<=0){
            return;
        }
        ind--;
        //update errors
        if(spanEl[ind].classList.contains('incorrect')){
            errors--;
        }
        errorEl.innerHTML=`${errors}`;
        //remove classses
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