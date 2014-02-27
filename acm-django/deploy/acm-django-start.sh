#!/bin/bash

NAME=acm-django

DJANGO_DIR=/var/www/acm-django
SOCK=/var/run/acm-django.sock

WORKERS=4

source /opt/rh/python27/enable

export PYTHONPATH=$DJANGO_DIR:$PYTHONPATH

exec gunicorn acm.wsgi:application  \
  --name "$NAME"               \
  --workers $WORKERS           \
  --user acm                   \
  --log-level debug            \
  --bind unix:"$SOCK"

