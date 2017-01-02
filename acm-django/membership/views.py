from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import *
from django.shortcuts import render, redirect
from django.utils import timezone
from django.views.decorators.http import require_POST
from mailsnake import MailSnake

from membership.forms import *
from membership.models import *


def new_member(request):
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
            __add_to_mailchimp(user)
            return redirect('membership.views.enrollment')
    else:
        uform = MyUserCreationForm()
        pform = MemberForm()
    return render(request, 'membership/new_member.html', {
        'uform': uform,
        'pform': pform,
    })


@login_required
def signin(request, meeting_pk=None):
    now = timezone.now()
    initial = {}
    success = None
    if request.method == 'POST':
        form = AttendanceForm(request.POST)
        form.fields['meeting'].queryset = Meeting.objects.filter(
            attendance_start__lte=now, attendance_end__gt=now
        )
        form.fields['meeting'].empty_label = None
        if form.is_valid():
            a = form.save(commit=False)
            a.member = Member.objects.get(user__username=request.POST['username'])
            if not Attendance.objects.filter(member=a.member, meeting=a.meeting).exists():
                Enrollment.objects.get_or_create(member=a.member, semester=a.meeting.semester)
                a.save()
            success = a.member.user.get_full_name()
        else:
            return render(request, 'membership/signin.html', {
                'success': None,
                'form': form,
            })
        initial['meeting'] = Meeting.objects.get(pk=form.data['meeting'])
    else:
        initial['username'] = request.user.username
        try:
            initial['meeting'] = (
                Meeting.objects.get(pk=meeting_pk) if meeting_pk is not None
                else Meeting.most_recent()
            )
        except Meeting.DoesNotExist:
            pass
    form = AttendanceForm(initial=initial)
    return render(request, 'membership/signin.html', {
        'success': success,
        'form': form
    })


def __add_to_mailchimp(user):
    if settings.MAILCHIMP_AUTO_SUBSCRIBE:
        ms = MailSnake(settings.MAILCHIMP_API_KEY)
        ms.listSubscribe(
            id=settings.MAILCHIMP_LIST_ID,
            email_address=user.email,
            merge_vars={
                'FNAME': user.first_name,
                'LNAME': user.last_name,
            },
            double_optin=False,  # no confirm message
            send_welcome=True,  # if new, send welcome
            update_existing=True,  # if existing, update
        )


@login_required
def enrollment(request):
    now = timezone.now()
    enrollments = (
        Enrollment.objects
            .filter(member__user=request.user)
            .order_by('-semester__enrollment_start')
    )
    available_semesters = (
        Semester.objects.filter(enrollment_start__lte=now)
            .filter(enrollment_end__gt=now)
            .exclude(member__user=request.user)
    )
    shirt_sizes = ShirtSize.objects.filter(is_active=True)
    return render(request, 'membership/enrollment.html', {
        'enrollments': enrollments,
        'available_semesters': available_semesters,
        'shirt_sizes': shirt_sizes
    })


@require_POST
@login_required
def enroll(request):
    member = Member.objects.get(user=request.user)
    try:
        semester = Semester.objects.get(pk=request.POST['semester_pk'])
        shirt_size = (
            ShirtSize.objects.get(pk=request.POST['shirt_size_pk']) if request.POST['shirt_size_pk']
            else None
        )
    except (Semester.DoesNotExist, ShirtSize.DoesNotExist):
        response = HttpResponse()
        response.status_code = 422
        response.reason_phrase = 'Unprocessable Entry'
        return response
    
    enrollment, _ = Enrollment.objects.get_or_create(member=member, semester=semester)
    enrollment.shirt_size = shirt_size
    enrollment.save()
    return redirect(reverse('membership.views.enrollment'))


@login_required
def edit_member(request):
    user = request.user
    print(user)
    """
        WARNING: if the user was created with `python3 manage.py createsuperuser`
        then the user won't have a corresponding member object and this will
        fail.
    """
    member = Member.objects.get(user=user)
    if request.method == 'POST':
        uform = MyUserChangeForm(request.POST, instance=user)
        pform = MemberForm(request.POST, instance=member)
        if uform.is_valid() and pform.is_valid():
            user = uform.save()
            member.save()
            __add_to_mailchimp(user)
    else:
        uform = MyUserChangeForm(instance=user)
        pform = MemberForm(instance=member)
    return render(request, 'membership/edit_member.html', {
        'uform': uform,
        'pform': pform,
    })


def logout(request):
    auth.logout(request)
    return render(request, 'registration/logout.html',)
