#!/usr/bin/env python3
__author__ = 'Derek Argueta'
'''
Verifies that all of the job listings are valid
'''

# TODO - emails if job is invalid

import sys, os
sys.path.append(os.path.abspath('..'))

import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'acm.settings')
django.setup()

import requests
from jobs.models import JobListing
jobs = JobListing.objects.all()

for job in jobs:
    r = requests.get(job.link)
    if r.status_code != 200:
        print('Invalid job')
        job.delete()
