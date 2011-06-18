var FileUploader = function() {
    _.bindAll(this,'fileSelected','uploadFile','updateProgress','uploadComplete');
};

FileUploader.prototype.fileSelected = function() {
    var file = document.getElementById('fileToUpload').files[0];
    if (file) {
        var fileSize = 0;
        if (file.size > 1024 * 1024)
		fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
        else
		fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

	document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
        document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
        document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    }
};

FileUploader.prototype.uploadFile = function() {
    var fd = new FormData();
    fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", this.updateProgress, false);
    xhr.addEventListener("load", this.uploadComplete, false);
    xhr.addEventListener("error", this.uploadFailed, false);
    xhr.addEventListener("abort", this.uploadCanceled, false);
    xhr.open("POST", "/uploads");
    xhr.send(fd);
};

FileUploader.prototype.updateProgress = function(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    } else {
	document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
};

FileUploader.prototype.uploadComplete = function(evt) {
    console.info("Upload complete");
};

FileUploader.prototype.uploadFailed = function(evt) {
    console.info("Uplaod failed");
};

FileUploader.prototype.uploadCanceled = function(evt) {
    console.info("Upload event cancelled");
};

$(document).ready(function() {
    var uploader = new FileUploader();
    $("#fileToUpload").change(uploader.fileSelected);
    $("#uploadFile").click(uploader.uploadFile);
});
