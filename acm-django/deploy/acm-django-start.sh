#!/bin/bash

NAME=acm-django

DJANGO_DIR=/usr/local/src/byu-acm-web/acm-django/app
SOCK=/var/run/acm-django.sock

WORKERS=4

source /opt/rh/python27/enable

export PYTHONPATH=$DJANGO_DIR:$PYTHONPATH

gunicorn acm.wsgi:application  \
  --name "$NAME"               \
  --workers $WORKERS           \
  --user acm                   \
  --log-level debug            \
  --bind unix:"$SOCK"

