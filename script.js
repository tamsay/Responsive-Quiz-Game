let correctQuestion = document.querySelector('#correctQuestion')
let totalQuestion = document.querySelector('#totalQuestions')


const questions = [{
    question: "What is 2*5?",
    choices: [2, 5, 10, 15, 20],
    correctAnswer: 2
  }, {
    question: "What is 3*6?",
    choices: [3, 6, 9, 12, 18],
    correctAnswer: 4
  }, {
    question: "What is 8*9?",
    choices: [72, 99, 108, 134, 156],
    correctAnswer: 0
  }, {
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "What is 8*8?",
    choices: [20, 30, 40, 50, 64],
    correctAnswer: 4
  }];
 
  correctQuestion.innerText = 0;
  totalQuestion.innerText = questions.length;

  let createQuestions=(questions)=>{
    let questionsSection = document.querySelector('#slides');

    let myQuestion =(slideClass)=>{
        let element = questions[x];     

        let div = document.createElement('div')
        let h2 = document.createElement('h2')
        div.className = ` questions ${slideClass}`
        div.id = `question${questions.indexOf(element) +1}`
        h2.innerText = `${element.question}`;

        div.appendChild(h2)
        
        for(y=0; y<5; y++){
            let optionDiv = document.createElement('div')
            let radio = document.createElement('input')
            let span = document.createElement('span')

            optionDiv.className = 'optionsDiv'
            radio.setAttribute('type', 'radio');
            radio.className = 'options'
            radio.setAttribute('name', `Question${questions.indexOf(element) +1}`)
            span.innerHTML = `${element.choices[y]}`

            optionDiv.appendChild(radio)
            optionDiv.appendChild(span);
            div.appendChild(optionDiv)
        }
        questionsSection.appendChild(div);
        }
        for(x=0; x<questions.length; x++){
            if(x===0){
                let slideClass = 'slide showing';
                myQuestion(slideClass);
            }
            else{
                let slideClass = 'slide'
                myQuestion(slideClass);
            }
        }       
  }
  createQuestions(questions);

  let getAnswer =(items)=>{
    for(x=0; x<items.length; x++){
        let allOptions = Array.from(document.querySelectorAll(`#question${x+1} .options`));
    
        let answer = (items[x].correctAnswer)
        console.log(allOptions)

        allOptions.forEach(element=>{
          element.addEventListener('click', ()=>{
              allOptions.forEach(item=>{
                  item.setAttribute('disabled', true);
              })
              if(allOptions.indexOf(element) === answer){
                  element.parentElement.className = 'correct optionsDiv'
                  calculateScore()
              }
              else{
                element.parentElement.className = 'wrong optionsDiv'
              }
        allOptions[answer].parentElement.className = 'correct optionsDiv'
              
          })
        })
      }
  }
  getAnswer(questions)

  let score = 0;
  let calculateScore =()=>{
        score++;
        correctQuestion.innerText = score;

        // let resultDiv = document.querySelector('#test');
        // resultDiv.innerText = `You got ${score} out of ${questions.length} Questions`
        // resultDiv.style.display = 'none'
  }
  
  


var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide showing';
}

let nextBtn = document.querySelector('#next');

let count = 0;
nextBtn.addEventListener('click', ()=>{
    count++;
    if(count < questions.length-1){
        nextSlide();
    }
    else if(count === 4){
        nextSlide();
        nextBtn.innerText = "End quiz"
        
    }
    else if (count === 5){
        let test = document.querySelector('#slides');
        test.style.display = 'none';
        let scoreHeader = document.querySelector('#scoreHeader');
        scoreHeader.style.display = 'none'

        let resultDiv = document.querySelector('#test');
        resultDiv.innerText = `You got ${correctQuestion.textContent} out of ${questions.length} Questions`
        nextBtn.innerText = "Restart quiz"
        

    }
    else{
        window.location.reload();
    }

});
