from rest_framework import serializers
from membership.models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
