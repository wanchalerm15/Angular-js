/*--------Angular Js------------------------------------------------------------------------*/
    $scope.uploadFile = function(){
        var file = document.getElementById('file_upload').files;
        var file_upload = file[0];
        var fd = new FormData();
        fd.append('file_upload',file_upload);
        $http.post("http://localhost/ttvone_story/storys.ttvone/index.php?test",fd,{
            transformRequest:angular.identity,
            headers:{'Content-Type': undefined}
        }).success(function(res){
            console.log(res);
        });
    };
/*--------Jquery------------------------------------------------------------------------*/
    var form = $('form')[0]; // You need to use standart javascript object here
    var formData = new FormData(form);
    // OR
    var formData = new FormData();
    formData.append('section', 'general');
    formData.append('action', 'previewImg');
    // Main magic with files here
    formData.append('image', $('input[type=file]')[0].files[0]); 

$.ajax({
    url: 'Your url here',
    data: formData,
    // THIS MUST BE DONE FOR FILE UPLOADING
    contentType: false,
    processData: false,
    // ... Other options like success and etc
})
