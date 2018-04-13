# Eyevinn HTML Player

Eyevinn HTML Player is a simplistic video player for playback of ABR streams. It is free-to-use and currently supports the ABR streaming formats Apple HLS, MPEG-DASH and Microsoft Smooth Streaming.

Demo implementation available [here](https://player.eyevinn.technology/)

![screenshot](https://player.eyevinn.technology/screenshot.png)

The player is built on [Hls.js](https://video-dev.github.io/hls.js/), [Shaka Player](https://github.com/google/shaka-player) and [DashJs](https://github.com/Dash-Industry-Forum/dash.js/)

# Getting Started

To be able to quickly add Eyevinn HTML Player to your project we are hosting the player and delivered through our CDN. Want to use a package manager and host the player on your site head over to the [download section](https://github.com/Eyevinn/html-player/releases).

## CSS

Copy-paste the stylesheet `<link>` into your `<head>` to load the CSS for the player.

```
<link rel="stylesheet" href="https://player.eyevinn.technology/v0.2.2/build/eyevinn-html-player.css">
```

## JS

Place the following `<script>` near the end of your pages right before the closing `</body>` tag.

```
<script src="https://player.eyevinn.technology/v0.2.2/build/eyevinn-html-player.js" type="text/javascript"></script>
```

## Template

The snippet below shows an example on how to implement the player:

```
  <head>
    <!-- Eyevinn HTML Player CSS -->
    <link rel="stylesheet" href="https://player.eyevinn.technology/v0.2.2/build/eyevinn-html-player.css"></link>
  </head>
  <body>
    <!-- The element where the player will be placed -->
    <div id="player-wrapper"></div>

    <!-- Eyevinn HTML Player Javascript -->
    <script src="https://player.eyevinn.technology/v0.2.2/build/eyevinn-html-player.js" type="text/javascript"></script>

    <!-- Initiate the player and auto-play with audio muted -->
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

## Contribution

You are welcome to either contribute to this project or spin-off a fork of your own. This code is released under the Apache 2.0 license.

```
Copyright 2018 Eyevinn Technology

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```