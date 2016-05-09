/*
Recognizes text from the image url

Need to activate Google Drive API in Developers Console for this project
*/

function doGet(request) {
  if (request.parameters.url != undefined && request.parameters.url != "") {
    var imageBlob = UrlFetchApp.fetch(request.parameters.url).getBlob();
    var resource = {
      title: imageBlob.getName(),
      mimeType: imageBlob.getContentType()
    };
    var options = {
      ocr: true
    };
    var docFile = Drive.Files.insert(resource, imageBlob, options);
    var doc = DocumentApp.openById(docFile.id);
    var text = doc.getBody().getText().replace("\n", "");
    Drive.Files.remove(docFile.id);
    return ContentService.createTextOutput(text);
  }
  else {
    return ContentService.createTextOutput("request error");
  }
}