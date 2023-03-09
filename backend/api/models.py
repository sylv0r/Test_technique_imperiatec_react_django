from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


class Arrival(models.Model):
    user_name = models.CharField(max_length=100)
    arrival_date = models.DateField()
    arrival_time = models.TimeField()
    # d'autres champs pour le modèle Arrival


class MyUserManager(BaseUserManager):
    def create_user(self,user, password):

        user = self.create_user(
            password=password,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user, password):
        user = self.model(
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()




    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin



