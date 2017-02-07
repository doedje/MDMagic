/*

MDMAGIC.JS

Combines strapdown.js with ajax. Will load content markdown file dynamically. Using the query string.

created by: Remy Blom (r@aodw.nl)
at: 2013-10-01

converted to mdmagicjs at 2016-11-16

*/


// on DOM ready
$(document).ready(function() {
	// var with relative path from index.html to strapdownjs
	var strapdownjs = 'mdmagicjs/strapdown.remy.js';
	// var with relative path from index.html to mdcontent folder
	var mdcontent = 'mdcontent';
	// getting the md file from the query
	var query = file = window.location.search.substring(1);
	// add index.md when needed
	if (file === '') {
		file = 'index.md';
	} else if (file.indexOf('.md') == -1) {
		file = file + '/index.md';
	}
	// display file in path
	$('#message').text('loading ' + file + '...');
	// crumble path
	var crumbles = file.split('/');
	var crumblePath = [];
	for (var i in crumbles) {
		crumblePath.push(crumbles[i]);
		crumbles[i] = '[' + crumbles[i] + '](?' + crumblePath.join('/') + ')';
	}
	// add home to beginning of array
	if (query !== '') {
		crumbles.unshift('[Home](?)');
	} else {
		crumbles = ['[Home](?)'];
	}
	crumblesMd= '\n\n' + crumbles.join(' &gt; ') + '\n\n';
	// get the content of the md file
	$.ajax({
		url: mdcontent + '/' + file,
		dataType: 'text'
	}).done(function(md) {
		// if response is empty, display a file not found
		md = (md !== '') ? md : 'file not found: ' + file;
		// get directory from file
		var path = file.substr(0, file.lastIndexOf('/')+1);
		// add the path to the src of the img if it does NOT contain http
		md = md.replace(/<img src=('|")(?!http)(.*?)('|")/gi,'<img src=$1'+path+'$2$3')
			.replace(/<img  src=('|")(?!http)(.*?)('|")/gi,'<img src=$1$2$3');
		// for [url_title](?url) add the path to the url if it does NOT contain http
		md = md.replace(/\[(.*?)\]\((?!http)\?(.*?)\)/gi,'[$1](?'+path+'$2)')
			.replace(/\[(.*?)\] \((?!http)\?(.*?)\)/gi,'[$1](?$2)');
		// for ![image_title](img_url) add the path to the img_url if it does NOT contain http
		md = md.replace(/\!\[(.*?)\]\((?!http)(.*?)\)/gi,'![$1]('+path+'$2)')
			.replace(/\!\[(.*?)\] \((?!http)(.*?)\)/gi,'![$1]($2)');
		// replace [file.md]() with [file.md](?file.md)
		md = md.replace(/\[(?!http)(.*?)\]\(\)/gi, '[$1](?'+path+'$1)')
			.replace(/\[(.*?)\] \(\)/gi, '[$1]()');
		// replace space-space-br with space-space (markdown for newline)
		md = md.replace(/  br/gi,'  ')
			.replace(/  -br/gi,'  br');
		// add crumbleMd (if any) at beginning and end of md
		md = crumblesMd + '------------\n\n' + md + '\n\n------------' + crumblesMd;
		// add xmp node to the body, hide for now, no setting of the theme, I disabled that in my strapdown version and just put them in the html...
		$('body').html('<xmp style="display:none;">');
		// put the altered md into the xmp node
		$('xmp').text(md);
		// load strapdown.remy.js... I had to alter the script to get things to work properly...
		$.getScript(strapdownjs);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		// show error
		var message = $('#splash').html(jqXHR.responseText);
	//	$.getScript(strapdownjs);
	});
});
