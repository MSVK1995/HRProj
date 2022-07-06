from django.urls import path, include
from rest_framework.routers import DefaultRouter

from survey_api import views


router = DefaultRouter()
router.register('survey', views.SurveyViewset, basename='survey')

urlpatterns = [
    path('', include(router.urls))
]