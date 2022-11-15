from django.db import models
from django.contrib.auth.models import User
from Institute.models import *
from Lecturer.models import *


# Create your models here.

class Student(models.Model):
    
    stud_id = models.AutoField(primary_key=True)

    student = models.OneToOneField(User, on_delete=models.CASCADE)

    institute = models.ForeignKey(InstituteProfile, on_delete=models.SET_NULL, null=True)

    department = models.ForeignKey(Department,on_delete=models.SET_NULL, null=True)

    course = models.ForeignKey(Course,on_delete=models.SET_NULL, null=True)

    stud_name = models.CharField(max_length=40, verbose_name='Student Name')

    #Images
    profile_image = models.ImageField(upload_to='Profile', verbose_name='Profile', default = 'instituteIc.png')
    profile_image_name = models.CharField(max_length=40, verbose_name='Profile Source',default = 'instituteIc.png')

    act = models.ImageField(upload_to='Activity', verbose_name='Activity Image', default = 'actIc.png')
    act_name = models.CharField(max_length=40, verbose_name='Activity Source',default = 'actIc.png')

    #files
    cv = models.FileField(upload_to='Files', verbose_name='CV')

    rec = models.FileField(upload_to='Files', verbose_name='Recommendation Letter')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.stud_name