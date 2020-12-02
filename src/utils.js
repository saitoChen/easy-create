const fs = require('fs')
const path = require('path')
const vscode = require('vscode')
const {lang} = require('./lang/config')

function curNameIsFile(uri) {
  // get paths last name /src/libs/index.js => index.js
  if (uri) {
    let lastName = uri.split('/').slice(-1)[0]
    return lastName.includes('.')
  }
}

function writeFile(uri, content) {
  try {
    fs.writeFileSync(uri, content)
    openFile(uri)
  } catch(err) {
    return vscode.window.showErrorMessage("Failed create a file")
  }
}

function openFile(uri) {
  setTimeout(() => { //tiny delay
    vscode.workspace.openTextDocument(uri)
    .then((editor) => {
      if (!editor) return;
      vscode.window.showTextDocument(editor);
    });
  }, 50);
}

function createFile(uri){
  const isFile = curNameIsFile(uri)
  if (fs.existsSync(uri) && isFile) {
    vscode.window.showErrorMessage("File already exist")
  }
  if (!fs.existsSync(path.dirname(uri))) {
    createFile(path.dirname(uri))
  }
  if (isFile) {
    const curLang = uri.split('/').slice(-1)[0].split('.').slice(-1)[0]
    let content = ''
    if (curLang) {
      content = lang[curLang]
    }
    writeFile(uri, content)
  } else {
    wirteFolder(uri)
  }
}

function wirteFolder(uri) {
  try {
    fs.mkdirSync(uri)
  }catch(err) {
    return vscode.window.showErrorMessage("Failed create a folder")
  }
}


async function createFolder(uri){
  if (fs.existsSync(uri)) return
  if (!fs.existsSync(path.dirname(uri))) {
    createFolder(path.dirname(uri))
  }
  wirteFolder(uri)
}


module.exports = {
  curNameIsFile,
  createFile,
  createFolder,
}