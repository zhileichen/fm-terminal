// Generated by CoffeeScript 1.6.3
(function() {
  var ChannelCommand, channel, proxy, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  proxy = "https://jsonpwrapper.appspot.com/?callback=?";

  channel = "http://www.douban.com/j/app/radio/channels";

  ChannelCommand = (function(_super) {
    __extends(ChannelCommand, _super);

    function ChannelCommand() {
      _ref = ChannelCommand.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ChannelCommand.prototype.on_data = function(data) {
      var channels, json, jsonp, x, _i, _len;
      window.T.resume();
      x = $("" + data.responseText + "");
      jsonp = x[5].innerHTML;
      json = jsonp.substring(jsonp.indexOf('(') + 1, jsonp.lastIndexOf(')'));
      channels = $.parseJSON(json).channels;
      for (_i = 0, _len = channels.length; _i < _len; _i++) {
        channel = channels[_i];
        this.echo(channel.name);
      }
    };

    ChannelCommand.prototype.on_error = function() {
      window.T.resume();
      this.echo("Error, try again later");
    };

    ChannelCommand.prototype.execute = function() {
      var _this = this;
      this.echo("Requesting...");
      window.T.pause();
      $.ajax({
        type: 'GET',
        dateType: 'jsonp',
        data: {
          'url': channel
        },
        url: proxy,
        xhrFields: {
          withCredentials: false
        },
        success: function(data) {
          return _this.on_data(data);
        },
        error: function() {
          this.on_error;
        }
      });
    };

    return ChannelCommand;

  })(window.CommandBase);

  (new ChannelCommand("channel", "Show channel list")).register();

}).call(this);

/*
//@ sourceMappingURL=command.channel.map
*/