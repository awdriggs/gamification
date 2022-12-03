let test = "some nonsense";

// Bagdes json
// an array of objects,
// each obj has a title, src for img url, and an description
let achievements = [
  {title: "First Badge Unlocked!", src: "badges/computer.png", desc: "Congratulations! You've unlocked your first achievement badge. Get another 250 points to get your next badge."},
  {title: "So Much Gowth!", src: "badges/leaf.png", desc: "Your knowledge is really growing!"},
  {title: "Blast Off!!", src: "badges/shuttle.png", desc: "Wow! You're really taking off. Keep going for more badges!"},
  {title: "You're Bright!!", src: "badges/bulb.png", desc: "You are really lighting up the room now!"},
  {title: "Thumbs Up!", src: "badges/thumb.png", desc: "I like what you are doing here!"},
  {title: "You're a star in my eyes!", src: "badges/star.png", desc: "I'm seeing stars!"},
  {title: "Coming in first!", src: "badges/medal.png", desc: "Almost there! Keep up the good work."},
  {title: "What a Winner!", src: "badges/trophy.png", desc: "This is your last badge! Way to work hard."},
]

// questions
// an array of objects
// ex questons = [{question: "what color is sky?", multi: [a: "red", b: "blue", c: "green", d: "black"], ans: c}],
let questions = [
  // {question: "What color is the sky?", multi: {a: "red", b: "blue", c: "green", d: "black"}, ans: "b"},
  // {question: "What color is grass?", multi: {a: "red", b: "blue", c: "green", d: "black"}, ans: "c"},
  // {question: "What color is a stop sign?", multi: {a: "red", b: "blue", c: "green", d: "black"}, ans: "a"},
  // {question: "What color is a batman's cape??", multi: {a: "red", b: "blue", c: "green", d: "black"}, ans: "d"},
  {question: "What is meant by gamification?", multi: {a: "watching movies at school before a break", b: "when game mechanics are applied to non-game, non-entertainment ways", c: "playing video games with friends during remote learning days", d: "when video game mechanics are updated before a new release"}, ans: "b"},
  {question: "What are examples of gamification?", multi: {a: "points, gold stars and trophies", b: "simulations, avatars and levels", c: "competition, rules and taking turns", d: "all of the above"}, ans: "d"},
  {question: "Effective gamification should:", multi: {a: "use gimmicks", b: "give punishments", c: "help learning", d: "distract students"}, ans: "c"},
  {question: "What is a possible benefit of effective gamification for students?", multi: {a: "higher motivation", b: "having fun at school", c: "making difficult subjects easier to learn", d: "all of the above"}, ans: "d"},
  {question: "What is a possible negative aspect of gamification for students?", multi: {a: "less motivation", b: "ranking", c: "surveillance", d: "all of the above"}, ans: "a"},
  {question: "What does research say about gamification in schools?", multi: {a: "research shows that gamification is the most effective way to learn", b: "research shows that gamification is not always good, especially if it is forced", c: "research shows that teachers would be happier if they played more games", d: "research shows that as long as you’re getting points, gamification is effective"}, ans: "b"},
]
