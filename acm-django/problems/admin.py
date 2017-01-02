from django.contrib import admin

from problems.models import Problem, Question, SubmissionStatus

admin.site.register(Problem)
admin.site.register(Question)
admin.site.register(SubmissionStatus)
