import * as hdf5 from './jsfive/index.js';

var densityData;
window.onload = function () {
  console.log("Window Loaded");
  init();
}

function init() {
  let fileInput = document.getElementById('fileSelector');
  fileInput.addEventListener('change', (ev) => {
    loadFile();
  })
}

function render() {
  let datacube = math.reshape(densityData.value, [256,256,256]);

  for (var slice in datacube) {

  }
}

function transfer(voxels) {
  let rgba = [0,0,0,0];
  //r = 1.0*np.exp( -(x - 9.0)**2/1.0 ) +  0.1*np.exp( -(x - 3.0)**2/0.1 ) +  0.1*np.exp( -(x - -3.0)**2/0.5 )
  rgba[0] = 1.0;
  //g = 1.0*np.exp( -(x - 9.0)**2/1.0 ) +  1.0*np.exp( -(x - 3.0)**2/0.1 ) +  0.1*np.exp( -(x - -3.0)**2/0.5 )
  rgba[1] = 1.0;
  //b = 0.1*np.exp( -(x - 9.0)**2/1.0 ) +  0.1*np.exp( -(x - 3.0)**2/0.1 ) +  1.0*np.exp( -(x - -3.0)**2/0.5 )
  rgba[2] = 0.1;
  //a = 0.6*np.exp( -(x - 9.0)**2/1.0 ) +  0.1*np.exp( -(x - 3.0)**2/0.1 ) + 0.01*np.exp( -(x - -3.0)**2/0.5 )
  rgba[3] = 0.6;
}

function loadFile() {
  var file_input = document.getElementById('fileSelector');
  var file = file_input.files[0]; 
  let datafilename = file.name;
  let reader = new FileReader();
  reader.onloadend = function(evt) { 
    let barr = evt.target.result;
    var f = new hdf5.File(barr, datafilename);
    densityData = f.get('density');
    render();
  }
  reader.readAsArrayBuffer(file);
  //file_input.value = "";
}