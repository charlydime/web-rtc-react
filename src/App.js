import './App.css';

function App() {

  navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    var streaming = false,
    video        = document.querySelector('#video'),
    canvas       = document.querySelector('#canvas'),
    photo        = document.querySelector('#photo'),
    startbutton  = document.querySelector('#startbutton'),
     width = 1280,
     height = 720;


     

    navigator.getMedia(
      {
        video:  { width: 1280, height: 720 } ,
        // video:  { width: 720, height: 480 } ,
       
        audio: false
      },
      function(stream) {
        // if (navigator.mozGetUserMedia) {
        //   video.mozSrcObject = stream;
        // } else {
        //   var vendorURL = window.URL || window.webkitURL;
        //   video.scr = vendorURL.createObjectURL(stream);
        // }
        video.srcObject = stream;
        video.play();

        canvas.width = width;
    canvas.height = height;
      },
      function(err) {
        console.log("ERROR " + err);
      }
    );

    function takepicture() {
     
      canvas.getContext('2d').drawImage(video, 0, 0, 1280, 720);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }

  return (
    <div className="App">
        <video id="video"></video>
        <button onClick={takepicture}>Take photo</button>
        <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;
