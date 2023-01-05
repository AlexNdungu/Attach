from django.shortcuts import render

from Company.models import *

from django.db.models import Count

from Attach import settings

from django.contrib.auth.models import User

from Institute.models import *

from django.http import JsonResponse

from Lecturer.models import *

from .models import *

# Create your views here.

def signUp(request):
    return render(request, 'Student\Signup.html')


#See student profile
def seeProfile(request, pk):

    student = Student.objects.get(stud_id = pk)

    context = {
        'student':student
    }

    return render(request, 'Student\Dashboard\seePro.html',context)

#Profile
def profile(request):

    #Select all universities
    schools = InstituteProfile.objects.all()

    context = {
        'schools':schools
    }

    return render(request,'Student\Dashboard\profile.html',context )


#Update the profile
def updateProfile(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        the_student = request.user

        new_student = Student.objects.get(student = the_student)

        #Personal info
        fullName = request.POST.get('name')
        new_student.stud_name = fullName

        phone = request.POST.get('phone')
        new_student.stud_phone = phone
        #Education Info
        #University
        uniID = request.POST.get('uniID')

        the_uni = InstituteProfile.objects.get(institute_profile_id = uniID)
        new_student.institute = the_uni

        #Department
        depID = request.POST.get('depID')

        the_dep = Department.objects.get(dep_id = depID)
        new_student.department = the_dep

        #Course
        courseID = request.POST.get('courseID')

        the_course = Course.objects.get(Course_id = courseID)
        new_student.course = the_course

        #Images
        #Profile
        if request.FILES.get('profileIMG') != None:

            profilePicture = request.FILES.get('profileIMG')
            new_student.profile_image = profilePicture

            prof_name = request.POST.get('prof_name')
            new_student.profile_image_name = prof_name

        #Back Image
        if request.FILES.get('backIMG') != None:

            backPicture = request.FILES.get('backIMG')    
            new_student.act = backPicture

            back_name = request.POST.get('back_name')
            new_student.act_name = back_name

        #Files
        #CV
        if request.FILES.get('cv') != None:

            cv = request.FILES.get('cv')
            new_student.cv = cv

            cv_name = request.POST.get('cv_name')
            new_student.cv_name = cv_name

        #Recommend
        if request.FILES.get('recommend') != None:

            recommend = request.FILES.get('recommend')  
            new_student.rec = recommend

            recommend_name = request.POST.get('rec_name')
            new_student.rec_name = recommend_name

        
        #Now we update the profile
        new_student.save()

    return JsonResponse({'status':'success'})



def getDeps(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        school_id = request.POST.get('id')

        school = InstituteProfile.objects.get(institute_profile_id = school_id)

        deps = Department.objects.filter(institute = school).all()

    return JsonResponse({'deps':list(deps.values())}) 


def getCourses(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        dep_id = request.POST.get('id')

        dep = Department.objects.get(dep_id = dep_id)

        courses = Course.objects.filter(department = dep).all()

    return JsonResponse({'deps':list(courses.values())}) 

#Student Dashboard

def dash(request):
    return render(request, 'Inherite\student.html')    


def categories(request):

    #Here we get all the categories
    #categories = Category.objects.all()
    categories = Category.objects.annotate(number_of_companies=Count('companycategory'))

    context = {
        'categories':categories
    }

    return render(request, 'Student\Dashboard\categories.html',context)


def category(request, pk):

    #Get the category maching the id
    this_categ = Category.objects.get(cate_id = pk)

    all_companies = CompanyCategory.objects.filter(category = this_categ)

    #print(all_companies)

    #create an empty list
    coordinates = []

    for one_company in all_companies:

        #print(one_company.company.company)

        ind_loc_user = User.objects.filter(username = one_company.company.company)

        #print(ind_loc_user)

        #user_profile = CompanyProfile.objects.filter(company_name = one_company)

        #new_user = User.objects.filter(username = user_profile.)

        #print(ind_loc_user.username)

        if ind_loc_user:

            ind_loc = CompanyLocation.objects.get(company__in = ind_loc_user)

            #print(ind_loc.company.company_user)

            #company_prof = CompanyProfile.objects.get()

            #append the latitudes to the list of latitudes
            #latitudes.append(ind_loc.latitude)
            #coordinate = [ind_loc.company.companyprofile.company_name,ind_loc.latitude,ind_loc.longitude]

            coordinate = [ind_loc.company.company_user.company_name,ind_loc.latitude,ind_loc.longitude,ind_loc.company.company_user.logo.url]

            #print(ind_loc.company.companyprofile.logo.url)
            #print(ind_loc.company.companyprofile.company_name)

            coordinates.append(coordinate)

            #print(ind_loc.latitude)

    print(coordinates)

    context = {
        'category':this_categ,
        'coordinates':coordinates,
        'google_map_api':settings.GOOGLE_API_KEY,
        'base_country':settings.BASE_COUNTRY
    }

    return render(request, 'Student\Dashboard\category.html',context)


#Opportunities section

def opport(request):

    companies = CompanyProfile.objects.all()

    new_companies = []

    print(companies)

    for company in companies:

        if company.company_job.exists():

            new_companies.append(company)

     
    print(new_companies) 

    context = {
        'companys': new_companies
    }

    return render(request,'Student\Dashboard\opportunity.html',context)   


#The all company opportunities
def allOpps(request, pk):

    company = CompanyProfile.objects.get(company_profile_id = pk)

    #print(company.company)

    company_user = company.company.username

    user_now_company = User.objects.get(username = company_user)

    location = CompanyLocation.objects.get(company = user_now_company)

    opports = Job.objects.filter(company = company)

    num_ops = opports.count()

    print(location)

    context = {
        'location':location,
        'company':company,
        'num_ops':num_ops,
        'opports':opports
    }

    return render(request,'Student/Dashboard/campopps.html',context)

#The individual opportunity 
def indopp(request, pk):

    job = Job.objects.get(job_id = pk)

    profile_company = job.company.company.username

    #print(profile_company)

    company_user = User.objects.get(username = profile_company)

    location = CompanyLocation.objects.get(company = company_user)

    print(location)

    #Check if the sudent has applied
    this_student_apply = StudentApplication.objects.filter(student = request.user.student, job = job).exists()

    print(this_student_apply)

    context = {
        'location':location,
        'job':job,
        'this_student_apply':this_student_apply
    }

    return render(request, 'Student/Dashboard/indopp.html',context)   


#job apply
def applyJob(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        job_id = request.POST.get('jobID')

        #Now we add this student to the applied section
        student = request.user.student

        #Add student to applied
        this_job = Job.objects.get(job_id = job_id)

        this_job_application = JobApplicants.objects.get(job = this_job)

        this_job_application.applicants.add(student)

        #Now we create an application for this student
        StudentApplication.objects.create(
            student = student,
            job = this_job
        )

    return JsonResponse({'status':'Success'})

#Applied Attachments
def applied(request):

    my_apps = StudentApplication.objects.filter(student = request.user.student).all()

    context = {
        'my_apps':my_apps
    }

    return render(request,'Student/Dashboard/applied.html',context)     