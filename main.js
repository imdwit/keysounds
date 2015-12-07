const electron = require('electron');
const path = require('path');
const app = require('app');
const Tray = require('tray');
const Menu = require('menu');
const MenuItem = require('menu-item');
const Browser = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
var mainWindow, tray, keys;
function createProjectMenu(attrs) {
	var menu = new Menu();
	menu.append(new MenuItem(attrs));
	tray.setContextMenu(menu);
}

function playMenu() {
	createProjectMenu({
		label: 'Play',
		click: playingMenu
	});
	mainWindow && mainWindow.webContents.send('stop');
}

function playingMenu() {
	createProjectMenu({
		label: 'Stop',
		click: playMenu
	});
	mainWindow.webContents.send('play');
}

app.on('ready', function() {
	tray = new Tray(path.join(__dirname, '/play.png'));
	playMenu();
	mainWindow = new Browser({height: 0, width: 0});
	mainWindow.loadUrl('file://'+__dirname+'/index.html');
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function() {
	 mainWindow = null;
 });
});
