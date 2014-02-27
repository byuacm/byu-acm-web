from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

import problems

class Attendance(models.Model):
    member = models.ForeignKey('Member', verbose_name='Member')
    meeting = models.ForeignKey('Meeting', verbose_name='Meeting')
    has_shirt = models.BooleanField('Wearing ACM Shirt')
    points = models.IntegerField('Points', default=1)

    def total_points(self):
        score = (
            problems.models.SubmissionStatus.objects
                .filter(problem_set__meeting=self.meeting, member=self.member)
                .aggregate(models.Sum('score'))['score__sum']
        )
        return max(self.points, score + 1) if score else self.points

    def __unicode__(self):
        date = timezone.localtime(self.meeting.datetime)
        return u'{1:%Y-%m-%d} - {0.member}'.format(self, date)

    class Meta:
        ordering = ['-pk']

class Course(models.Model):
    name = models.CharField('Name', max_length=50)
    sequence = models.IntegerField('Sequence', unique=True)
    is_active = models.BooleanField('Active', default=True)

    def __unicode__(self):
        return self.name
    
    class Meta:
        ordering = ['sequence']

class Enrollment(models.Model):
    member = models.ForeignKey('Member', verbose_name='Member')
    semester = models.ForeignKey('Semester', verbose_name='Semester')
    shirt_size = models.ForeignKey('ShirtSize', verbose_name='Shirt Size', blank=True, null=True)
    paid_dues = models.BooleanField('Paid Dues', default=False)
    received_shirt = models.BooleanField('Received Shirt', default=False)

    def can_change_shirt_size(self):
        return (
            not self.received_shirt
            and self.semester.enrollment_start <= timezone.now() < self.semester.enrollment_end
        )

    def attendance_proportion(self):
        num_attended = (
            Attendance.objects
                .filter(member=self.member, meeting__semester=self.semester)
                .count()
        )
        num_meetings = (
            Meeting.objects
                .filter(semester=self.semester, datetime__lte=timezone.now())
                .count()
        )
        return '{0}/{1}'.format(num_attended, num_meetings)

    def __unicode__(self):
        return u'{0.semester} - {0.member}'.format(self)

    class Meta:
        ordering = ['semester', 'member']

class Meeting(models.Model):
    semester = models.ForeignKey('Semester', verbose_name='Semester')
    name = models.CharField('Name', max_length=40, blank=True, null=True)
    datetime = models.DateTimeField('Date/time')
    attendance_start = models.DateTimeField('Attendance Start', blank=True, null=True)
    attendance_end= models.DateTimeField('Attendance End', blank=True, null=True)
    password = models.CharField('Password', max_length=20, blank=True, null=True)

    def in_past(self):
        return self.datetime < timezone.now()

    def can_attend(self):
        return self.attendance_start <= timezone.now() < self.attendance_end

    @staticmethod
    def most_recent():
        try:
            return Meeting.objects.filter(attendance_start__lte=timezone.now()).order_by('-datetime')[0]
        except IndexError:
            raise Meeting.DoesNotExist
        #TODO: In 1.6, use Meeting.objects.filter(attendance_start__lte=timezone.now()).earliest()

    @staticmethod
    def current():
        now = timezone.now()
        return Meeting.objects.filter(attendance_start__lte=now, attendance_end__gt=now)

    def __unicode__(self):
        return u'{1:%Y-%m-%d %a} ({0.name})'.format(self, timezone.localtime(self.datetime))
        
    class Meta:
        get_latest_by = 'datetime'
        ordering = ['datetime']

class Semester(models.Model):
    name = models.CharField('Name', max_length=12)
    enrollment_start = models.DateTimeField('Enrollment Start')
    enrollment_end = models.DateTimeField('Enrollment End')

    def can_enroll(self):
        return self.enrollment_start <= timezone.now() < self.enrollment_end

    @staticmethod
    def most_recent():
        try:
            return Semester.objects.filter(enrollment_start__lte=timezone.now()).order_by('-enrollment_start')[0]
        except IndexError:
            raise Semester.DoesNotExist
        #TODO: In 1.6, use Semester.objects.filter(enrollment_start__lte=timezone.now()).latest()

    def __unicode__(self):
        return self.name

    class Meta:
        get_latest_by = 'enrollment_start'
        ordering = ['enrollment_start', 'enrollment_end',]

class ShirtSize(models.Model):
    abbr_name = models.CharField('Abbreviated Name', max_length=4)
    full_name = models.CharField('Full Name', max_length=20, blank=True, null=True)
    sequence = models.IntegerField('Sequence', unique=True)
    is_active = models.BooleanField('Active', default=True)

    def __unicode__(self):
        return self.full_name

    class Meta:
        ordering = ['sequence']

class Member(models.Model):
    user = models.OneToOneField(User)
    memberships = models.ManyToManyField('Semester', through='Enrollment', blank=True, null=True)
    attendances = models.ManyToManyField('Meeting', through='Attendance', blank=True, null=True)
    graduation = models.ForeignKey(
        'Semester', verbose_name='Graduating', blank=True, null=True, related_name='graduation'
    )
    spoj_username = models.CharField('SPOJ Username', max_length=80, blank=True)
    is_byu = models.BooleanField('Is BYU Student', default=True)
    is_cs = models.BooleanField('Is CS Student', default=True)
    is_undergraduate = models.BooleanField('Is Undergraduate', default=True)
    highest_course = models.ForeignKey(
        'Course', verbose_name='Highest CS Course', blank=True, null=True
    )
    website = models.CharField('Website', max_length=200, blank=True, null=True)

    def __unicode__(self):
        return self.user.get_full_name()
