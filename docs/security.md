
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
