from django.db import models
from django.utils import timezone

from membership.models import Meeting, Member


class Problem(models.Model):
    code = models.CharField(primary_key=True, max_length=12)
    start = models.DateTimeField()
    end = models.DateTimeField()
    name = models.CharField(max_length=50)
    body = models.CharField(max_length=32000)
    meeting = models.ForeignKey(Meeting)

    def is_active(self):
        return self.start <= timezone.now() < self.end

    def __unicode__(self):
        return self.name


class Question(models.Model):
    problem_set = models.ForeignKey(Problem)
    field = models.CharField(max_length=50)
    judge = models.CharField(max_length=32000)
    seq = models.IntegerField()

    def __unicode__(self):
        return u'{0.problem_set.name} {0.field}'.format(self)


class SubmissionStatus(models.Model):
    problem_set = models.ForeignKey(Problem)
    member = models.ForeignKey(Member)
    score = models.IntegerField()

    def __unicode__(self):
        return u'%s - %s'.format(self.problem_set, self.member)

    class Meta:
        verbose_name_plural = 'Submission statuses'
