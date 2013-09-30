from django.http import *
from django.shortcuts import render
from django.utils import timezone

from membership.models import Member
from problems.models import *
from problems.forms import *

def problem(request, code):
    try:
        problem = Problem.objects.get(code=code)
    except Problem.DoesNotExist:
        return HttpRequestNotFound()
    questions = problem.question_set.all()
    score = -1
    invalid_names = []

    if request.method == 'POST':
        if not (problem.start <= timezone.now() <= problem.end):
            return HttpResponseForbidden()

        score = sum(eval(question.judge)(request.POST[question.field]) for question in questions)
        for username in request.POST['usernames'].split():
            try:
                member = Member.objects.get(user__username=username)
            except Member.DoesNotExist:
                invalid_names.append(username)
            else:
                status, _ = SubmissionStatus.objects.get_or_create(
                    problem_set=problem, member=member, defaults={'score':score}
                )
                if score > status.score:
                    status.score = score
                    status.save()

    fields = {question.field:request.POST.get(question.field, '') for question in questions}
    form = ProblemForm(fields)
    form.fields['usernames'].initial = request.POST.get('usernames', '')

    return render(request, 'problems/problem.html', {
        'problem' : problem,
        'form' : form,
        'score' : score,
        'invalid_names' : invalid_names,
    })
    
def problems(request):
    problems = Problem.objects.filter(start__lte=timezone.now())
    return render(request, 'problems/problems.html', {
        'problems': problems
    })
