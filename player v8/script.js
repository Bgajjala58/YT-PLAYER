/* --------------------------------------- YOUTUBE API ---------------------------------------*/
function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
  
  // $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
  
    $element.find('div').animate({ width: progressBarWidth });
  } 

// 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
    //Playervars to take out time and play pause button 
     
     height: '390',
     width: '640',
     videoId: 'NMDWCDvCGjI',
   
     events: {
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });
 }
 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {

  event.target.playVideo();
  setDuration_seeker();
  setInterval(updateProgressBar, 1000);

       }
 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) { 
  updateProgressBar();
  
 } 
 
/* --------------------------------------- CUSTOM FUNCTIONS ---------------------------------------*/



function updateProgressBar() {
    var progressBar = document.getElementById('progress-bar');
    progressBar.value = player.getCurrentTime();
}

 //TO Play VIDEO ON CLICK (Play button)
 function playVideo(){
    player.playVideo();
    socket.emit('Playbutton', 'Play' , player.getCurrentTime().toString());
    socket.on('Playbutton',function (type,time){
            player.playVideo();
   });
   
 }
 //TO PAUSE VIDEO ON CLICK (Pause button)
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

 

