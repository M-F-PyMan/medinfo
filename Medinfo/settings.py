from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent


# -------------------------
#  SECURITY
# -------------------------
SECRET_KEY = 'django-insecure-ucdceisg1xpm*t$zok)*xhyv0__$3v!e6@=l@(y3i6*(v-1h!l'
DEBUG = True

ALLOWED_HOSTS = ["*"]

AUTH_USER_MODEL = 'accounts.User'


# -------------------------
#  INSTALLED APPS
# -------------------------
INSTALLED_APPS = [
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'azbankgateways',

    # Our apps
    'accounts.apps.AccountsConfig',
    'payments.apps.PaymentsConfig',
    'courses.apps.CoursesConfig',
    'reviews.apps.ReviewsConfig',
    'coupons.apps.CouponsConfig',
    'notifications.apps.NotificationsConfig',
    'payout.apps.PayoutConfig',
    'instructor.apps.InstructorConfig',
    'messaging.apps.MessagingConfig',
    'wishlist.apps.WishlistConfig',
    'certificates.apps.CertificatesConfig',
    'wallet.apps.WalletConfig',
    'blog.apps.BlogConfig',
    'core_settings.apps.CoreSettingsConfig',

]


# -------------------------
#  MIDDLEWARE
# -------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    # CORS
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# -------------------------
#  CORS
# -------------------------
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True


# -------------------------
#  REST FRAMEWORK + JWT
# -------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # امنیت بهتر
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}


# -------------------------
#  URLS / WSGI
# -------------------------
ROOT_URLCONF = 'Medinfo.urls'
WSGI_APPLICATION = 'Medinfo.wsgi.application'


# -------------------------
#  TEMPLATES
# -------------------------


# مسیر درست ریشهٔ پروژه
BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',   # مسیر درست پوشهٔ templates
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]



# -------------------------
#  DATABASE
# -------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# -------------------------
#  PASSWORD VALIDATION
# -------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# -------------------------
#  INTERNATIONALIZATION
# -------------------------
LANGUAGE_CODE = 'fa-ir'
TIME_ZONE = 'Asia/Tehran'
USE_I18N = True
USE_TZ = True


# -------------------------
#  STATIC & MEDIA
# -------------------------
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# -------------------------
#  DEFAULT PRIMARY KEY
# -------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# -------------------------
#  PAYMENT GATEWAY SETTINGS
# -------------------------
AZ_IRANIAN_BANK_GATEWAYS = {
    "GATEWAYS": {
        "ZARINPAL": {
            "MERCHANT_CODE": "<YOUR MERCHANT CODE>",
            "SANDBOX": 1,  # فعال برای تست
        },
    },
    "DEFAULT": "ZARINPAL",
    "CURRENCY": "IRR",
    "BANK_TIMEOUT": 5,
    "TRACKING_CODE_QUERY_PARAM": "tc",
    "TRACKING_CODE_LENGTH": 16,
    "IS_SAFE_GET_GATEWAY_PAYMENT": True,
}
