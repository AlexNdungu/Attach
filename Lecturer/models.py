from django.db import models
from django.contrib.auth.models import User

#Import institute
from Institute.models import *


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
