'use strict';

const constraints = window.constraints = {
  audio: false,
  video: {
    deviceID: "SnapCameraVirtualDevice"
  }
}

const showVideo = document.getElementById('showVideo')

function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    const v = constraints.video;
    errorMsg(`Rozdzielczosc ${v.width.exact}x${v.height.exact} px nie jest obslugiwana przez to urzadzenie.`);
  } else if (error.name === 'NotAllowedError') {
    errorMsg('Nie udzielono uprawnien do kamery.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}

document.querySelector('#showVideo').addEventListener('click', e => init(e));

  // fullscreen po kliknieciu
document.addEventListener('click', function(e) {
  if (e => init(e)) {
    toggleFullScreen();
  }
}, false);

const button = document.getElementById('showVideo');

  // hide button
document.addEventListener('click', () => {
  showVideo.style.display = 'none';

})

  // hide div
document.addEventListener('click', () => {
  const button = document.getElementById('button');
  button.style.display = 'none';
})
