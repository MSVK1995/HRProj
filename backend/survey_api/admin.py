from django.contrib import admin
from .models import CustomerSurvey, CustomerInfo





class CustomerSurveyAdmin(admin.ModelAdmin):
    search_fields = ('survey_user__contact_email',)
    readonly_fields=('survey_user',)

class CustomerInfoInline(admin.StackedInline):
    model = CustomerSurvey


class CustomerInfoAdmin(admin.ModelAdmin):
    model=CustomerInfo
    search_fields = ('contact_email',)
    inlines = [CustomerInfoInline, ]


admin.site.register(CustomerInfo, CustomerInfoAdmin)

admin.site.register(CustomerSurvey, CustomerSurveyAdmin)