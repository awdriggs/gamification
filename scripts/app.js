console.log("working bro");
//variables for keeping track of stuff
let points = 0; //plant a cookie to keep track of points?
let nextBadgeIndex = 0;

//dom elements
//grab the points span from dom and store in a variable
let pointsSpan = document.querySelector('#points');

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
  if(points >= 800){
    alert("You've completed the gamification quest!");
  }
}

function updateFooter(bData){
    let foot = document.querySelector('footer'); //append image to the footer
    let badge = document.createElement('img'); //create a new image
    badge.setAttribute('src', bData.src); //set image source attribute, concatenating the string name for the image
    
    // badge.setAttribute('src', '../badges/badges' + nextBadgeIndex + '.png'); //set image source attribute, concatenating the string name for the image
    foot.append(badge); //append to parent
}

//see when you have got to the bottom of the screen

// quiz show? how have questions about gamification to answer stored as a json file.
// get a random value from the questons index
// use values to populate a form
// user clicks button to check if their answer is write, points given for each correct answer, 10 points?
// points taken away for each answer.
// ex questons = [{question: "what color is sky?", multi: [a: "red", b: "blue", c: "green", d: "black"], ans: c}],

// VIDEO STUFF!
// see if the user is watched the video, give them so points for every x seconds watched
// give them some points if they finish the video
// video stuff - referenced...https://forum.webdeveloper.com/d/361855-how-to-best-track-how-long-a-video-has-been-played

// this works with an youtube embed!
// get html video player
var video_data = document.getElementById("video"); //will grab the video element from the iframe

// callback function
function videoStartedPlaying(){
    console.log("play");
}

//event listener
video_data.addEventListener("play", videoStartedPlaying);

//create a js timeout that start give points for each x seconds watched

//pause event listener to stop the timeout
// video_data.addEventListener("pause", videoStoppedPlaying);
// video_data.addEventListener("playing", videoStartedPlaying); //how does this work?
// video_data.addEventListener("ended", videoStoppedPlaying); //give bonus points for finishing the video?

// Modal business, w3 schools
var modal = document.getElementById("badgeModal"); // Get the modal
var btn = document.getElementById("myBtn"); //button for testing the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

// When the user clicks on the button, open the modal
function launchModal(bData) {
  modal.style.display = "block"; //swap from hiddent to block
  //fill exiting html slots with data 
  modal.querySelector('.badge-title').innerHTML = bData.title; //title
  let badge = modal.querySelector('img'); //grabs the image slot
  badge.setAttribute('src', bData.src); //set image source attribute, concatenating the string name for the image
  modal.querySelector('.badge-description').innerHTML = bData.desc;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

