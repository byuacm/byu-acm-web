

### Overview
Our Nginx configuration is very simple. It's only purpose is to route requests
either to the internal website or external website based on the URL.

### TLS
We use [Let's Encrypt](https://letsencrypt.org/) to get free
[TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) support. This
means that all traffic between users and our server will be encrypted.
