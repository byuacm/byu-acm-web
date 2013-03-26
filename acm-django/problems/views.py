from django.shortcuts import render
from django.utils import timezone

from membership.models import Member
from problems.models import *
from problems.forms import *

def problem(request, code):
	problem = Problem.objects.get(code=code)
	questions = problem.question_set.all()
	score = -1
	if request.method == 'POST':
		assert problem.start <= timezone.now() <= problem.end
		score = 0
		for question in questions:
			score += eval(question.judge)(request.POST[question.field])
		for username in request.POST['usernames'].split():
			member = Member.objects.get(user__username=username)
			status, created = SubmissionStatus.objects.get_or_create(problem_set=problem, member=member, defaults={'score':score})
			if score > status.score:
				status.score = score
				status.save()
	
	fields = {question.field:request.POST.get(question.field,'') for question in questions}
	form = ProblemForm(fields)
	form.fields['usernames'].initial = request.POST.get('usernames','')
	d = {
		'problem' : problem,
		'form' : form,
		'score' : score,
	}
	return render(request, 'problems/problem.html', d)
