# Eyevinn HTML Player

HTML player with support for the streaming-formats HLS and MPEG-DASH. A wrapper library around on Hls.js and Shaka Player

## Example Usage

```
  <head>
    <link rel="stylesheet" href="eyevinn-html-player.css"></link>
  </head>
  <body>
    <div id="player-wrapper"></div>
    <script src="eyevinn-html-player.min.js" type="text/javascript"></script>
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

## Development

```
$ npm install
$ npm run build
$ npm start
```

Demo page then available at http://localhost:3000/demo/
