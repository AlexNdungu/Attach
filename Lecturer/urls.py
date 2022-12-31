from django.urls import path

from . import views

app_name = "Lecturer"


urlpatterns = [
    path('dash/',views.Inherite, name="lecInstituteDash"),
    #Lecturers in this department
    path('lecturer/',views.lecturer, name="lecInstituteDash"),
    path('createLec/', views.createLec, name='create_Lec'),
    path('deleteLec/', views.deleteHead, name='delete_Lec'),
    #Course
    path('course/', views.SeeCourse, name='course_url'),
    path('createCourse/', views.createCourse, name='create_course'),
    path('deleteCourse/', views.deleteCourse, name='delete_course'),
    #allocated students
    path('allocated',views.allocatedStudents, name='allocate_stud'),

    path('studRequest',views.requestStudents, name='request_stud'),
    #This is the link to sending request from student to lecturer
    path('Request/<pk>/',views.newRequest, name='new_request'),

]