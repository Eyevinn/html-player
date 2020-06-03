# Eyevinn HTML Player

Eyevinn HTML Player is a simplistic video player for playback of ABR streams. It is free-to-use and currently supports the ABR streaming formats Apple HLS, MPEG-DASH and Microsoft Smooth Streaming.

Demo implementation available [here](https://player.eyevinn.technology/)

![screenshot](https://player.eyevinn.technology/screenshot.png)

The player is built on [Hls.js](https://video-dev.github.io/hls.js/), [Shaka Player](https://github.com/google/shaka-player) and [DashJs](https://github.com/Dash-Industry-Forum/dash.js/)

# Getting Started

The player is available both from CDN as well as from NPM for building into your JavaScript application.

## CDN

To be able to quickly add Eyevinn HTML Player to your project we are hosting the player and delivered through our CDN. Want to use a package manager and host the player on your site head over to the [download section](https://github.com/Eyevinn/html-player/releases).

### JS

Place the following `<script>` near the end of your pages right before the closing `</body>` tag.

```
<script src="https://player.eyevinn.technology/v0.4.2/build/eyevinn-html-player.js" type="text/javascript"></script>
```

### CSS

Copy-paste the stylesheet `<link>` into your `<head>` to load the CSS for the player.

```
<link rel="stylesheet" href="https://player.eyevinn.technology/v0.4.2/build/eyevinn-html-player.css">
```

### Template

The snippet below shows an example on how to implement the player:

```html
  <head>
    <!-- Eyevinn HTML Player CSS -->
    <link rel="stylesheet" href="https://player.eyevinn.technology/v0.4.2/build/eyevinn-html-player.css"></link>
  </head>
  <body>
    <!-- The element where the player will be placed -->
    <div id="player-wrapper"></div>

    <!-- Eyevinn HTML Player Javascript -->
    <script src="https://player.eyevinn.technology/v0.4.2/build/eyevinn-html-player.js" type="text/javascript"></script>

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

## NPM

### JS

Install with `npm install @eyevinn/html-player`;

Include in your project by calling `import { setupEyevinnPlayer } from "@eyevinn/html-player"`.

### CSS

Include in your JavaScript file by calling `import "@eyevinn/html-player/pkg/style.css"`;

### Example

```html
  <head>
  </head>
  <body>
    <!-- The element where the player will be placed -->
    <div id="player-wrapper"></div>

    <!-- Your built JavaScript file -->
    <script src="main.js" type="text/javascript"></script>
  </body>
```

```js
import { setupEyevinnPlayer } from "@eyevinn/html-player";
import "@eyevinn/html-player/pkg/style.css";

document.addEventListener('DOMContentLoaded', function(event) {
  setupEyevinnPlayer("videoContainer", "source.m3u8").then((player) => {
    window.myPlayerInstance = player;
    player.play();
  });
});
```

To kill it later on

```js
window.myPlayerInstance.destroy();
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

## About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
