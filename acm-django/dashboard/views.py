from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.db.models import *
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils import timezone
from membership.models import *
from urlparse import urlparse
import django.contrib.auth as auth
import django.utils.simplejson as json
import time

@staff_member_required
def raffle(request, meeting_pk=None):
	if meeting_pk is None:
		now = timezone.now()
		meetings = Meeting.objects.all()
		try:
			default_meeting = meetings.filter(datetime__lte=now).latest('datetime')
		except Meeting.DoesNotExist:
			default_meeting = None
		d = {
			'meetings' : meetings,
			'default_meeting' : default_meeting,
		}
		return render(request, 'dashboard/make_raffle.html', d)
	else:
		attendances = Attendance.objects.filter(meeting__pk = meeting_pk)
		d = {
			'attendances' : attendances,
		}
		return render(request, 'dashboard/raffle.html', d)

@staff_member_required
def shirt_sizes(request, semester_pk=None):
	now = timezone.now()
	semesters = Semester.objects.all()
	try:
		semester = Semester.objects.get(pk=semester_pk) if semester_pk else semesters.filter(enrollment_start__lte=now).latest('enrollment_start')
		enrollments = Enrollment.objects.filter(semester=semester)
		shirt_sizes = ShirtSize.objects.all()
		for shirt_size in shirt_sizes: # This hits DB multiple, times. Might be better way.
			shirt_size.all__count = enrollments.filter(shirt_size=shirt_size).count()
			shirt_size.paid__count = enrollments.filter(shirt_size=shirt_size).filter(paid_dues=True).count()
			shirt_size.paid_unreceived__count = enrollments.filter(shirt_size=shirt_size).filter(paid_dues=True).filter(received_shirt=False).count()
	except Semester.DoesNotExist:
		semester = None
		shirt_size_counts = None
	d = {
		'semesters' : semesters,
		'semester' : semester,
		'shirt_sizes' : shirt_sizes,
	}
	return render(request, 'dashboard/shirt_sizes.html', d)

@staff_member_required
def make_member_list(request):
	semesters = Semester.objects.all()
	d = {
		'semesters' : semesters,
	}
	return render(request, 'dashboard/make_member_list.html', d)

def utc_millis(dt):
	seconds = time.mktime(dt.now().timetuple())
	return int(round(seconds * 1000))

def member_list(request, semester_pk):
	semester = Semester.objects.get(pk=semester_pk)
	d = {}
	d['semester'] = {'name':semester.name, 'start_utc':utc_millis(semester.enrollment_start), 'end_utc':utc_millis(semester.enrollment_end),}
	d['members'] = [ {
			'first_name':enrollment.member.user.first_name
			, 'last_name':enrollment.member.user.last_name
			, 'website':clean_web_url(enrollment.member.website)
		}
		for enrollment
		in Enrollment.objects.filter(semester=semester).filter(paid_dues=True).order_by('member__user__last_name').order_by('member__user__first_name')
	]
	response = HttpResponse(json.dumps(d), content_type="application/json")
	response['Access-Control-Allow-Origin'] = '*'
	return response

def clean_web_url(url):
	if url:
		parse = urlparse(url)
		if not parse.scheme:
			url = 'http://'+url
		elif parse.scheme == 'javascript':
			url = None
	return url

@staff_member_required
def points(request):
	now = timezone.now()
	
	if request.method == 'POST':
		a = Attendance.objects.get(pk=request.POST['attendance_pk'])
		a.points = request.POST['points']
		a.save()
	
	meeting = Meeting.objects.filter(datetime__lte=now).order_by('-datetime')[0]
	attendances = Attendance.objects.filter(meeting=meeting).order_by('member__user__first_name', 'member__user__last_name')
	d = {
		'attendances' : attendances,
	}
	return render(request, 'dashboard/points.html', d)

