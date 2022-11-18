console.log("working bro");

let points = 0;

//grab the points span from dom
let pointsSpan = document.querySelector('#points');

//you'll need to update the points alot,  
function update(){
  pointsSpan.innerHTML = points;
  
  //add a badge?
  //add a badge every 100 points
}



// video shit - referenced...https://forum.webdeveloper.com/d/361855-how-to-best-track-how-long-a-video-has-been-played

// get html video player
// var video_data = document.getElementById("vid");

// callback function
// function videoStartedPlaying(){
//     console.log("play");
// }

//event listener
// video_data.addEventListener("play", videoStartedPlaying);

//create a js timeout that start give points for each x seconds watched

//pause event listener to stop the timeout
// video_data.addEventListener("pause", videoStoppedPlaying);
// video_data.addEventListener("playing", videoStartedPlaying); //how does this work?
// video_data.addEventListener("ended", videoStoppedPlaying); //give bonus points for finishing the video?

 
