# Eyevinn HTML Player

Eyevinn HTML Player is a simplistic video player for playback of ABR streams. It is free-to-use and currently supports the ABR streaming formats Apple HLS and MPEG-DASH.

Demo implementation available [here](https://player.eyevinn.technology/v0.1.3/demo/index.html)

![screenshot](https://player.eyevinn.technology/screenshot.png)

The player is built on Hls.js and Shaka Player

## Usage

The snippet below shows an example on how to implement the player:

```
  <head>
    <link rel="stylesheet" href="https://player.eyevinn.technology/v0.1.3/build/eyevinn-html-player.css"></link>
  </head>
  <body>
    <div id="player-wrapper"></div>
    <script src="https://player.eyevinn.technology/v0.1.3/build/eyevinn-html-player.js" type="text/javascript"></script>
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
