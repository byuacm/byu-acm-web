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

class ShirtSizeCountAdmin(LinkAdmin):
	def changelist_view(self, request, extra_context=None):
		return redirect(reverse('dashboard.views.shirt_sizes'))

class MemberListAdmin(LinkAdmin):
	def changelist_view(self, request, extra_context=None):
		return redirect(reverse('dashboard.views.make_member_list'))

admin.site.register(Raffle, RaffleAdmin)
admin.site.register(ShirtSizeCount, ShirtSizeCountAdmin)
admin.site.register(MemberList, MemberListAdmin)
