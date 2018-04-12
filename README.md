# Eyevinn HTML Player

Eyevinn HTML Player is a simplistic video player for playback of ABR streams. It is free-to-use and currently supports the ABR streaming formats Apple HLS, MPEG-DASH and Microsoft Smooth Streaming.

Demo implementation available [here](https://player.eyevinn.technology/)

![screenshot](https://player.eyevinn.technology/screenshot.png)

The player is built on Hls.js, Shaka Player and DashJs

## Usage

The snippet below shows an example on how to implement the player:

```
  <head>
    <link rel="stylesheet" href="https://player.eyevinn.technology/v0.2.2/build/eyevinn-html-player.css"></link>
  </head>
  <body>
    <div id="player-wrapper"></div>
    <script src="https://player.eyevinn.technology/v0.2.2/build/eyevinn-html-player.js" type="text/javascript"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function(event) {
        setupEyevinnPlayer('player-wrapper', 'https://maitv-vod.lab.eyevinn.technology/VINN.mp4/master.m3u8').then(function(player) {
          var muteOnStart = true;
          player.play(muteOnStart);
        });
      });
    </script>
  </body>
```
