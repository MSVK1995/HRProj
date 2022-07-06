from django.db import models
from phone_field import PhoneField
from django.db.models.signals import post_save

    

COLOR_CHOICES = (
       (3, 'Green'),
       (2, 'Amber'),
       (1, 'Red'),
       (0, ''),
    )

survey_subsections = [
    "legal_compliance",
    "work_n_leaves",
    "policies_n_practices",
    "employee_reactions",
    "performance_management",
    "training_n_dev",
    "recruit_n_retain",
    "change_n_reorganise",
    "pay_n_benefits",
    "employee_communication",
    "health_n_safety",
    "covid_related",
    "records_n_GDPR",
]


class CustomerInfo(models.Model):
    company_name = models.CharField(max_length=255)
    business_sector = models.CharField(max_length=255)
    employee_count = models.PositiveIntegerField(default=0)
    company_location = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=150)
    contact_job_title = models.CharField(max_length=100)
    contact_email = models.EmailField(max_length=200, unique=True)
    contact_telephone = PhoneField(blank=True)
    pdf_report = models.FileField(upload_to='pdf', blank=True)

    def __str__(self):
        return self.contact_email
    



class CustomerSurvey(models.Model):        

    survey_user = models.OneToOneField(CustomerInfo, on_delete=models.CASCADE, null=True, blank=True)

    for field_name in survey_subsections:
        locals()[field_name] = models.IntegerField(choices=COLOR_CHOICES, default=0)


    def __str__(self):
        return str(self.survey_user)
    


def create_customer_survey(sender, instance, created, **kwargs):
    if created:
        CustomerSurvey.objects.create(survey_user=instance)

post_save.connect(create_customer_survey, sender=CustomerInfo)