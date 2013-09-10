from django.shortcuts import render
from django.utils import timezone

from membership.models import Member
from problems.models import *
from problems.forms import *

def problem(request, code):
	problem = Problem.objects.get(code=code)
	questions = problem.question_set.all()
	score = -1
	invalid_names = []
	if request.method == 'POST':
		assert problem.start <= timezone.now() <= problem.end
		score = 0
		for question in questions:
			score += eval(question.judge)(request.POST[question.field])
		for username in request.POST['usernames (seperated by whitespace)'].split():
			try:
				member = Member.objects.get(user__username=username)
			except Exception:
				invalid_names.append(username)
				continue
			status, created = SubmissionStatus.objects.get_or_create(problem_set=problem, member=member, defaults={'score':score})
			if score > status.score:
				status.score = score
				status.save()
	
	fields = {question.field:request.POST.get(question.field,'') for question in questions}
	form = ProblemForm(fields)
	form.fields['usernames (seperated by whitespace)'].initial = request.POST.get('usernames','')
	d = {
		'problem' : problem,
		'form' : form,
		'score' : score,
		'invalid_names' : invalid_names
	}
	return render(request, 'problems/problem.html', d)
	
def problems(request):
	now = timezone.now()
	d = {'problems' : Problem.objects.filter(start__lte=now)}
	return render(request, 'problems/problems.html', d)

