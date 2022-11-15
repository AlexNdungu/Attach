from django.urls import path

from . import views

app_name = "Institute"


urlpatterns = [

    path('SignUp/', views.signUp, name='SignUpinstitute'),
    #Here we sign in an institute
    path('createInstitute/', views.createInstitute, name="createInstitute"),

    path('geoCode/', views.geocode, name="geocode"),

    #The dashboard section
    path('dash/',views.dash, name="inheritInstituteDash"),

    path('dashboard/',views.dashboard, name="instDashboard"),

    path('profile/',views.profile, name="Iprofile"),

    #Update profile
    path('updateProfile/',views.updateProfile, name="updateProfile"),

    path('location/',views.location, name="Ilocation"),

    #Update location
    path('currentLocation/',views.currentLocation, name='currentLocation'),

    path('departments/',views.department,name="departments"),

    #Json response to create depart,ments
    path('getHeads/',views.getDepHeads,name="get_heads"),

    path('createDepart/',views.createDepartment,name="create_heads"),

    path('deleteDepart/',views.deleteDep,name="delete_heads"),

    path('heads/',views.heads,name="heads"),

    #Create head
    path('createHead/',views.createHead, name='create_head'),

    #Delete the head
    path('deleteHead/', views.deleteHead, name='delete_Head'),

    path('lectures/',views.lectures,name="lectures"),

    path('students/',views.students,name="students"),

    path('active/',views.activeStudents,name="actStuds"),
]