
PORT ?= 8000

DJANGO_MANAGE := python acm-django/manage.py
SUPERVISORCTL := supervisorctl

## Django dev ##

dev-static:
	$(DJANGO_MANAGE) collectstatic --noinput

dev-run:
	$(DJANGO_MANAGE) runserver $(PORT)
