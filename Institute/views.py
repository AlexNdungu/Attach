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

@login_required(login_url='allLog')
#@institute_only
def location(request):
    return render(request ,'Institute/Dashboard/location.html')          

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