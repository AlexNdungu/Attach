from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from Student.models import *


#Company categories

class Category(models.Model):

    cate_id = models.AutoField(primary_key=True)

    cate_name = models.CharField(max_length=40, verbose_name='Category Name')

    cate_description = models.TextField(verbose_name='Category Description')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.cate_name


#Company Profile
class CompanyProfile(models.Model):

    company_profile_id = models.AutoField(primary_key=True)

    #One user to one institute
    company = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company_user')

    company_name = models.CharField(max_length=40, verbose_name='Company Name')

    bio = models.TextField(verbose_name='Bio')
    mission = models.TextField(verbose_name='Mission')
    vission = models.TextField(verbose_name='Vision')

    logo = models.ImageField(upload_to='Logos', verbose_name='Logo', default = 'instituteIc.png')
    logo_name = models.CharField(max_length=40, verbose_name='Logo Source',default = 'instituteIc.png')

    act = models.ImageField(upload_to='Activity', verbose_name='Activity Image', default = 'actIc.png')
    act_name = models.CharField(max_length=40, verbose_name='Activity Source',default = 'actIc.png')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name


class CompanyLocation(models.Model):

    company_location_id = models.AutoField(primary_key=True)

    #One user to one institute
    company = models.OneToOneField(User, on_delete=models.CASCADE)

    address = models.CharField(max_length=50, verbose_name='Address')
    country = models.CharField(max_length=20, verbose_name='Country')
    county = models.CharField(max_length=20, verbose_name='County')
    town = models.CharField(max_length=20, verbose_name='Town')

    latitude = models.CharField(max_length=20, verbose_name='Latitude')
    longitude = models.CharField(max_length=20, verbose_name='Longitude')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company.company_user.company_name


class CompanyCategory(models.Model):

    comp_cat_id = models.AutoField(primary_key=True)

    company = models.OneToOneField(CompanyProfile, on_delete=models.CASCADE)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company.company_name


#The job posted by the company

class JobLocation(models.Model):

    job_loc_id = models.AutoField(primary_key=True)

    job_loc_name = models.CharField(max_length=50, verbose_name='Job Location Name')

    job_location_decription = models.TextField(verbose_name='Job Location Description')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.job_loc_name



class JobLevel(models.Model):

    job_level_id = models.AutoField(primary_key=True)

    job_level_name = models.CharField(max_length=50, verbose_name='Job Location Name')

    job_level_decription = models.TextField(verbose_name='Job Location Description')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.job_level_name



class Job(models.Model):

    job_id = models.AutoField(primary_key=True)

    company = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='company_job') 

    job_location = models.ForeignKey(JobLocation, on_delete=models.CASCADE) 

    job_level = models.ForeignKey(JobLevel, on_delete=models.CASCADE) 

    job_name = models.CharField(max_length=50, verbose_name='Job Name')

    job_decr = RichTextField()

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.job_name


class JobApplicants(models.Model):

    job_app_id = models.AutoField(primary_key=True)

    company = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, verbose_name='Company') 

    job = models.OneToOneField(Job, on_delete=models.CASCADE,verbose_name='Job') 

    applicants = models.ManyToManyField(Student, blank=True,verbose_name='All Applicants', related_name='new_applicants')

    accepted = models.ManyToManyField(Student, blank=True,verbose_name='Accepted Applicants',related_name='accepted_applicants')

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.job.job_name


class StudentApplication(models.Model):

    app_id = models.AutoField(primary_key=True)

    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True) 

    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True)     

    status = models.BooleanField(default=False)

    #Create And Update date
    update = models.DateTimeField(auto_now=True)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.student.stud_name        