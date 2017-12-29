PROD_USER := acm
PROD_DB := acm

PORT ?= 8000 # dev port

DJANGO_MANAGE := python acm-django/app/manage.py
SUPERVISORCTL := supervisorctl

## Django dev ##

dev-static:
	$(DJANGO_MANAGE) collectstatic --noinput

dev-run:
	$(DJANGO_MANAGE) runserver $(PORT)

## Deploy ##

.PHONY: deploy
deploy: deploy-nginx deploy-django deploy-public

.PHONY: deploy-nginx
deploy-nginx: /etc/nginx/conf.d/byu-acm.conf
	nginx -s reload

/etc/nginx/conf.d/byu-acm.conf: deploy/nginx/byu-acm.conf
	cp $< $@

.PHONY: deploy-django
deploy-django: /var/www/acm-django /etc/supervisor/conf.d/acm-django.conf /var/log/acm-django
	$(SUPERVISORCTL) restart acm-django

.PHONY: /var/www/acm-django
/var/www/acm-django:
	rsync -r --update --delete --exclude='*.pyc' acm-django/app/ $@/

/etc/supervisor/conf.d/acm-django.conf: acm-django/deploy/supervisor/acm-django.conf
	cp $< $@
	$(ENSURE_PYTHON) supervisorctl reread

/usr/local/bin/acm-django-start: acm-django/deploy/acm-django-start.sh
	cp $< $@

/var/log/acm-django:
	mkdir $@

.PHONY: deploy-public
deploy-public:
	rsync -r --update --delete public/ /var/www/acm-public/

.PHONY: tail-log
tail-log:
	$(SUPERVISORCTL) tail -f acm-django stderr

