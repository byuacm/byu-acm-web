from django.core.urlresolvers import reverse_lazy
from django.views.generic.base import RedirectView

def redirect_view(view, **kwargs):
	kwargs['url'] = reverse_lazy(view)
	return RedirectView.as_view(**kwargs)
