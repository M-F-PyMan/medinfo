from .models import Notification



def create_notification(user, type_, title, message, target_url=None):
    if not user:
        return
    Notification.objects.create(
        user=user,
        type=type_,
        title=title,
        message=message,
        target_url=target_url,
    )

