const AudioPlayer = (function() {
  let _tracks = [],
      _targetTrack = 'No track',
      _statePlaying = 'Stop',
      _volume = 0,
      _AudioPlayer = {};
  _AudioPlayer.addTrack = function(artist, title) {
    let track = {
      Artist: artist,
      Title: title
    };
    _tracks.push(track);
  };
  _AudioPlayer.filterByArtist = function(artist) {
    let filterTracks = [];
    for (let i = 0; i < _tracks.length; i++) {
      if (_tracks[i].Artist === artist) filterTracks.push(_tracks[i]);
    };
    console.log(filterTracks);
  };
  _AudioPlayer.findByMatch = function(str) {
    let filterTracks = [];
    for (let i = 0; i < _tracks.length; i++) {
      if (_tracks[i].Title.indexOf(str) !== -1) filterTracks.push(_tracks[i]);
    };
    console.log(filterTracks);
  };
  _AudioPlayer.getIndexOf = function(artist, title) {
    for (let i = 0; i < _tracks.length; i++) {
      if (_tracks[i].Artist === artist && _tracks[i].Title === title) return i + 1;
    };
  };
  _AudioPlayer.play = function(index) {
    for (let i = 0; i < _tracks.length; i++) {
      if (index === i - 1) {
        _targetTrack = _tracks[i];
        _statePlaying = 'Play';
        console.log('Track ' + _targetTrack.Artist + ' - ' + _targetTrack.Title + ' now playing');
      };
    };
  };
  _AudioPlayer.playingNow = function() {
    if (_statePlaying === 'Play') console.log('Track ' + _targetTrack.Artist + ' - ' + _targetTrack.Title + ' now playing');
  };
  _AudioPlayer.stop = function() {
    _targetTrack = 'No track';
    _statePlaying = 'Stop';
  };
  _AudioPlayer.pause = function() {
    _statePlaying = 'Pause';
    console.log('Track ' + _targetTrack.Artist + ' - ' + _targetTrack.Title + ' on pause');
  };
  _AudioPlayer.volumeUp = function() {
    _volume++;
  };
  _AudioPlayer.volumeDown = function() {
    _volume--;
  };
  _AudioPlayer.status = function() {
    console.log(_statePlaying + ': ' + _targetTrack.Artist + ' - ' + _targetTrack.Title + '. Volume: ' + _volume);
  };
  return _AudioPlayer;
})();
