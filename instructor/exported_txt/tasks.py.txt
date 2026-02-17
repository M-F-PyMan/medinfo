import os
import subprocess
from django.conf import settings
from celery import shared_task
from django.core.files import File
from django.core.files.storage import default_storage

from courses.models import Lesson


@shared_task
def process_lesson_video_task(lesson_id, local_path):
    """
    - گرفتن duration
    - ساخت thumbnail
    - (اختیاری) ساخت کیفیت‌های مختلف
    """
    lesson = Lesson.objects.filter(id=lesson_id).first()
    if not lesson:
        return

    # مثال: گرفتن duration با ffprobe
    try:
        result = subprocess.run(
            [
                "ffprobe",
                "-v", "error",
                "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                local_path,
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        duration = float(result.stdout.strip())
        lesson.duration = int(duration)
    except Exception:
        pass

    # مثال: ساخت thumbnail در ثانیه 3
    thumb_dir = os.path.join(settings.MEDIA_ROOT, "course_thumbs")
    os.makedirs(thumb_dir, exist_ok=True)
    thumb_path = os.path.join(thumb_dir, f"lesson_{lesson.id}.jpg")

    try:
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-ss", "3",
                "-i", local_path,
                "-vframes", "1",
                "-q:v", "2",
                thumb_path,
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        # اگر مدل Lesson فیلد thumbnail دارد:
        if hasattr(lesson, "thumbnail"):
            with open(thumb_path, "rb") as f:
                lesson.thumbnail.save(f"lesson_{lesson.id}.jpg", File(f), save=False)
    except Exception:
        pass

    lesson.save()


@shared_task
def upload_lesson_video_to_s3_task(lesson_id, local_path, remote_path):
    """
    اگر default_storage به S3 وصل باشد، این تسک فایل را به S3 می‌فرستد
    و بعد از موفقیت، local file را پاک می‌کند.
    """
    lesson = Lesson.objects.filter(id=lesson_id).first()
    if not lesson:
        return

    # آپلود به استوریج (مثلاً S3)
    with open(local_path, "rb") as f:
        stored_path = default_storage.save(remote_path, File(f))

    # ست کردن فیلد فایل روی استوریج ریموت
    lesson.video_file.name = stored_path
    lesson.save()

    # پاک کردن فایل لوکال
    if os.path.exists(local_path):
        os.remove(local_path)
