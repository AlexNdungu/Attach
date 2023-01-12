from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from Institute.models import *
from .models import *
from Student.models import *
from Attach import settings
from Company.models import *

# Create your views here.

def Inherite(request):
    return render(request, 'Inherite/lecturer.html')

#Add lecturer
def lecturer(request):

    head = HeadLecturer.objects.get(lecturer = request.user)

    depart = Department.objects.get(head = head)

    lecs = Lecturer.objects.filter(department = depart).all()
    context = {
        'heads':lecs
    }

    return render(request,'Lecturer/Dashboard/addLec.html',context)    

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

#Course
def SeeCourse(request):

    dHead = HeadLecturer.objects.get(lecturer = request.user)

    the_department = Department.objects.get(head = dHead)

    courses = Course.objects.filter(department = the_department).all();

    context = {
        'departs':courses
    }

    return render(request, 'Lecturer/Dashboard/course.html',context)   

#Create Course
def createCourse(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        head = HeadLecturer.objects.get(lecturer = request.user)

        theinstitute = head.institute

        dep = Department.objects.get(head = head)

        name = request.POST.get('depart_name')
        dec = request.POST.get('depart_desc')
        #head = request.POST.get('head_id')

        #dep_head = HeadLecturer.objects.get(lec_id = head)

        newCourse = Course.objects.create(
            institute = theinstitute,
            department = dep,
            Course_name = name,
            course_desc = dec
        )

        pass_course = {
            'id': newCourse.Course_id,
            'name': newCourse.Course_name,
            'desc': newCourse.course_desc,
            'date': newCourse.created
        }

    return JsonResponse({'status':'Created','pass_head':pass_course})

#delete couse
def deleteCourse(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        courseid = request.POST.get('id')

        course = Course.objects.get(Course_id = courseid)

        course.delete()

    return JsonResponse({'status':'Delete'})    


def allocatedStudents(request):

    #Check if its head or lec
    #print(request.user.headlecturer)

    theLec = HeadConnect.objects.get(head = request.user.headlecturer)

    print(theLec.students.all)

    context = {
        'theLec':theLec,
    }

    return render(request, 'Lecturer/Dashboard/allocated.html',context)

def requestStudents(request):

    #Check if its head or lec
    #print(request.user.headlecturer)

    theLec = HeadConnect.objects.get(head = request.user.headlecturer)

    print(theLec.students.all)

    context = {
        'theLec':theLec,
    }

    return render(request, 'Lecturer/Dashboard/alrequest.html',context)  


#Now we approve a student
def approveStudent(request, pk):

    student = Student.objects.get(stud_id = pk)

    context = {
        'student':student
    }

    return render(request, 'Lecturer/Dashboard/approveStud.html',context)   


def approveStudNow(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #Get The student id
        stud_id = request.POST.get('stud_id')

        #Get the student
        the_stud = Student.objects.get(stud_id = stud_id)

        print(the_stud)

        head = request.user.headlecturer

        #Get the connection
        head_conn = HeadConnect.objects.get(head = head)

        #Add student to pending request
        head_conn.acc_students.add(the_stud)

        head_conn.students.remove(the_stud)

        head_conn.save()

        #Get the student connection
        stud_head_conn = StudentLec.objects.get(student = the_stud)

        #stud_head_conn.head = head

        stud_head_conn.approved = True

        #stud_head_conn.whom = 'head'

        stud_head_conn.save()

    return JsonResponse({'status':'Connected'}) 

#Students will send requests to the lecturer
def newRequest(request, pk):

    head = HeadLecturer.objects.get(lec_id = pk)

    connect_student = HeadConnect.objects.get(head = head)

    #Get Department
    depart = Department.objects.get(head = head)

    univ = head.institute

    #Student and their depatrtment 
    student = Student.objects.get(student = request.user)

    stud_dep = student.department

    stud_uni = student.institute

    #Is the student and lecturer in the same department

    same_dep = False

    if stud_dep == depart:

        same_dep = True

    elif stud_dep != depart:

        same_dep = False

    #Is the student and lecturer in the same school

    same_uni = False

    if stud_uni == univ:

        same_uni = True

    elif stud_uni != univ:

        same_uni = False  

    #Is there an existing connection 
    conn_stud_lec = StudentLec.objects.get(student = student)

    conn_status = conn_stud_lec.connected

    print(conn_status)

    context = {
        'head':head,
        'connect_student':connect_student,
        'same_dep':same_dep,
        'same_uni':same_uni,
        'conn_status':conn_status
    }

    return render(request,'Lecturer/Dashboard/sendReq.html',context)    


#Now we send connection request
def connectRequest(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #Get the student
        the_stud = Student.objects.get(student = request.user)

        #Get The head lecturer
        head_id = request.POST.get('head_id')

        print(the_stud)

        head = HeadLecturer.objects.get(lec_id = head_id)

        #Get the connection
        head_conn = HeadConnect.objects.get(head = head)

        #Add student to pending request
        head_conn.students.add(the_stud)

        head_conn.save()

        #Get the student connection
        stud_head_conn = StudentLec.objects.get(student = the_stud)

        stud_head_conn.head = head

        stud_head_conn.connected = True

        stud_head_conn.whom = 'head'

        stud_head_conn.save()

    return JsonResponse({'status':'Connect'})    


#The student map
def map(request):

    #The head lecturer

    head = HeadLecturer.objects.get(lecturer = request.user)

    connection = HeadConnect.objects.get(head = head)

    #create an empty list
    coordinates = []

    #print(connection.acc_students.all)

    for student in connection.acc_students.all():

        job_con = StudentApplication.objects.filter(student = student)

        if job_con.exists():

            for student_job in job_con:

                #print(student_job.student)
                
                if student_job.status == True:

                    #print(student_job.student.profile_image.url)

                    coordinate = [student_job.student.stud_name,student_job.job.company.company.companylocation.latitude,student_job.job.company.company.companylocation.longitude,student_job.student.profile_image.url,student_job.student.stud_id]

            #print(ind_loc.company.companyprofile.logo.url)
            #print(ind_loc.company.companyprofile.company_name)

            coordinates.append(coordinate)

    context = {
        'google_map_api':settings.GOOGLE_API_KEY,
        'base_country':settings.BASE_COUNTRY,
        'coordinates':coordinates
    }

    return render(request,'Lecturer/Dashboard/map.html',context)    

#visit student
def visit(request, pk):

    student = Student.objects.get(stud_id = pk)

    

    context = {
        'google_map_api':settings.GOOGLE_API_KEY,
        'base_country':settings.BASE_COUNTRY,
        #'coordinates':coordinates
    }

    return render(request,'Lecturer/Dashboard/visit.html',context)     