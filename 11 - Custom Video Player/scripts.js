const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build out functions
function togglePlay(){
  // if(video.paused){
  //   video.play();
  // } else {
  //   video.pause();
  // }
  // or use ternary operator
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
//.paused is a property that lives on the video, no playing property

function updateButton(){
  const icon = this.paused ? '>' : '||';
  //the this is bound to the video
  toggle.textContent = icon;
  console.log('Update the button');
  //
}

function skip(){
  console.log(this.dataset.skip);
  //object with value of -10 or 25 for the two buttons
  video.currentTime += parseFloat(this.dataset.skip);
  //parseFloat converts into true number
}

function handleRangeUpdate(){
  video[this.name] = this.value;
  // video['volume']
  // video['playbackRate']
  //volume and playbackRate are the two properties you want to update
  console.log(this.name);
  console.log(this.value);
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  //currentTime and duration are properties on the video
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  //offsetWidth will give you entire width of bar
  //then update
  video.currentTime = scrubTime;
  console.log(e)
}

video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
//flag variable
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
//will first check the variable mousedown, if true it moves onto function

progress.addEventListener('mousedown', () => mousedown=true);
progress.addEventListener('mouseup', () => mousedown=false);
