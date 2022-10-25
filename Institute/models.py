from email.policy import default
from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#Institute Profile
class InstituteProfile(models.Model):

    institute_profile_id = models.AutoField(primary_key=True)

    #One user to one institute
    institute = models.OneToOneField(User, on_delete=models.CASCADE)

    institute_name = models.CharField(max_length=40, verbose_name='Institute Name')

    bio = models.TextField(verbose_name='Bio')
    mission = models.TextField(verbose_name='Mission')
    vission = models.TextField(verbose_name='Vision')

    logo = models.ImageField(upload_to='Logos', verbose_name='Logo', default = 'instituteIc.png')
    act = models.ImageField(upload_to='Activity', verbose_name='Activity Image', default = 'actIc.png')

    def __str__(self):
        return self.institute_name


class InstituteLocation(models.Model):

    institute_location_id = models.AutoField(primary_key=True)

    #One user to one institute
    institute = models.OneToOneField(User, on_delete=models.CASCADE)

    address = models.CharField(max_length=50, verbose_name='Address')
    country = models.CharField(max_length=20, verbose_name='Country')
    county = models.CharField(max_length=20, verbose_name='County')
    town = models.CharField(max_length=20, verbose_name='Town')

    latitude = models.CharField(max_length=20, verbose_name='Latitude')
    longitude = models.CharField(max_length=20, verbose_name='Longitude')

    def __str__(self):
        return self.institute.instituteprofile.institute_name