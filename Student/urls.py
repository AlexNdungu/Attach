from django.urls import path

from . import views

app_name = "Student"


urlpatterns = [
    path('SignUp/', views.signUp, name='SignUpinstitute'),

    path('dash/',views.dash, name='studentDash'),

    #Company categories
    path('categories/', views.categories, name='stuCats'),

    #one category
    path('category/<pk>/', views.category, name='campOneCat'),

    #Companies offering opportunities
    path('opportunity/', views.opport, name='Opportunity'),

    #The company opportunities
    path('companyOpps/', views.allOpps, name='company_Opps'),

    #Applied attachments
    path('applied/',views.applied, name='applied'),
]