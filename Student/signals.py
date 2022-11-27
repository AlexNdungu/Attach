from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Student

@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, *args, **kwargs):
    #print(sender)
    #print(instance)
    #print(created)

    #if created:
    if instance.social_auth.exists():

        user_is = Student.objects.filter(student = instance)

        print(user_is)

        if user_is.exists():

            print('Student already exists')

        else:    

            new_student = Student.objects.create(student = instance,stud_name = instance)

    else:

        print('not')    