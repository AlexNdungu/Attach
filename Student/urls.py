from django.urls import path

from . import views

app_name = "Student"


urlpatterns = [
    path('SignUp/', views.signUp, name='SignUpinstitute'),
]