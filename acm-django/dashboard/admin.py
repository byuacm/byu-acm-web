from django.contrib import admin
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from dashboard.models import *

class LinkAdmin(admin.ModelAdmin):
	def has_add_permission(self, request):
		return False
	
	def has_delete_permission(self, request):
		return False

class RaffleAdmin(LinkAdmin):
	def changelist_view(self, request, extra_context=None):
		return redirect(reverse('dashboard.views.raffle'))

class ShirtSizeAdmin(LinkAdmin):
	def changelist_view(self, request, extra_context=None):
		return redirect(reverse('dashboard.views.shirt_sizes'))

admin.site.register(Raffle, RaffleAdmin)
admin.site.register(ShirtSize, ShirtSizeAdmin)
