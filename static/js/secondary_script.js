const volumeIcon = document.getElementById('volume-icon');
const muteIcon = document.getElementById('mute-icon');
const secondaryVideo = document.getElementById('secondary-page-video');

muteIcon.addEventListener('click', () => {
    secondaryVideo.muted = false;
    muteIcon.classList.add('hide');
    volumeIcon.classList.remove('hide');
});

volumeIcon.addEventListener('click', () => {
    secondaryVideo.muted = true;
    volumeIcon.classList.add('hide');
    muteIcon.classList.remove('hide');
});