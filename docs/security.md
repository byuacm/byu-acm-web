
[Django](https://www.djangoproject.com/) helps keep the application safe by
minimizing the risk of common web attacks such as [SQL injection](https://en.wikipedia.org/wiki/SQL_injection)
and [Cross-Site Request Forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
but there are still many chores needed to ensure that the application is safe.

Checklist:
- Minimal ports are open externally (22, 80, etc)
- NO sensitive files are in version control i.e. files containing configuration
passwords.
- Use latest versions of Django and Nginx (after testing)
- Keep system packages updated, esp. if they involve security patches
- Keep server OS up to date
- Nginx server tokens are off
- Disable password SSH login (must use SSH keys)



Security Readings
- [How to Make Your Linux Server More Secure](https://www.linux.com/learn/how-make-your-linux-server-more-secure)
- [Essential Security for a Linux Server](https://plusbryan.com/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers)
- [7 Security Measures to Protect Your Servers](https://www.digitalocean.com/community/tutorials/7-security-measures-to-protect-your-servers)
- [20 Linux Server Hardening Security Tips](https://www.cyberciti.biz/tips/linux-security.html)
- [25 Hardening Security Tips for Linux Servers](http://www.tecmint.com/linux-server-hardening-security-tips/)
- [Linux Server Security Best Practices](https://support.rackspace.com/how-to/linux-server-security-best-practices/)
- [Securing Your Server](https://www.linode.com/docs/security/securing-your-server)
- [An Administrator's Guide to Internet Password Research](https://www.microsoft.com/en-us/research/publication/an-administrators-guide-to-internet-password-research/)

And of course if you'd like to know more about web security, [CS 465 \(Computer
Security\)](https://cswiki.cs.byu.edu/cs-465/start) is a great class to take.

