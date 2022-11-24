from django.urls import path

from . import views

app_name = "Lecturer"


urlpatterns = [
    path('dash/',views.Inherite, name="lecInstituteDash"),
    path('lecturer/',views.lecturer, name="lecInstituteDash"),
]