from django.shortcuts import render

from Company.models import *

from django.db.models import Count

from Attach import settings



# Create your views here.

def signUp(request):
    return render(request, 'Student\Signup.html')

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

        print(one_company.company.company)

        ind_loc_user = User.objects.filter(username = one_company.company.company)

        #user_profile = CompanyProfile.objects.filter(company_name = one_company)

        #new_user = User.objects.filter(username = user_profile.)

        #print(ind_loc_user.username)

        if ind_loc_user:

            ind_loc = CompanyLocation.objects.get(company__in = ind_loc_user)

            #append the latitudes to the list of latitudes
            #latitudes.append(ind_loc.latitude)
            #coordinate = [ind_loc.company.companyprofile.company_name,ind_loc.latitude,ind_loc.longitude]
            coordinate = [ind_loc.company.companyprofile.company_name,ind_loc.latitude,ind_loc.longitude,ind_loc.company.companyprofile.logo.url]

            #print(ind_loc.company.companyprofile.logo.url)


            coordinates.append(coordinate)

            #print(ind_loc.latitude)

    #print(coordinates)

    context = {
        'category':this_categ,
        'coordinates':coordinates,
        'google_map_api':settings.GOOGLE_API_KEY,
        'base_country':settings.BASE_COUNTRY
    }

    return render(request, 'Student\Dashboard\category.html',context)


#Opportunities section

def opport(request):
    return render(request,'Student\Dashboard\opportunity.html')   


#The all company opportunities
def allOpps(request):
    return render(request,'Student/Dashboard/campopps.html')

#The individual opportunity 
def indopp(request):
    return render(request, 'Student/Dashboard/indopp.html')   


#Applied Attachments
def applied(request):
    return render(request,'Student/Dashboard/applied.html')     