/* global setupEyevinnPlayer */
document.addEventListener("DOMContentLoaded", function() {
  setupEyevinnPlayer(
    "hls-wrapper",
    "https://maitv-vod.lab.eyevinn.technology/VINN.mp4/master.m3u8"
  )
    .then(function(player) {
      window.hlsPlayer = player;
      console.log("HLS Player initiated: " + player.version);
      player.play(false);
      console.log("HLS: isLive=" + player.isLive);
    })
    .catch(console.error);
  setupEyevinnPlayer(
    "dash-wrapper",
    "https://storage.googleapis.com/shaka-demo-assets/sintel-mp4-only/dash.mpd",
    { skin: false }
  )
    .then(function(player) {
      window.dashPlayer = player;
      console.log("Dash Player initiated: " + player.version);
      player.play(true);
      console.log("DASH: isLive=" + player.isLive);
    })
    .catch(console.error);
  setupEyevinnPlayer(
    "mss-wrapper",
    "http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest"
  )
    .then(function(player) {
      window.mssPlayer = player;
      console.log("MSS Player initiated: " + player.version);
      player.play(true);
      console.log("MSS: isLive=" + player.isLive);
    })
    .catch(console.error);
});
