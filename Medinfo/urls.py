from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/accounts/', include('accounts.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/coupons/', include('coupons.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/payout/', include('payout.urls')),
    path('api/instructor/', include('instructor.urls')),
    path('api/messaging/', include('messaging.urls')),
    path('api/wishlist/', include('wishlist.urls')),
    path('api/certificates/', include('certificates.urls')),
# Public HTML pages
    path('', include('certificates.public_urls')),
]

# Media & Static (development only)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
