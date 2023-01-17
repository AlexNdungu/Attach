from django.urls import path

from . import views

app_name = "Student"


urlpatterns = [
    path('SignUp/', views.signUp, name='SignUpinstitute'),

    path('dash/',views.dash, name='studentDash'),

    path('studProf/<pk>/', views.seeProfile, name='studentProfile'),

    path('profile/',views.profile, name='profile'),

    path('updateProfile/',views.updateProfile, name='update_profile'),

    path('getDeps/', views.getDeps, name='get_deps'),

    path('getCourses/', views.getCourses, name='get_courses'),
    #Company categories
    path('categories/', views.categories, name='stuCats'),

    #Heat map
    path('Heat/', views.Heat, name='Heat'),

    #one category
    path('category/<pk>/', views.category, name='campOneCat'),

    #Companies offering opportunities
    path('opportunity/', views.opport, name='Opportunity'),

    #The company opportunities
    path('companyOpps/<pk>/', views.allOpps, name='company_Opps'),

    path('indopp/<pk>/', views.indopp, name='ind_opp'),

    #Apply job now
    path('applyJob/', views.applyJob, name='apply_job'),

    #Applied attachments
    path('applied/',views.applied, name='applied'),
]