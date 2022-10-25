from django.urls import path

from . import views

app_name = "Company"


urlpatterns = [
    path('SignUp/', views.signUp, name='SignUpCompany'),
    #Create company
    path('createCompany/', views.createCompany, name="createCompany"),

    path('profile/',views.profile, name="Cprofile"),

    #Update profile
    path('updateProfile/',views.updateProfile, name="updateProfile"),

    path('location/',views.location, name="Clocation"),

    path('currentLocation/',views.currentLocation, name='currentLocation'),

]