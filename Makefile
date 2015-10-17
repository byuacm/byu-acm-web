SHELL := /bin/bash
MAKEFLAGS := -j4

HOSTNAME := $(shell hostname)

PROD_USER := acm
PROD_HOST := acm-new.byu.edu
PROD_DB := acm

PORT ?= 8000 # dev port

PYTHON_VERSION := $(shell python -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
ifneq ($(PYTHON_VERSION), '2.7')
ENSURE_PYTHON := source /opt/rh/python27/enable &&
endif

DJANGO_MANAGE := $(ENSURE_PYTHON) acm-django/app/manage.py
SUPERVISORCTL := $(ENSURE_PYTHON) supervisorctl

SQL_DATA := acm-django/backup.sql
SQLITE_DB := acm-django/app/acm/data.db

## Data migration ##

.PHONY: backup-prod
backup-prod: $(SQL_DATA)

.PHONY: import-prod
import-prod: $(SQL_DATA)
	util/mysql2sqlite.sh < $< | sqlite3 $(SQLITE_DB

.PHONY: $(SQL_DATA)
$(SQL_DATA):
ifeq ($(HOSTNAME), $(PROD_HOST))
	mysqldump $(PROD_DB) > $@
else
	ssh $(PROD_USER)@$(PROD_HOST) 'mysqldump $(PROD_DB)' > $@
endif

## Full Deploy ##

.PHONY: deploy
deploy: deploy-nginx deploy-django deploy-public

# Deploy the NGINX configuration
.PHONY: deploy-nginx
deploy-nginx: /etc/nginx/conf.d/byu-acm.conf
	nginx -s reload

/etc/nginx/conf.d/byu-acm.conf: deploy/nginx/byu-acm.conf
	cp $< $@

# Deploy the Django application
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

# Deploy all public HTML/CSS stuff
.PHONY: deploy-public
deploy-public: /var/www/acm-public

.PHONY: /var/www/acm-public #for now
/var/www/acm-public:
	rsync -r --update --delete public/ $@/
