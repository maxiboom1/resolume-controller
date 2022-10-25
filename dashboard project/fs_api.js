var file = ogscript.getFile(params.getValue("Starting_Directory", 0));
function getFiles(){
    
    if (file != null && file.exists() && file.isDirectory()) {
        var list = file.list();
        var filteredList = [];
      
        for (var i = 0; i < list.length; i++) {
          
            if (!isDir(list[i])) {
            filteredList.push(list[i]);
          } else {
            var subFiles = getSubFiles(params.getValue("Starting_Directory", 0) + "/" + list[i])
            filteredList.push("+" + list[i]);
            for(ii=0;ii<subFiles.length;ii++){
                filteredList.push("--" + subFiles[ii]);
            }
          }
        }

        updateFileList(filteredList);
      }
}

function getSubFiles(dir){
    var file = ogscript.getFile(dir);
    if (file != null && file.exists() && file.isDirectory()) {
        var list = file.list();
        var filteredList = [];
        for (var i = 0; i < list.length; i++) {
            if (!isDir(list[i])) {
              filteredList.push(list[i]);
            } 
            return filteredList;
        }
}
}

function isDir(item) {
  var file = ogscript.getFile(
    params.getValue("Starting_Directory", 0) + "/" + item
  );
  if (file.isDirectory()) {
    return true;
  } else {
    return false;
  }
}

function updateFileList(list) {
    
    if (list.length == 0) {
        list.push("");
        }
    
        var constraint = params.createStringChoiceConstraint(list);
    
    if (constraint != null) {
        params.replaceConstraint("File_List", constraint);
        }
}

