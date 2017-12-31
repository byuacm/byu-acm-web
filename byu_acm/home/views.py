from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.template import loader, TemplateDoesNotExist

from home.models import OfficerBio


def homepage(request, page='home'):
    ctx = {'current_tab': page}
    ctx.update(_PAGE_CONTEXT.get(page, lambda _: {})(request))
    try:
        template = loader.get_template('home/{}.html'.format(page))
    except TemplateDoesNotExist:
        raise Http404()
    return HttpResponse(template.render(ctx, request))


def officers_context(_):
    return {'officers': OfficerBio.objects.order_by('id')}


_PAGE_CONTEXT = {
    'officers': officers_context,
}
