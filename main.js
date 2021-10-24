// document.querySelector('.movie').textTracks[0].cues[1].text
// document.querySelector('.movie').textTracks[0].cues[1].startTime
// .textTracks[0].cues[1].endTime
let movie = document.querySelector(".movie");
let defaultTrack = document.querySelector(".defaultTrack");
let lang1 = document.querySelector(".chapter-lang1");
let lang2 = document.querySelector(".chapter-lang2");
let selectMovieInput = document.querySelector('.select-movie');
let mainSubInput = document.querySelector('.select-main-sub');

selectMovieInput.addEventListener('change', renderMovie);
function renderMovie() {
  try {
    let movieSource = window.URL.createObjectURL(selectMovieInput.files[0])
    movie.src = movieSource;
  } catch (err) {
    console.log(err);
  }
}
mainSubInput.addEventListener("change", addMainSub);
function addMainSub() {
  try {
    let mainSubSource = window.URL.createObjectURL(mainSubInput.files[0])
    defaultTrack.src = mainSubSource;
    console.log(mainSubSource);
  } catch (err) {
    console.log(err);
  }
}



movie.textTracks[1].mode = "hidden";
defaultTrack.addEventListener("load", renderChapters);

function renderChapters(e) {
  console.log("onload");
  let track = defaultTrack.track;
  let chap1 = movie.textTracks[1];
  chap1.oncuechange = function (e) {
	if (chap1.activeCues.length !== 0) {
	  lang1.innerText =  chap1.activeCues[0].text;

	  setTimeout(() => {
		  lang1.innerText = "";
		}, (chap1.activeCues[0].endTime - chap1.activeCues[0].startTime) * 1000);
	}
  
};
	track.oncuechange = function (e) {
	if (track.activeCues.length !== 0) {
	  lang2.innerText =  track.activeCues[0].text;

	  setTimeout(() => {
		  lang2.innerText = "";
		}, (track.activeCues[0].endTime - track.activeCues[0].startTime) * 1000);
	}
  
};


  // let i = 0;

  // track.oncuechange = function () {
  //

  // 	let curCue = track.activeCues
  // 	if (curCue.length !== 0 && typeof curCue[0] !== 'undefined') {
  // 		console.log("cue shanged ", i++);
  // 		// lang1.innerText =  movie.textTracks[1].cues[syncLang(curCue)].text;
  // 		let chap1 = movie.textTracks[1]

  // 		lang1.innerText =  lang1.activeCues[0].text;
  // 		setTimeout(() => {
  // 			lang1.innerText = ""
  // 		},(lang1.activeCues[0].endTime - lang1.activeCues[0].startTime) * 1000 );
  // 	}
}

// }
// function syncLang(curCue) {
// 	let chap1 = movie.textTracks[1]
// 	let curTime = movie.currentTime;
// 	curCue.startTime
// 	chap1.cues.__proto__.reduce = Array.prototype.reduce;
// 	let minIndex = curCue[0].id - 150 >= 0 ? curCue[0].id - 150 : 0;
// 	let maxIndex = curCue[0].id + 150 >= chap1.cues.length - 1 ?  chap1.cues.length - 1 : curCue[0].id + 150;
// 	let minTimeDif = Number.POSITIVE_INFINITY;
// 	let closestCueIndex;
// 	for (let i = minIndex; i < maxIndex; i++) {
// 		if(minIndex === 0) return 0
// 		let curTimeDif = Math.abs(lang1.cues[i].startTime - curTime);
// 		if (curTimeDif < minTimeDif ) {
// 			minTimeDif = curTimeDif;
// 			closestCueIndex = i;
// 		}
// 	}
// 	return closestCueIndex;
// }
