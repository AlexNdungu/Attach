from django.urls import path

from . import views

app_name = "Company"


urlpatterns = [
    #signup company
    path('SignUp/', views.signUp, name='SignUpCompany'),
    #Create company
    path('createCompany/', views.createCompany, name="createCompany"),

    path('profile/',views.profile, name="Cprofile"),

    #Update profile
    path('updateProfile/',views.updateProfile, name="updateProfile"),

    path('location/',views.location, name="Clocation"),

    path('currentLocation/',views.currentLocation, name='currentLocation'),

    #Here is the dashboard
    path('dashboard/', views.dashboard, name='dashboard'),

    path('dash/', views.dash, name='dash'),

]