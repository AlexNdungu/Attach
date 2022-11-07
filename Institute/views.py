from curses.ascii import US
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.http import JsonResponse
from .forms import *
from django.conf import settings

from .models import *

from django.contrib.auth import login, authenticate, logout

from .decorators import *

from django.contrib.auth.decorators import login_required

#Lets get the groups
from django.contrib.auth.models import Group

#Import 


# Create your views here.


#Here The users will all sign in
@unauthenticated_user
def allSign(request):

    return render(request, 'All/log.html')

def loginNow(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #instituteForm = createInstituteForm()

        email = request.POST.get('email')
        pass1 = request.POST.get('pass1')

        #Now we create a user

        #Lets create user

        if(User.objects.filter(username=email).exists()):

            user1 = authenticate(username=email, password=pass1)

            if user1 is not None:
                login(request, user1)
                return JsonResponse({'Message':'Logged'})
            
            else: 

                return JsonResponse({'Message':'Incorrect'})

        else:    
            
            return JsonResponse({'Message':'Not'})


@unauthenticated_user
def signUp(request):

    return render(request, 'Institute\Signup.html')

def createInstitute(request):

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

                institute = User.objects.create_user(username=email,email=email,password=pass1)   

                #Now we add the institute to the School Group
                school = Group.objects.get(name='School')     
                school.user_set.add(institute)


                #Now we create an account 
                InstituteProfile.objects.create(
                    institute = institute,
                    institute_name = institute.email
                )             

                #Now we Create a location account
                InstituteLocation.objects.create(
                    institute = institute
                ) 


            return JsonResponse({'Message':'New'})      



#Here is the institute dashboard
@login_required(login_url='allLog')
#@institute_only
def dash(request):
    return render(request, 'Inherite/institute.html')

@login_required(login_url='allLog')
#@institute_only
def dashboard(request):
    return render(request, 'Institute/Dashboard/dash.html') 

@login_required(login_url='allLog')
#@institute_only
def profile(request):
    return render(request ,'Institute/Dashboard/profile.html')

#Update profile
def updateProfile(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        the_institute = InstituteProfile.objects.get(institute = request.user)

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
        the_institute.institute_name = name
        the_institute.bio = bio
        the_institute.mission = mission
        the_institute.vission = vision

        #Now update the image
        if request.FILES.get('logo') != None:
            the_institute.logo = logo
            the_institute.logo_name = logoname

        if request.FILES.get('active') != None:
            the_institute.act = active
            the_institute.act_name = activename


        #Now we save the record
        the_institute.save()

    return JsonResponse({'status':'updated'})   

@login_required(login_url='allLog')
#@institute_only
def location(request):

    context = {
        'google_map_api':settings.GOOGLE_API_KEY,
        'base_country':settings.BASE_COUNTRY
    }

    return render(request ,'Institute/Dashboard/location.html',context)    

#Update location
def currentLocation(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        institute_location = InstituteLocation.objects.get(institute = request.user)

        #Here i get the posted data

        address = request.POST.get('address')

        country = request.POST.get('country')

        county = request.POST.get('county')

        town = request.POST.get('town')

        latitude = request.POST.get('latitude')

        longitude = request.POST.get('longitude')

        #Now we update coumpnay location

        institute_location.address = address

        institute_location.country = country

        institute_location.county = county

        institute_location.town = town

        institute_location.latitude = latitude

        institute_location.longitude = longitude

        #Now we save the location

        institute_location.save()


    return JsonResponse({'status':'updated'})          

@login_required(login_url='allLog')
#@institute_only
def department(request):
    return render(request, 'Institute/Dashboard/department.html')     

@login_required(login_url='allLog')
#@institute_only
def heads(request):
    return render(request, 'Institute/Dashboard/heads.html')

@login_required(login_url='allLog')
#@institute_only
def lectures(request):
    return render(request, 'Institute/Dashboard/lecture.html')

@login_required(login_url='allLog')
#@institute_only
def students(request):
    return render(request, 'Institute/Dashboard/students.html')    

@login_required(login_url='allLog')
#@institute_only
def activeStudents(request):
    return render(request, 'Institute/Dashboard/actives.html')    
    
@login_required(login_url='allLog')
#@institute_only
def geocode(request):

    context = {
	"google_api_key": settings.GOOGLE_API_KEY,
	"base_country": settings.BASE_COUNTRY,
    }

    return render(request, 'Institute/geo.html',context)            