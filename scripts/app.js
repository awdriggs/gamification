console.log("working bro");

//variables for keeping track of stuff
let points = 0; //plant a cookie to keep track of points?
let nextBadgeIndex = 0;
let pointsSpan = document.querySelector('#points'); //grabs the points span from dom and store in a variable
let vidInterval;
let video_data = document.getElementById("video"); //will grab the video element, works with youtube iframe!
let bottomHit = false;
let questionNum = 0;

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

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//video event listener
video_data.addEventListener("play", videoStartedPlaying);
video_data.addEventListener("pause", videoPaused);
video_data.addEventListener("ended", videoOver);

//setup the quiz
setupQuiz();

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

  // no more badges! just do nothing instead?
  // if(points >= 800){
  //   alert("You've completed the gamification quest!");
  // }
}

function updateFooter(bData){
  let foot = document.querySelector('footer'); //append image to the footer
  let badge = document.createElement('img'); //create a new image

  badge.setAttribute('src', bData.src); //set image source attribute, concatenating the string name for the image
  // badge.setAttribute('src', '../badges/badges' + nextBadgeIndex + '.png'); //set image source attribute, concatenating the string name for the image
  foot.append(badge); //append to parent
}

function vidPoints(){
  console.log("video points");
  points+=10;
  update();
}

//see when you have got to the bottom of the screen

//window.innerHeight + window.scrollY
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
// quiz show? how have questions about gamification to answer stored as a json file.
// get a random value from the questons index
// use values to populate a form
// user clicks button to check if their answer is write, points given for each correct answer, 10 points?
// points taken away for each answer.
// ex questons = [{question: "what color is sky?", multi: [a: "red", b: "blue", c: "green", d: "black"], ans: c}],

// VIDEO STUFF!
// see if the user is watched the video, give them so points for every x seconds watched
// video stuff - referenced...https://forum.webdeveloper.com/d/361855-how-to-best-track-how-long-a-video-has-been-played

// video callback function
function videoStartedPlaying(){
  console.log("play");
  //create a js timeout that start give points for each x seconds watched
  // setTimeout(function() {console.log("time")}, 100);
  vidInterval = setInterval(vidPoints, 1000);
}

function videoPaused(){
  console.log("paused");
  //pause event listener to stop the timeout
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

function setupQuiz(){
  //get the form
  document.querySelector('#quiz');
  for(let i = 0; i < questions.length; i++){
    let q = questions[questionNum];
    debugger;
    let radio  = document.createElement("INPUT");
    radio.setAttribute("type", "radio");
    radio.setAttribute("value", );
    // <!-- <input type="radio" id="a" name="ans_choice" value=""> <label for="a">??</label><br> -->
  }
}

