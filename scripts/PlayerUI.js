// Generated by CoffeeScript 1.6.3
(function() {
  var PlayerUI;

  window.PlayerUI = PlayerUI = (function() {
    PlayerUI.prototype.bind = function(div) {
      return this.$ui = $(div);
    };

    PlayerUI.prototype.update = function(sound) {
      var bar, barArray, barCount, bar_middle, bar_str, border_left, border_right, buffering, duration, empty_bar, hl_format, i, left, load_slider, load_slider_pos, loaded_bar, loaded_percent, nm_format, no_format, play_percent, play_slider, play_slider_pos, played_bar, playing, pos, right, time_played, time_total, _i, _j, _k, _ref, _ref1, _ref2;
      if (this.$ui == null) {
        this.init(sound.song);
        return;
      }
      barCount = 30;
      playing = !sound.paused;
      buffering = sound.isBuffering;
      pos = sound.position;
      duration = sound.duration;
      play_percent = pos / duration;
      loaded_percent = sound.bytesLoaded / sound.bytesTotal;
      load_slider_pos = Math.floor(barCount * loaded_percent);
      play_slider_pos = Math.floor(barCount * play_percent);
      hl_format = "[gb;#2ecc71;#000]";
      nm_format = "[gb;#fff;#000]";
      no_format = "[gb;#000;#000]";
      left = $.terminal.escape_brackets(sound.looping ? ">" : "[");
      right = $.terminal.escape_brackets(sound.looping ? "<" : "]");
      border_left = "[" + nm_format + left + "]";
      border_right = "[" + nm_format + right + "]";
      empty_bar = "[" + no_format + "=]";
      load_slider = "[" + nm_format + "☁]";
      loaded_bar = "[" + nm_format + "=]";
      play_slider = "[" + hl_format + (playing ? "♫" : "♨") + "]";
      played_bar = "[" + hl_format + (playing ? ">" : "|") + "]";
      barArray = Array(barCount);
      for (i = _i = 0, _ref = barCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        barArray[i] = empty_bar;
      }
      for (i = _j = play_slider_pos, _ref1 = load_slider_pos - 1; play_slider_pos <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = play_slider_pos <= _ref1 ? ++_j : --_j) {
        barArray[i] = loaded_bar;
      }
      for (i = _k = 0, _ref2 = play_slider_pos - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        barArray[i] = played_bar;
      }
      barArray[load_slider_pos] = load_slider;
      barArray[play_slider_pos] = play_slider;
      bar_middle = barArray.join("");
      time_played = "[" + nm_format + (this.formatTime(pos)) + "]";
      time_total = "[" + nm_format + (this.formatTime(duration)) + "]";
      bar_str = "" + time_played + border_left + bar_middle + border_right + time_total;
      bar = $.terminal.format(bar_str);
      this.$ui.text("");
      return this.$ui.append(bar);
    };

    PlayerUI.prototype.formatTime = function(ms) {
      var MM, MS, SS, s, zeroPad;
      zeroPad = function(num, places) {
        var zero;
        zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
      };
      s = Math.floor(ms / 1000);
      MS = ms - s * 1000;
      MM = Math.floor(s / 60);
      SS = s - MM * 60;
      return "" + (zeroPad(MM, 2)) + ":" + (zeroPad(SS, 2));
    };

    PlayerUI.prototype.init = function(song) {
      var album, artist, id, like, like_format, picture, title, url,
        _this = this;
      this.t.clear;
      id = song.sid;
      url = song.url;
      artist = song.artist;
      title = song.title;
      album = song.albumtitle;
      picture = song.picture;
      like = song.like !== 0;
      like_format = like ? "[gb;#f00;#000]" : "[gb;#fff;#000]";
      window.T.echo("[" + like_format + "♥ ][[gb;#e67e22;#000]" + song.artist + " - " + song.title + " | " + song.albumtitle + "]");
      return this.t.echo("[Player]", {
        finalize: function(div) {
          return _this.bind(div);
        }
      });
    };

    function PlayerUI(t) {
      this.t = t;
      this.t.init_ui = this.init.bind(this);
      this.t.update_ui = this.update.bind(this);
    }

    return PlayerUI;

  })();

}).call(this);

/*
//@ sourceMappingURL=PlayerUI.map
*/
