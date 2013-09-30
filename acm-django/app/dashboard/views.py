from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.http import *
from django.shortcuts import render
from django.utils import timezone
import django.utils.simplejson as json
from django.views.decorators.csrf import csrf_exempt
import time
from urlparse import urlparse

from membership.models import *
from problems.models import SubmissionStatus

@staff_member_required
def raffle(request, meeting_pk=None):
    if meeting_pk is None:
        try:
            default_meeting = Meeting.most_recent()
        except Meeting.DoesNotExist:
            default_meeting = None
        return render(request, 'dashboard/make_raffle.html', {
            'meetings': Meeting.objects.all(),
            'default_meeting': default_meeting,
        })
    else:
        attendances = Attendance.objects.filter(meeting__pk=meeting_pk)
        return render(request, 'dashboard/raffle.html', {
            'attendances': attendances,
        })

@staff_member_required
def shirt_sizes(request, semester_pk=None):
    semesters = Semester.objects.all()
    try:
        semester = (
            Semester.objects.get(pk=semester_pk) if semester_pk is not None
            else Semester.most_recent()
        )
    except Semester.DoesNotExist:
        semester = None
        enrollments = Enrollment.objects.none()
    else:
        enrollments = Enrollment.objects.filter(semester=semester)
    shirt_sizes = ShirtSize.objects.all()
    for shirt_size in shirt_sizes:
        #Can't reduce number of queries:
        # http://stackoverflow.com/questions/4620385/django-annotation-with-nested-filter
        shirt_size.all__count = enrollments.filter(shirt_size=shirt_size).count()
        shirt_size.paid__count = enrollments.filter(shirt_size=shirt_size, paid_dues=True).count()
        shirt_size.paid_unreceived__count = enrollments.filter(
            shirt_size=shirt_size, paid_dues=True, received_shirt=False
        ).count()
    return render(request, 'dashboard/shirt_sizes.html', {
        'semesters': semesters,
        'semester': semester,
        'shirt_sizes': shirt_sizes,
    })

@staff_member_required
def make_member_list(request):
    semesters = Semester.objects.all()
    return render(request, 'dashboard/make_member_list.html', {
        'semesters' : semesters,
    })

def utc_millis(dt):
    seconds = time.mktime(dt.now().timetuple())
    return int(round(seconds * 1000))

def member_list(request, semester_pk):
    semester = Semester.objects.get(pk=semester_pk)
    d = {
        'semester': {
            'name': semester.name,
            'start_utc': utc_millis(semester.enrollment_start),
            'end_utc': utc_millis(semester.enrollment_end),
        },
        'members': [
            {
                'first_name': enrollment.member.user.first_name,
                'last_name': enrollment.member.user.last_name,
                'website': clean_web_url(enrollment.member.website),
            } for enrollment in (
                Enrollment.objects
                    .filter(semester=semester, paid_dues=True)
                    .order_by('member__user__last_name', 'member__user__first_name')
            )
        ],
    }
    response = HttpResponse(json.dumps(d), content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    return response

def clean_web_url(url):
    if url:
        parsed = urlparse(url)
        if not parsed.scheme:
            url = 'http://' + url
        elif parsed.scheme == 'javascript':
            url = None
    return url

@csrf_exempt
@staff_member_required
def points(request, meeting_pk=None):
    if request.method == 'POST':
        try:
            a = Attendance.objects.get(pk=request.POST['attendance_pk'])
        except Attendance.DoesNotExist:
            return HttpResponseNotFound()
        a.points = request.POST['points']
        a.save()
        return HttpResponse()

    try:
        meeting = (
            Meeting.objects.get(pk=meeting_pk) if meeting_pk is not None
            else Meeting.most_recent()
        )
    except Meeting.DoesNotExist:
        return HttpResponseNotFound()

    attendances = (
        Attendance.objects
            .filter(meeting=meeting)
            .order_by('member__user__first_name', 'member__user__last_name')
    )
    d = {
        'meeting': meeting,
        'attendances' : attendances,
    }
    return render(request, 'dashboard/points.html', d)
