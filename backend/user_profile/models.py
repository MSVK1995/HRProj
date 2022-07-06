from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models.signals import post_save




class UserProfileManager(BaseUserManager):
    """Manager for user profile"""

    def create_user(self, email, password=None):
        """Create a new user profile"""
        if not email:
            raise ValueError('Email not provided. User must have an email address')
        
        email = self.normalize_email(email)
        username = email.split('@')[0]
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create and save a new superuser"""
        su_user = self.create_user(email, password)

        su_user.is_superuser = True
        su_user.save(using=self._db)

        return su_user



class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""
    email = models.EmailField(max_length=200, unique=True)
    username = models.CharField(max_length=200, default="")
    date_joined = models.DateTimeField(verbose_name="Date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['name']

    def __str__(self):
        """Return string representation of the user"""
        return self.email
