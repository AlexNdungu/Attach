from django.db import models
from django.contrib.auth.models import User

#Import institute
from Institute.models import InstituteProfile

# Create your models here.

class HeadLecturer(models.Model):

    lec_id = models.AutoField(primary_key=True)

    #The institute the head belongs to
    institute = models.ForeignKey(InstituteProfile, on_delete=models.CASCADE)

    lecturer = models.OneToOneField(User, on_delete=models.CASCADE)

    lec_name = models.CharField(max_length=40, verbose_name='Lecturer Name')

    bio = models.TextField(verbose_name='Bio')

    #Images
    profile_image = models.ImageField(upload_to='Profile', verbose_name='Profile', default = 'instituteIc.png')
    profile_image_name = models.CharField(max_length=40, verbose_name='Profile Source',default = 'instituteIc.png')

    act = models.ImageField(upload_to='Activity', verbose_name='Activity Image', default = 'actIc.png')
    act_name = models.CharField(max_length=40, verbose_name='Activity Source',default = 'actIc.png')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.lec_name


#The department
class Department(models.Model):

    dep_id = models.AutoField(primary_key=True)

    institute = models.ForeignKey(InstituteProfile, on_delete=models.CASCADE)

    dep_name = models.CharField(max_length=40, verbose_name='Department Name')

    dep_desc = models.TextField(verbose_name='Depertment Bio')

    head = models.OneToOneField(HeadLecturer, on_delete=models.SET_NULL, null=True)

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return self.dep_name


#Course
class Course(models.Model):

    Course_id = models.AutoField(primary_key=True)

    institute = models.ForeignKey(InstituteProfile, on_delete=models.CASCADE)

    Course_name = models.CharField(max_length=40, verbose_name='Course Name')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return self.Course_name