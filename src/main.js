const vscode = require('vscode');
const {curNameIsFile,createFile,createFolder} = require('./utils')

function openModal(
    value="/", 
    prompt="create file or floder like: /folderName1/folderName2/fileName.xx", 
    ignoreFocusOut=true
  ) {
  
  vscode.window.showInputBox({ 
    value,
    prompt,
    ignoreFocusOut,
    valueSelection: [-1, -1]
  })
  .then(createPath => {
    let basePath = createPath
    let isFile = curNameIsFile(basePath)
    if (isFile) {
      createFile(basePath)
    } else {
      createFolder(basePath)
    }
  })
}

function init(uri){
  uri = uri || vscode.workspace.workspaceFolders[0].uri.fsPath
  uri = uri.replace(/\\/g, '/') + '/'
  openModal(uri)
}

module.exports = {
  init
}