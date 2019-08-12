const {ipcRenderer,remote, clipboard} = require('electron');
const BrowserWindow = require('electron').remote.BrowserWindow;
const shortkey = require('hotkeys-js');
const fs = require('fs');

const package = require('../../package.json');
const projName = package.name;

let OSname = require("os").userInfo().username;

//Button Definition
const closeButton = document.getElementById('closeDown');
const maxButton = document.getElementById('maximize');
const minButton = document.getElementById('minimize');
const btnStore = document.getElementById('btnStore');
const NewFile = document.getElementById('new');

//wisywyg
var editorContent = document.querySelector(".editor");

//storage
function save(){
    name = document.getElementById('name').value;

    let storage = editorContent.innerHTML;

    if(name.length <= 0){
        return;
    }
    //Storage
    if(fs.existsSync(`C:/Users/${OSname}/Documents/${projName}`)){
        if(fs.existsSync(`C:/Users/${OSname}/Documents/${projName}/${name}.json`)){   
            fs.writeFileSync(`C:/Users/${OSname}/Documents/${projName}/${name}.json`,JSON.stringify({name:name, content:storage}));
        }else{
            fs.writeFileSync(`C:/Users/${OSname}/Documents/${projName}/${name}.json`,JSON.stringify({name:name, content:storage}));
        }
    }else{
        fs.mkdirSync(`C:/Users/${OSname}/Documents/${projName}`);
    }
    location.reload();
}

//Button Event Handler
closeButton.addEventListener('click', function(){window.close(); app.quit();});
minButton.addEventListener('click', function(){ remote.BrowserWindow.getFocusedWindow().minimize(); });
maxButton.addEventListener('click', function(){ if (remote.getCurrentWindow().isFullScreen()) { remote.getCurrentWindow().setFullScreen(false); }else{ remote.getCurrentWindow().setFullScreen(true);  } });
btnStore.addEventListener('click',function(){save();});
NewFile.addEventListener('click', () => {
    ipcRenderer.send('opened',"");
    location.reload();
});
//settings.addEventListener('click',function(){alert("Settings");});

//Autosave
setInterval(() =>{
    save();
}, 10000);

//Shortkeys

//Saving
shortkey('ctrl+s',function(){
    save();
});