console.log("working bro");

//variables for keeping track of stuff
let points = 0; //plant a cookie to keep track of points?
let nextBadgeIndex = 0;
let pointsSpan = document.querySelector('#points'); //grabs the points span from dom and store in a variable

let bottomHit = false;
let questionNum = 0;
 
// sound effect
var audio = new Audio('../assets/sound.wav');
 
// Modal business, w3 schools
let modal = document.getElementById("badgeModal"); // Get the modal
let btn = document.getElementById("myBtn"); //button for testing the modal
let span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
//Event Listeners, listen for like clicks, scrolling, and video play
//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
 
// Give a point for every linked clicked
let links = document.querySelectorAll("a");
for(let a of links){
  a.addEventListener("click", linkClicked);
}
 
function linkClicked(e){
  console.log(e);
  e.target.removeEventListener("click", linkClicked); //remove the event listener, you only get points the first time you click it!
  points+=10;
  update();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//Video Business
let videos = document.querySelectorAll("video"); //will grab all the video elements, 
let vidInterval; //used to turn on and off the video interval

//add the event listeners to every video
for(let video_data of videos){
  video_data.addEventListener("play", videoStartedPlaying);
  video_data.addEventListener("pause", videoPaused);
  video_data.addEventListener("ended", videoOver);
}

//Quiz stuff
let check = document.getElementById("check");
check.addEventListener("click", checkQuiz);
updateQuiz(); //display the quiz questions

//functions

//you'll need to update the points alot,
function update(){
  pointsSpan.innerHTML = points; //update the points

  //if there is a next badge and did the points pass a multiple of 100
  if(achievements[nextBadgeIndex] != undefined && points / ((nextBadgeIndex + 1)*100) >= 1){
    // alert("you've unlocked a new badge!"); //use a modal instead?
    //get badge info from data.js
    let badgeData = achievements[nextBadgeIndex];
    //launch modal with data
    launchModal(badgeData);
    updateFooter(badgeData);

    nextBadgeIndex++; //que up for the next badge
  }
  audio.play();
}

function updateFooter(bData){
  let foot = document.querySelector('footer'); //append image to the footer
  let badge = document.createElement('img'); //create a new image

  badge.setAttribute('src', bData.src); //set image source attribute, concatenating the string name for the image
  // badge.setAttribute('src', '../badges/badges' + nextBadgeIndex + '.png'); //set image source attribute, concatenating the string name for the image
  foot.append(badge); //append to parent
}


//see when you have got to the bottom of the screen
window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    // you're at the bottom of the page
    if(bottomHit == false){
      bottomHit = true;
      console.log("bottom");
      points += 75;
      update();
    }

  }
};

// VIDEO STUFF!
// see if the user is watched the video, give them so points for every x seconds watched
// video stuff - referenced...https://forum.webdeveloper.com/d/361855-how-to-best-track-how-long-a-video-has-been-played

// video callback function
function videoStartedPlaying(){
  console.log("play");
  //setInterval will fire a function after x amount of seconds.
  //setInterval must be stored in a variable so that that you can clear the interval function
  //The first parameter is a function, here we are using an anonymous function as the callback
  //The second parameter is a time, here we set the interval to fire every 1000 milliseconds or 1 second.
  vidInterval = setInterval(function(){
    console.log("video points");
    points+=5;
    update();
  }, 1000);
}

function videoPaused(){
  console.log("paused");
  //This stops the setInterval function
  clearInterval(vidInterval);
}

function videoOver(){
  console.log("over");
  // give them some points if they finish the video
  points += 50;
  update();
}

// When the user clicks on the button, open the modal
function launchModal(bData) {
  modal.style.display = "block"; //swap from hiddent to block
  //fill exiting html slots with data
  modal.querySelector('.badge-title').innerHTML = bData.title; //title
  let badge = modal.querySelector('img'); //grabs the image slot
  badge.setAttribute('src', bData.src); //set image source attribute, concatenating the string name for the image
  modal.querySelector('.badge-description').innerHTML = bData.desc;
}

 
function updateQuiz(){
  //clear any old status messages
  let status = document.querySelector("#status");
  status.style.display = "none";

  //get the form
  let quiz = document.querySelector('#quiz');
  quiz.innerHTML = "";
  if(questionNum < questions.length){
    let q = questions[questionNum];

    let title = document.createElement("H3");
    title.innerHTML = q.question;
    quiz.append(title);

    for (let choice in q.multi) {

      let radio  = document.createElement("INPUT");
      radio.setAttribute("type", "radio");
      radio.setAttribute("id", choice);
      radio.setAttribute("value", q.multi[choice]);
      radio.setAttribute("name", "ans_choice");
      quiz.append(radio);

      let label = document.createElement("label");
      label.setAttribute("for", choice);
      label.innerHTML = q.multi[choice];
      quiz.append(label);

      quiz.append(document.createElement("br"));
    }
  } else {
    let title = document.createElement("H3");
    title.innerHTML = "No More Questions";
    quiz.append(title);
    //remove the check button
    check.remove();
  }
}

function checkQuiz(){
  let answer = questions[questionNum].ans;

  let radios = document.querySelectorAll("input")
  for(let i = 0; i < radios.length; i++){
    if(radios[i].checked){
      console.log(radios[i].value);
      console.log(radios[i].id);

      if(radios[i].id == answer){

        points += 10; //add points
        update(); //update the points

        questionNum++;
        updateQuiz();
      } else {
        let quiz = document.querySelector('#quiz');

        let status = document.querySelector("#status");
        status.style.display = "block";
      }
    }
  }
}
