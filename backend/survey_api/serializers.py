from rest_framework import serializers
from survey_api import models as survey_models
from phone_field import PhoneField
from rest_framework.validators import UniqueValidator

class InfoSerializer(serializers.ModelSerializer):
    """Serializes a user data"""
    company_name = serializers.CharField(max_length=255)
    business_sector = serializers.CharField(max_length=255)
    employee_count = serializers.IntegerField(default=0)
    company_location = serializers.CharField(max_length=255)
    contact_name = serializers.CharField(max_length=150)
    contact_job_title = serializers.CharField(max_length=100)
    contact_email = serializers.EmailField(max_length=200)
    contact_telephone = PhoneField(blank=True)

    class Meta:
        model = survey_models.CustomerInfo
        fields = '__all__'
        validator = []


    def validate_employee_count(self,value):
        if value < 1:
            raise serializers.ValidationError("Employees must be greater than 0")
        return value