const electron = require("electron");
const TrezorConnect = require('trezor-connect').default;

const {app, BrowserWindow, Menu, ipcMain} = electron;

function trezorPubKey() {
    var pubkey = TrezorConnect.cardanoGetPublicKey({path: "m/44'/1815'/0'"}).then(function(result) {
        result
    });
    if (pubkey == "") {
        document.getElementById("pubKeyOutput").innerText("gah");
    } else {
        document.getElementById("pubKeyOutput").innerText(pubkey);
    }
};

// Importing the net Module from electron remote
const net = electron.remote.net;

var get = document.getElementById('get');
get.addEventListener('click', () => {
    const request = net.request({
        method: 'GET',
        protocol: 'http:',
        hostname: 'localhost',
        path: '/get',
        redirect: 'follow'
    });
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
        });
    });
    request.on('finish', () => {
        console.log('Request is Finished')
    });
    request.on('abort', () => {
        console.log('Request is Aborted')
    });
    request.on('error', (error) => {
        console.log(`ERROR: ${JSON.stringify(error)}`)
    });
    request.on('close', (error) => {
        console.log('Last Transaction has occured')
    });
    request.setHeader('Content-Type', 'application/json');
    request.end();
});

var post = document.getElementById('post');
post.addEventListener('click', () => {
    var body = JSON.stringify({ key: 1 });
    const request = net.request({
        method: 'POST',
        protocol: 'http:',
        hostname: 'localhost',
        path: '/post',
        redirect: 'follow'
    });
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
        });
    });
    request.on('finish', () => {
        console.log('Request is Finished')
    });
    request.on('abort', () => {
        console.log('Request is Aborted')
    });
    request.on('error', (error) => {
        console.log(`ERROR: ${JSON.stringify(error)}`)
    });
    request.on('close', (error) => {
        console.log('Last Transaction has occured')
    });
    request.setHeader('Content-Type', 'application/json');
    request.write(body, 'utf-8');
    request.end();
});
