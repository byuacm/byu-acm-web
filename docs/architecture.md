The website is primarily made up of 2 components: "public" and "private".

The public portion of the website is a simple static website. It's the area that
does not require login and is accessible on acm.byu.edu. All code for this is 
under `public/`. Updating the public site will typically requiring the HTML,
CSS, or JavaScript found in that folder.

The private portion of the website is a Django app running under acm.byu.edu/*.
Ideally this would (and should) run under a subdomain i.e. app.acm.byu.edu.
