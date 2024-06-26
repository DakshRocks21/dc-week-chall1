var cachelist = []
var previndex = -1
var data = null
var ans = null

function next(clicked) {
  //put random qn in question h1 element and set stats
  randomqn(clicked)

  //play press audio
  const audio = new Audio('assets/press.mp3');
  audio.play();

  //restart animations
  question = document.getElementById("question");
  question.style.animation = 'none';
  question.offsetHeight;
  question.style.animation = null;

}

async function randomqn(clicked) {
  if (previndex == -1 && clicked.id == "buttonyes") {

    const response = await fetch("https://raw.githubusercontent.com/dakshrocks21/data/main/test_projects/questions.json")
    const response2 = await fetch("https://raw.githubusercontent.com/dakshrocks21/data/main/test_projects/answers.json")

    data = await response.json()
    ans = await response2.json()

    previndex = 0;
  }

  else if (previndex == -1 && clicked.id == "buttonno") {
    pressedno = ["What now? Press YES", "Press YES man", "How many times should I tell, press YES", "Press Yes for good grades", "Press YES to start", "Are you ready?", "Are you ... ready??","Press YES for MR YEO"]

    document.getElementById("question").innerHTML = pressedno[Math.floor(Math.random() * pressedno.length)]
  }

  //changing STATS
  if (previndex != -1) {

    qnno = Math.floor(Math.random() * (Object.keys(data).length))
    while (cachelist.includes(qnno)) {
      qnno = Math.floor(Math.random() * (Object.keys(data).length))
    }

    document.getElementById("question").innerHTML = data[qnno];
    cachelist.push(qnno);

    document.getElementById("stats-text").innerHTML =
      "answered " + clicked.id.slice(6).toUpperCase() + " to<br>" + data[previndex]

    if (clicked.id == "buttonyes")
      percent = ans[previndex]

    else
      percent = 100 - ans[previndex]

    document.getElementById("stats-percentage").innerHTML = percent.toString() + "%"

    if (previndex != 0)
      document.getElementById("stats").style.visibility = "visible";

    previndex = qnno;
  }

  // repeat qns endlessly
  if (data != null)
    if (cachelist.length == Object.keys(data).length) {
      cachelist = []
    }
}

//Part 2/5: google.com/drive/
