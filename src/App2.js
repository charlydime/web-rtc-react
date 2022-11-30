import { useEffect,useState } from "react";

function App2() {

  const [video, setVideo ] = useState("")
  const [canvas, setCanvas ] = useState("")
  const [photo, setPhoto ] = useState("")
  const [width, setWidth ] = useState(0)
  const [height, setHeight ] = useState(0)
 
  useEffect(
    ()=>{
      setVideo( document.querySelector('#video') )
      setCanvas( document.querySelector('#canvas') )
      setPhoto( document.querySelector('#photo') )   

      var promiseVideo = navigator.mediaDevices.getUserMedia ( { audio: false, video: true });

      promiseVideo.then(
        (stream) => {

           setWidth(video.width)
           setHeight(video.height)
           console.log(width)
           console.log(height)
           console.log(video)
           console.log( stream.getTracks()[0].getSettings() )
           console.log(navigator.mediaDevices.getSupportedConstraints())

        //  video.width = width
        //  video.height = height
         video.srcObject = stream;
         video.play();
 
         canvas.width = width;
         canvas.height = height;
        }
      )
      promiseVideo.catch( 
        err =>  console.log(err.name) 
        )
 
    }
  );
    
  function takepicture() {
     
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  return (
    <div className="App">
      <div> width {width}  * height {height}</div>
      
        <video id="video"></video>
        <button onClick={takepicture}>Take photo</button>
        <canvas id="canvas"></canvas>
    </div>
  );
}

export default App2;
