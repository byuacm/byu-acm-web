from django.db import models
from django.utils import timezone

from membership.models import Member

class Problem(models.Model):
	code = models.CharField(primary_key=True, max_length=12)
	start = models.DateTimeField()
	end = models.DateTimeField()
	name = models.CharField(max_length=50)
	body = models.CharField(max_length=32000)
	
	def is_active(self):
		return self.start <= timezone.now() < self.end

class Question(models.Model):
	problem_set = models.ForeignKey(Problem)
	field = models.CharField(max_length=50)
	judge = models.CharField(max_length=32000)
	seq = models.IntegerField()

class SubmissionStatus(models.Model):
	problem_set = models.ForeignKey(Problem)
	member = models.ForeignKey(Member)
	score = models.IntegerField()


