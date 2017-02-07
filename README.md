mdmagic
=======
Mdmagic is a tool-bundle to serve MarkDown files to the browser. You could use it to serve your markdown document repositoriy or just a simple website written in MarkDown instead of html.

This project started as a sort of wrapper for [strapdownjs](http://strapdownjs.com/).

I was not very font of the fact that I needed to embed my MarkDown inside html, it is the kind of mixing that we stopped doing way back in the 90's... I wanted .html files to contain html and .md files to contain markdown.

Installation
------------
Go to your webroot and do:
```
/var/www $ git clone https://github.com/doedje/MDMagic.git md
```
When your webservers is configured to follow symlinks it should show your this readme when you surf to http://localhost/md with your browser. Now serving up this readme is probably not what you want to do on your server. You want your own stuff!
In theory you can put any .md file in the mdcontent folder and it will be able to display. Say we put a example.md in there, use http://localhost/md/?example.md to see that file. You can also work with directories, like http://localhost/md/?foo/bar/example.md


mdmagicjs
---------
The first was mdmdagicjs, a javascript that takes the querystring from the url and uses that as the path to your .md file. It uses `jQuery.ajax()` to download the file and puts it in the xmp, after that it loads a customized version of strapdown.js to convert the markdown to html. That same querystring is used to make a little crumblepath on top and bottom of the page.



Furthermore it adds a [little extra markdown options](?markdown.md)

In principle it should be compatible with the css that come with strapdownjs, which should be just some plain bootstrap css... But I just altered the superhero css to my liking for this one...

###nice to add

- [ ] anchors for headers
- [ ] true checkboxes for todo-lists like this
