(function (window) {
    'use strict';

    var pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" viewBox="0 0 32 32"><path d="M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z"></path></svg>`;
    var playSVG  = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" viewBox="0 0 32 32"><path d="M4 4 L28 16 L4 28 z"></path></svg>`;

    // querySelectorAll wrapper
    window.$ = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    // addEventListener wrapper
    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

    var url = "https://dl.dropboxusercontent.com/u/25157030/0_NiladicPodcast.mp3";

    function Player(urls) {
        this.urls = urls;
        this.playing = false;
        this.audio;
        this.playBtn = $("#play");
        this.prevBtn = $("#prev");
    }

    Player.prototype.prev = function () {
        this.audio.currentTime = 0;
    }

    // Plays a song.
    Player.prototype.play = function (num) {
        // need negative number check lol
        if (this.playing) {
            this.audio.pause();
            this.playing = false;
            this.playBtn.innerHTML = playSVG;
            return;
        }
        this.audio = new Audio(this.urls[(num - 1) % this.urls.length]);
        this.audio.play();
        this.playing = true;
        this.playBtn.innerHTML = pauseSVG;
    };


    // Create the player.
    var player = new Player([url]);

    // Play the shitty episode
    $on(player.playBtn, "click", function () {
        player.play(1);
    });

    $on(player.prevBtn, "click", function () {
        player.prev();
    });
})(window);
