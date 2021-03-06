mdmagic
=======
Mdmagic is a tool-bundle to serve MarkDown files to the browser. You could use it to serve your markdown document repository or just a simple website written in MarkDown instead of html.

This project started as a sort of wrapper for [strapdownjs](http://strapdownjs.com/).

I was not very font of the fact that I needed to embed my MarkDown inside html, it is the kind of mixing that we stopped doing way back in the 90's... I wanted .html files to contain html and .md files to contain markdown. (the downside is that this solution misses the search-engine friendliness the original strapdownjs does claim to have...)

License GNU/GPLv3
-----------------
Copyright (C) 2016 - Remy Blom, the Netherlands

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

---------------------------------------------------------

Please note that this source code was released under the GPL license. So any change on the code shall be made publicly available and distributed under the GPL license

---------------------------------------------------------

Installation
------------
Go to your webroot and do:
```
/var/www $ git clone https://github.com/doedje/MDMagic.git md
```
When your webservers is configured to follow symlinks it should show you this readme when you surf to:

[http://localhost/md](http://localhost/md)

Now serving up this readme is probably not what you want to do on your server. You want your own stuff!
In theory you can put any .md file in the mdcontent folder and it will be able to display. Say we put a example.md in there, use: [http://localhost/md/?example.md](http://localhost/md/?example.md) or work with directories, like: [http://localhost/md/?foo/bar/example.md](http://localhost/md/?foo/bar/example.md).

But as an advocate of seperating content from logic I would recommend to set up a seperate git repository for your content.

Since I use [NGINX](https://www.nginx.org) to serve my documentation I use the following configuration:

```
# docs with mdmagic
	location /doc {
		alias /var/www/md;
	}
	location /doc/mdcontent {
		alias /var/www/doc;
	}
```

I also have content repository that uses a `post-receive` hook to push-to-deploy:

```
#!/bin/bash
source ~/.profile

GIT_WORK_TREE=/var/www/doc git checkout -f
```

mdmagicjs
---------
The first was mdmdagicjs, a javascript that takes the querystring from the url and uses that as the path to your .md file. It uses `jQuery.ajax()` to download the file and puts it in the xmp, after that it loads a customized version of strapdown.js to convert the markdown to html. That same querystring is used to make a little crumblepath on top and bottom of the page.

Furthermore it adds a [little extra markdown options](?markdown.md).

In principle it should be compatible with the css that come with strapdownjs, which should be just some plain bootstrap css... But I just altered the superhero css to my liking for this one...

nice to add
-----------
- [ ] anchors for headers
- [ ] true checkboxes for todo-lists like this
- [ ] use the content from the first `<h1>` as the title of the html page.
- [ ] .htaccess that gets rid of the `?` in the url (apache)
- [ ] nginx.conf to get rid of the `?` in the url (nginx)
