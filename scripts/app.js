console.log("working bro");
// The app.js file will control the adding of points and display of badges
// Points will be added for clicking links, scrolling to the bottom, watching the video, and answering questions
// The game.js is a p5 sketch for a simple click game. It will add points and call the update function
// There is badge and question data in json format in data.js

//variables for keeping track of stuff
let points = 0; //plant a cookie to keep track of points?
let nextBadgeIndex = 0; //keep track of the current badge
let pointsSpan = document.querySelector('#points'); //grabs the points span from dom and store in a variable
let bottomHit = false; //need so user only gets points once for getting to the bottom
let questionNum = 0; //keep track of the current question
 
var audio = new Audio('../assets/sound.wav'); // sound effect

//you'll need to update the points alot,
function update(){
  pointsSpan.innerHTML = points; //update the points

  //flash color of points by adding a class
  let pointsBox = document.querySelector(".score");
  pointsBox.classList.add("blink");
  
  //after 200ms, remove the class to set points box back to white
  setTimeout(function(){
    pointsBox.classList.remove("blink");
  }, 200);

  //if there is a next badge and did the points pass a multiple of 250 
  if(achievements[nextBadgeIndex] != undefined && points / ((nextBadgeIndex + 1)*250) >= 1){
    // alert("you've unlocked a new badge!"); //use a modal instead?
    //get badge info from data.js
    let badgeData = achievements[nextBadgeIndex];
    //launch modal with data
    launchModal(badgeData);
    updateFooter(badgeData);

    nextBadgeIndex++; //que up for the next badge
  }
}

// Modal business, w3 schools
let modal = document.getElementById("badgeModal"); // Get the modal
let btn = document.getElementById("myBtn"); //button for testing the modal
let span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// launch modal to alert user that a badge has been added 
function launchModal(bData) {
  modal.style.display = "block"; //swap from hidden to block
  //fill exiting html slots with data
  modal.querySelector('.badge-title').innerHTML = bData.title; //title
  let badge = modal.querySelector('img'); //grabs the image slot
  badge.setAttribute('src', bData.src); //set image source attribute, concatenating the string name for the image
  modal.querySelector('.badge-description').innerHTML = bData.desc;
}

// add badges to the bottom of the screen 
function updateFooter(bData){
  let foot = document.querySelector('footer'); //append image to the footer
  let badge = document.createElement('img'); //create a new image

  badge.setAttribute('src', bData.src); //set image source attribute, concatenating the string name for the image
  // badge.setAttribute('src', '../badges/badges' + nextBadgeIndex + '.png'); //set image source attribute, concatenating the string name for the image
  foot.append(badge); //append to parent
}

// Give a point for every linked clicked
let links = document.querySelectorAll("a");
for(let a of links){
  a.addEventListener("click", linkClicked);
}
 
// call back funciton for link clicks
function linkClicked(e){
  audio.play(); //play a sound for points
  e.target.removeEventListener("click", linkClicked); //remove the event listener, you only get points the first time you click it!
  points+=10;
  update();
}

// Add points when reader gets to the bottom of the screen
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
let videos = document.querySelectorAll("video"); //will grab all the video elements, 
let vidInterval; //used to turn on and off the video interval

//add the event listeners to every video
for(let video_data of videos){
  video_data.addEventListener("play", videoStartedPlaying);
  video_data.addEventListener("pause", videoPaused);
  video_data.addEventListener("ended", videoOver);
}

// video callback functions
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
  audio.play(); //play a sound for points
  // give them some points if they finish the video
  points += 50;
  update();
}

// Quiz Show! 
// uses the questions array in data.js to create a quiz form
let check = document.getElementById("check"); //grab the quiz box
check.addEventListener("click", checkQuiz); //event listener for clicks
updateQuiz(); //display the quiz questions
 
function updateQuiz(){
  //clear any old status messages
  let status = document.querySelector("#status");
  status.style.display = "none";

  let quiz = document.querySelector('#quiz'); //get the form
  quiz.innerHTML = ""; //clear old questions

  //if there are still questions left, display the next question
  if(questionNum < questions.length){ 
    let q = questions[questionNum]; //get current question

    let title = document.createElement("H3"); //make an element for the title
    title.innerHTML = q.question; //set the text to the quesion text 
    quiz.append(title); //add to the quiz

    for (let choice in q.multi) { //set the radio buttons for answer choices

      let radio  = document.createElement("INPUT"); //make
      radio.setAttribute("type", "radio"); //set
      radio.setAttribute("id", choice);
      radio.setAttribute("value", q.multi[choice]);
      radio.setAttribute("name", "ans_choice");
      quiz.append(radio); //add to quiz

      let label = document.createElement("label"); //make
      label.setAttribute("for", choice);  //set
      label.innerHTML = q.multi[choice];
      quiz.append(label); //add

      quiz.append(document.createElement("br")); //make and add a break
    }
  } else {
    //no more questions 
    let title = document.createElement("H3"); //make
    title.innerHTML = "No More Questions"; //set
    quiz.append(title); //add

    check.remove(); //remove the check button
  }
}

function checkQuiz(){
  let answer = questions[questionNum].ans; //grab the answer for current question

  let radios = document.querySelectorAll("input") //get all the radios
  for(let i = 0; i < radios.length; i++){ //go through the radios
    if(radios[i].checked){ //only one will be checked, so you can trust the first one that is found is the users choice
      // console.log(radios[i].value);
      // console.log(radios[i].id);

      if(radios[i].id == answer){ //

        points += 25; //add points
        update(); //update the points

        questionNum++; //next question
        updateQuiz(); //reset the quiz
      } else {
        let quiz = document.querySelector('#quiz'); //grab the quiz container

        let status = document.querySelector("#status"); //grab the status message
        status.style.display = "block"; //unhides
      }
    }
  }
}
