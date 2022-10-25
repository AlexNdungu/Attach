from django.db import models
from django.contrib.auth.models import User


#Company categories

class Category(models.Model):

    cate_id = models.AutoField(primary_key=True)

    cate_name = models.CharField(max_length=40, verbose_name='Category Name')

    cate_description = models.TextField(verbose_name='Category Description')

    def __str__(self):
        return self.cate_name


#Company Profile
class CompanyProfile(models.Model):

    company_profile_id = models.AutoField(primary_key=True)

    #One user to one institute
    company = models.OneToOneField(User, on_delete=models.CASCADE)

    company_name = models.CharField(max_length=40, verbose_name='Company Name')

    bio = models.TextField(verbose_name='Bio')
    mission = models.TextField(verbose_name='Mission')
    vission = models.TextField(verbose_name='Vision')

    logo = models.ImageField(upload_to='Logos', verbose_name='Logo', default = 'instituteIc.png')
    logo_name = models.CharField(max_length=40, verbose_name='Logo Source',default = 'instituteIc.png')

    act = models.ImageField(upload_to='Activity', verbose_name='Activity Image', default = 'actIc.png')
    act_name = models.CharField(max_length=40, verbose_name='Activity Source',default = 'actIc.png')

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

    def __str__(self):
        return self.company.companyprofile.company_name


class CompanyCategory(models.Model):

    comp_cat_id = models.AutoField(primary_key=True)

    company = models.OneToOneField(CompanyProfile, on_delete=models.CASCADE)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.company.company_name