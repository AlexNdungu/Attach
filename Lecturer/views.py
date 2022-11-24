from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from Institute.models import *
from .models import *


# Create your views here.

def Inherite(request):
    return render(request, 'Inherite/lecturer.html')

#Add lecturer
def lecturer(request):
    return render(request,'Lecturer/Dashboard/addLec.html')    

def createLec(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        email = request.POST.get('email')
        pass1 = request.POST.get('pass1')
        pass2 = request.POST.get('pass2')

        if(User.objects.filter(username=email).exists()):

            return JsonResponse({'Message':'Exist'})

        else:    
            if(pass1 == pass2):

                lec = User.objects.create_user(username=email,email=email,password=pass1)   

                #institute = InstituteProfile.objects.get(institute = request.user)

                #Get head
                head = HeadLecturer.objects.get(lecturer = request.user)

                institute = head.institute

                print(institute)

                depart = Department.objects.get(head = head)

                #Now we add the institute to the School Group
                #hleac = Group.objects.get(name='HLecturer')   
                lecGroup = Group.objects.get(name='Lecturer') 

                #hleac.user_set.add(head)
                lecGroup.user_set.add(lec)


                #Now we create an account 
                createdLec = Lecturer.objects.create(
                    lecturer = lec,
                    department = depart,
                    institute = institute,
                    lec_name = lec.email
                )        

                createdLec.profile_url = createdLec.profile_image.url
                createdLec.act_url = createdLec.act.url    
                createdLec.save() 
     

                NewLec = {
                    'id':createdLec.lecturer.username,
                    'name':createdLec.lec_name,
                    'profile':createdLec.profile_image.url
                }

            return JsonResponse({'status':'created','NewHead':NewLec}) 


#Now we delete the head
def deleteHead(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        lecId = request.POST.get('id')

        #Get the Head with this id
        theLec = User.objects.get(username = lecId)

        theLec.delete()

    return JsonResponse({'Message':'Delete'})    