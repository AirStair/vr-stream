const { VideoPanorama, Viewer } = PANOLENS;
const panorama = new VideoPanorama('/5.webm');
const container = document.getElementById('container');
const viewer = new Viewer({
    autoHideControlBar: true,
    container
});
viewer.add(panorama);
