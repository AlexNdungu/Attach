from django.urls import path

from . import views

app_name = "Lecturer"


urlpatterns = [
    path('dash/',views.Inherite, name="lecInstituteDash"),
    #Lecturers in this department
    path('lecturer/',views.lecturer, name="lecInstituteDash"),
    path('createLec/', views.createLec, name='create_Lec'),
    path('deleteLec/', views.deleteHead, name='delete_Lec')

]