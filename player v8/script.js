/* Youtube API */

function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth });
  } 

/* IFrame Player API */
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 /* <iframe> (and YouTube player) */
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '390',
     width: '640',
     videoId: 'NMDWCDvCGjI',
     events: {
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     },
     playerVars: {
      'autoplay': 1,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'loop': 1,
      'modestbranding': 1,
      'rel': 0,
      'showinfo': 0,
      'mute': 0,
      'autohide': 1

    }
    
   });
 }

 /* Player is ready */
 function onPlayerReady(event) {
  setDuration_seeker();
  setInterval(updateProgressBar, 1000);
  event.target.playVideo();

       }
 function onPlayerStateChange(event) { 
  updateProgressBar();
  
 } 
 
/* Custom Functions*/

function updateProgressBar() {
    var progressBar = document.getElementById('progress-bar');
    progressBar.value = player.getCurrentTime();
}

function playVideo(){
    player.playVideo();
    socket.emit('Playbutton', 'Play' , player.getCurrentTime().toString());
    socket.on('Playbutton',function (type,time){
            player.playVideo();
   });
   
 }

function pauseVideo(){
     player.pauseVideo();
     console.log(player.getCurrentTime());
     socket.emit('Pausebutton', 'Pause' , player.getCurrentTime().toString());
     socket.on('Pausebutton',function (type,time){
     console.log(player.getCurrentTime());
            player.pauseVideo(); 
            
   });
   
 }

function setDuration_seeker(){
  var duration = player.getDuration().toString();
  var progressBar = document.getElementById('progress-bar').max = duration;
   
 }

function checkTime(){
  var slider = document.getElementById('progress-bar');
  var temp = slider.value
  player.seekTo(temp,true);
  socket.emit('ToSeek', 'Seek' , temp.toString());
  socket.on('ToSeek',function (type,time){
         player.seekTo(parseInt(time)+.05,true); 
});

 }

 

