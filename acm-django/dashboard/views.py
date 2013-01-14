from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.db.models import *
from django.shortcuts import render, redirect
from django.utils import timezone
from membership.models import *
import django.contrib.auth as auth

@staff_member_required
def dashboard(request):
	return render(request, 'dashboard/dashboard.html')

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
			print shirt_size.all__count
	except Semester.DoesNotExist:
		semester = None
		shirt_size_counts = None
	d = {
		'semesters' : semesters,
		'semester' : semester,
		'shirt_sizes' : shirt_sizes,
	}
	return render(request, 'dashboard/shirt_sizes.html', d)