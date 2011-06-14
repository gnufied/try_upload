// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload();

    // // Load existing files:
    // $.getJSON($('#fileupload form').prop('action'), function (files) {
    //     var fu = $('#fileupload').data('fileupload');
    //     fu._adjustMaxNumberOfFiles(-files.length);
    //     fu._renderDownload(files)
    //         .appendTo($('#fileupload .files'))
    //         .fadeIn(function () {
    //             // Fix for IE7 and lower:
    //             $(this).show();
    //         });
    // });

    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files a:not([target^=_blank])').live('click', function (e) {
        e.preventDefault();
        $('<iframe style="display:none;"></iframe>')
            .prop('src', this.href)
            .appendTo('body');
    });

});
