let correctQuestion = document.querySelector('#correctQuestion')
let totalQuestion = document.querySelector('#totalQuestions')


const questions = [{
    question: "1\nWho won the 2016 olympic gold medal in the men's singles category",
    choices: ['Lee Chong Wei', 'Victor Axelsen', 'Chen Long'],
    correctAnswer: 2
  }, {
    question: "2\nWho won the Women's singles final at the 2020 All England Open?",
    choices: ['Tai Tzu-ying', 'Chen Yu Fei', 'P.V. Sindhu', 'Akane Yamaguchi'],
    correctAnswer: 0
  }, {
    question: "3\nHow many feathers should be in a shuttle?",
    choices: [20, 19, 16, 14, 15],
    correctAnswer: 2
  }, {
    question: "4\nWho won the 2019 Lagos International men's singles final?",
    choices: ['Nguyễn Tiến Minh', 'Anuoluwapo Opeyori', 'Misha Zilberman', 'Sergey Sirant'],
    correctAnswer: 0
  }, {
    question: "5\nWhat was the original name of Badminton?",
    choices: ['Shuttlecock', 'Poona', 'Battledore', 'All of these'],
    correctAnswer: 3
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
        
        for(y=0; y<element.choices.length; y++){
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

        let header = document.querySelector('#scoreHeader');
        let test = document.querySelector('#slides');
        test.style.display = 'none';
        let scoreHeader = document.querySelector('#scoreHeader');
        scoreHeader.style.display = 'none'

        let div = document.createElement('div')
        let div2 = document.createElement('div')
        let img = document.createElement('img');

        div.id = 'resultDisplay'
        div2.id = 'finalScoreDiv'
        img.id = 'scoreImage'
        img.src = 'badminton4.jpg'
        
        let score = (Number(correctQuestion.textContent)/Number(questions.length))*100;
        div2.innerText = `You scored ${score}%`
        div.appendChild(div2)

        header.insertAdjacentElement('afterend', div)
        nextBtn.innerText = "Restart quiz"
    }
    else{
        window.location.reload();
    }
});
