from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect
from django.utils import timezone
from membership.forms import *
from membership.models import *
import django.contrib.auth as auth

def new_member(request):
	#auth.logout(request)
	if request.method == 'POST':
		uform = MyUserCreationForm(request.POST)
		pform = MemberForm(request.POST)
		if uform.is_valid() and pform.is_valid():
			user = uform.save()
			member = pform.save(commit=False)
			member.user = user
			member.save()
			user = authenticate(username=uform.data['username'], password=uform.data['password1'])
			auth.login(request, user)
			return redirect('membership.views.enrollment')
	else:
		uform = MyUserCreationForm()
		pform = MemberForm()
	d = {
		'uform':uform,
		'pform':pform,
	}
	return render(request, 'membership/new_member.html', d)

def signin(request, meeting_pk=None):
	now = timezone.now()
	initial = {}
	if request.method == 'POST':
		form = AttendanceForm(request.POST)
		form.fields['meeting'].queryset = Meeting.objects.filter(attendance_start__lte=now, attendance_end__gt=now)
		form.fields['meeting'].empty_label = None
		if form.is_valid():
			member = Member.objects.get(user__username=request.POST['username'])
		 	a = form.save(commit=False)
		 	a.member = member
		 	if not Attendance.objects.filter(meeting=a.meeting).filter(member=a.member).exists():
				a.save()
				if not member.memberships.filter(enrollment__semester=a.meeting.semester).exists():
					Enrollment(member_pk=member_pk, semester=semester).save()
		meeting_pk = form.data['meeting']
	elif request.user.is_authenticated():
		initial['username'] = request.user.username
	if meeting_pk is not None:
		initial['meeting'] = Meeting.objects.get(pk=meeting_pk)
	form = AttendanceForm(initial=initial)
	form.fields['meeting'].queryset = Meeting.objects.filter(attendance_start__lte=now, attendance_end__gt=now)
	d = {
		'form':form
	}
	return render(request, 'membership/signin.html', d)

@login_required
def enrollment(request):
	now = timezone.now()
	enrollments = Enrollment.objects.filter(member__user=request.user)
	available_semesters = Semester.objects.filter(enrollment_start__lte=now).filter(enrollment_end__gt=now).exclude(member__user=request.user)
	shirt_sizes = ShirtSize.objects.filter(is_active=True)
	d = {
		'enrollments':enrollments,
		'available_semesters':available_semesters,
		'shirt_sizes':shirt_sizes,
	}
	return render(request, 'membership/enrollment.html', d)

@login_required
def enroll(request):
	member = Member.objects.get(user=request.user)
	semester = Semester.objects.get(pk=request.POST['semester_pk'])
	shirt_size = ShirtSize.objects.get(pk=request.POST['shirt_size_pk']) if len(request.POST['shirt_size_pk']) else None
	try:
		enrollment = member.enrollment_set.get(semester=semester)
	except Enrollment.DoesNotExist:
		enrollment = Enrollment(member=member, semester=semester)
	enrollment.shirt_size = shirt_size
	enrollment.save()
	return redirect(reverse('membership.views.enrollment'))

@login_required
def edit_member(request):
	user = request.user
	member = Member.objects.get(user=user)
	if request.method == 'POST':
		uform = MyUserChangeForm(request.POST, instance=user)
		pform = MemberForm(request.POST, instance=member)
		if uform.is_valid() and pform.is_valid():
			uform.save()
			member.save()
	else:
		uform = MyUserChangeForm(instance=user)
		pform = MemberForm(instance=member)
	d = {
		'uform':uform,
		'pform':pform,
	}
	return render(request, 'membership/edit_member.html', d)

def logout(request):
	auth.logout(request)
	return render(request, 'registration/logout.html',)

def make_raffle(request):
	if not request.user.is_staff:
		return redirect(settings.LOGIN_URL)
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
	return render(request, 'membership/make_raffle.html', d)

def raffle(request, meeting_pk):
	if not request.user.is_staff:
		return redirect(settings.LOGIN_URL)
	attendances = Attendance.objects.filter(meeting__pk = meeting_pk)
	d = {
		'attendances' : attendances,
	}
	return render(request, 'membership/raffle.html', d)