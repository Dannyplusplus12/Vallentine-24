
function rd(max) {
    return Math.floor(Math.random()*max)
}

particlesJS.load('bg-particle', './static/src/particles.json', function() {
    console.log('callback - particles.js config loaded');
})


LongCloud = document.querySelectorAll('.long-cloud')
LongCloudData = [[-1000, 1, 1, 60], [0, 2, -1, 60], [0, 1, -1, 60]]

for(let i = 0; i < LongCloud.length; ++i) {
    setInterval(()=>{
        LongCloud[i].style.left = LongCloudData[i][0] + 'px'
        LongCloudData[i][0] += LongCloudData[i][1]*LongCloudData[i][2]

        if(LongCloudData[i][0] >= 0 || LongCloudData[i][0]+innerWidth*2 <= innerWidth) {
            LongCloudData[i][1] = Math.random()*3
            LongCloudData[i][2] *= -1
        }

    }, LongCloudData[i][3])    
}

FadeIn = ['animate__fadeInDown', 'animate__fadeInLeft', 'animate__fadeInRight', 'animate__fadeInUp']
FadeOut = ['animate__fadeOutDownBig', 'animate__fadeOutLeftBig', 'animate__fadeOutRightBig', 'animate__fadeOutUpBig']

StartBtn_wrapper = document.getElementById('start_btn-wrapper')
StartBtn = document.getElementById('start_btn')
StartBtn.addEventListener('click', ()=>{
    var audio = new Audio('./static/asset/background-music.mp3');
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();
    
    StartBtn_wrapper.classList.add('animate__backOutDown')
    StartBtn_wrapper.addEventListener('animationend', ()=>{
        StartBtn.classList.add('none')
        
        clouds = document.querySelectorAll('.cloud')
        clouds[clouds.length-1].classList.remove('none')
        clouds[clouds.length-1].classList.add(FadeIn[rd(4)])

        for(let i = 0; i < clouds.length; ++i) {
            clouds[i].addEventListener('click', ()=>{
                clouds[i].classList.add(FadeOut[rd(4)])
                clouds[i].addEventListener('animationend', ()=>{
                    clouds[i].classList.add('none')
                    if(i == 0) {
                        Choose.classList.remove('none')
                        Choose.classList.add('animate__zoomIn')
                    }
                })

                try {
                    clouds[i-1].classList.add(FadeIn[rd(4)])
                    clouds[i-1].classList.remove('none')
                } catch (error) {
                    console.log()
                }
            })
        }

    })
    for(let i = 0; i < LongCloud.length; ++i) {
        if(LongCloudData[i][2] < 0)
            LongCloud[i].classList.add('animate__backOutLeft')
        else
            LongCloud[i].classList.add('animate__backOutRight')
    }
})


YesBtn = document.getElementById('yes-btn')

let Choose = document.getElementById('choose')

let NoMessIndex = -1
let NoMess = ['Think again', 'i said think again', 'come on', 'be a good girl', 'heyyy', 'you hate me like that?', 'ok fine', 'you know what?', 'i wont let you touch this', 'NOO']


let NoBtn = document.getElementById('no-btn')
let FNoBtn = document.getElementById('fake_no-btn')
NoBtn.addEventListener('click', function handler() {
    ++NoMessIndex
    if(NoMessIndex == NoMess.length-1) {
        NoBtn.removeEventListener('click', handler)
        NoBtn.classList.add('invisible')
        FNoBtn.classList.remove('none')
    }
    NoBtn.innerHTML = NoMess[NoMessIndex]
})

FNoBtn.addEventListener('mouseover', ()=>{
    FNoBtn.style.left = rd(innerWidth - 50) + 20 + 'px'
    FNoBtn.style.top = rd(innerHeight - 50) + 20 + 'px'
})

GoodGirl = document.getElementById('good-girl')
YesBtn.addEventListener('click', ()=>{
    Choose.classList.add('none')
    GoodGirl.classList.remove('none')
    GoodGirl.classList.add('animate__zoomIn')
})

document.querySelector('#good-girl > div').addEventListener('click', ()=>{
    GoodGirl.classList.add('none')
    AnsWer.classList.remove('none')
    AnsWer.classList.add('animate__zoomIn')
})


AnsWer = document.getElementById('answer')
let answerBox = document.querySelector('.answer-box');

function textGenerate() {
    var outText = ""
    var text = "I have no reason.. you are the best person i have ever met!!!"
    var textArr = Array.from(text)
    var textVal = answerBox.value
    var count = textVal.length
    if(count > text.length) {
        answerBox.value = text
        document.querySelector('#answer > div').classList.remove('none')
    }
    else {
        if(count > 0) {
            for (let i = 0; i < count; i++) {
                outText += textArr[i]
            }
        }
        answerBox.value = outText
    }
}
answerBox.addEventListener('input', textGenerate)

document.querySelector('#answer > div').addEventListener('click', ()=>{
    AnsWer.classList.add('none')
    document.getElementById('after-answer').classList.remove('none')
    document.getElementById('after-answer').classList.add('animate__zoomIn')
})


document.querySelector('#after-answer > div').addEventListener('click', ()=>{
    document.querySelector('#after-answer').classList.add('none')
    BeforeLetter.classList.remove('none')
    LetterImage.classList.add('animate__rubberBand')
})

Letter = document.getElementById('letter')

BeforeLetter = document.getElementById('before_letter')
LetterImage = document.getElementById('letter-img')
LetterImage.addEventListener('click', ()=>{
    LetterImage.src = '../static/asset/letter.gif'
    window.setTimeout(()=>{
        LetterImage.classList.add('animate__fadeOutDownBig')
        LetterImage.addEventListener('animationend', ()=>{
            BeforeLetter.classList.add('none')
            Letter.classList.remove('none')
            Letter.classList.add('animate__fadeInUp')
            particlesJS.load('bg-particle', './static/src/particles.json', function() {
                console.log('callback - particles.js config loaded');
            })   
        })
    }, 2000)
})
