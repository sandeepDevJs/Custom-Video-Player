// Get our elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//build functions
function togglePlay(e) {
    const method = video.paused ? "play" : "pause";
    video[method]()
}

function updateButton(e) {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(e) {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
    video[this.name] = this.value;
}

function handleProgress(e) {
    const percentage = (video.currentTime /  video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//hook up the listener
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress)

toggle.addEventListener("click", togglePlay);
skipButtons.forEach(e => e.addEventListener("click", skip));
ranges.forEach(e => e.addEventListener("change", handleRangeUpdate))

progress.addEventListener("click", scrub);
let isMouseDown = false;

progress.addEventListener("mousemove", (e) => isMouseDown && scrub(e))
progress.addEventListener("mousedown", () => isMouseDown = true)
progress.addEventListener("mouseup", () => isMouseDown = false)