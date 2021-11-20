const electron = require('electron');
const url = require('url');
const path = require('path');
const TrezorConnect = require('trezor-connect').default;

const {app, BrowserWindow, Menu, ipcMain} = electron;

process.env.NODE_ENV = 'test';

let mainWindow;
let addKey;

// listen for app to be ready

app.on('ready',  () => {
    //create window
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // TrezorConnect requirement
    // TrezorConnect.init({
    //     connectSrc: 'https://localhost:8088/',
    //     lazyLoad: true,
    //     manifest: {
    //         email: 'noahtjones@jonesfinancial.io',
    //         appUrl: 'http://www.jonesfinancial.io/quick-vote'
    //     }
    // });
    // build menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle stuff
function createAddKey(){
    
}

// Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add Secret Key',
                click(){
                    
                }
            },
            {
                label: 'Clear Keys'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ],
        label:'Edit',
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    }
];

// if(process.platform == 'darwin'){
//     mainMenuTemplate.unshift({});
// };

if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Devtools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
};