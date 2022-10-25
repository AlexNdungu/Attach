from ctypes import addressof
import re
from curses.ascii import US
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
#from pytz import country_names

from django.contrib.auth.decorators import login_required

from .decorators import unauthenticated_user,company_only


from .models import *

#Import settings
from Attach import settings

# Create your views here.

@unauthenticated_user
def signUp(request):
    return render(request, 'Company\Signup.html')

def createCompany(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #instituteForm = createInstituteForm()

        email = request.POST.get('email')
        pass1 = request.POST.get('pass1')
        pass2 = request.POST.get('pass2')

        #Now we create a user

        #Lets create user

        if(User.objects.filter(username=email).exists()):

            return JsonResponse({'Message':'Exist'})

        else:    
            if(pass1 == pass2):

                new_company = User.objects.create_user(username=email,email=email,password=pass1)    

                #Create a new company profile
                new_company_profile = CompanyProfile.objects.create(
                    company = new_company,
                    company_name = new_company.username
                )          

                #Now we create a location profile
                CompanyLocation.objects.create(
                    company = new_company,
                )         

                #Now we create a category instance
                CompanyCategory.objects.create(
                    company = new_company_profile
                )


            return JsonResponse({'Message':'New'})


#Company Profile
@login_required(login_url='allLog')
@company_only
def profile(request):
    return render(request ,'Company/Dashboard/profile.html')


def updateProfile(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        the_company = CompanyProfile.objects.get(company = request.user)

        #Company Name
        name = request.POST.get('name')
        #Compoany Bio
        bio = request.POST.get('bio')
        #Company Mission
        mission = request.POST.get('mission')
        #Comapny Vision
        vision = request.POST.get('vision')

        #Comapny Logo
        if request.FILES.get('logo') != None:

            logo = request.FILES.get('logo')

            logoname = request.POST.get('logoname')

        #The active image
        if request.FILES.get('active') != None:

            active = request.FILES.get('active')

            activename = request.POST.get('activename')


        #Now we update the profile
        the_company.company_name = name
        the_company.bio = bio
        the_company.mission = mission
        the_company.vission = vision

        #Now update the image
        if request.FILES.get('logo') != None:
            the_company.logo = logo
            the_company.logo_name = logoname

        if request.FILES.get('active') != None:
            the_company.act = active
            the_company.act_name = activename


        #Now we save the record
        the_company.save()

    return JsonResponse({'status':'updated'})   


@login_required(login_url='allLog')
@company_only
def location(request):

    context = {
        'google_map_api':settings.GOOGLE_API_KEY,
        'base_country':settings.BASE_COUNTRY
    }


    return render(request ,'Company/Dashboard/location.html',context)          


def currentLocation(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        company_location = CompanyLocation.objects.get(company = request.user)

        #Here i get the posted data

        address = request.POST.get('address')

        country = request.POST.get('country')

        county = request.POST.get('county')

        town = request.POST.get('town')

        latitude = request.POST.get('latitude')

        longitude = request.POST.get('longitude')

        #Now we update coumpnay location

        company_location.address = address

        company_location.country = country

        company_location.county = county

        company_location.town = town

        company_location.latitude = latitude

        company_location.longitude = longitude

        #Now we save the location

        company_location.save()


    return JsonResponse({'status':'updated'})