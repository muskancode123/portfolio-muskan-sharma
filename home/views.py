import json
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Project, ContactMessage


def get_projects(request):
    """Return all projects as JSON for React frontend."""
    projects = list(Project.objects.all().values(
        'id', 'title', 'description', 'tech_stack', 'github_url', 'demo_url', 'order'
    ))
    return JsonResponse(projects, safe=False)


@csrf_exempt
@require_http_methods(["POST"])
def contact(request):
    """Save contact form message to database."""
    try:
        data = json.loads(request.body)

        name    = data.get('name', '').strip()
        email   = data.get('email', '').strip()
        message = data.get('message', '').strip()

        # Check empty fields
        if not name or not email or not message:
            return JsonResponse(
                {"error": "All fields are required."},
                status=400
            )

        # Proper email format validation using regex
        email_regex = r'^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return JsonResponse(
                {"error": "Please enter a valid email address (e.g. name@example.com)."},
                status=400
            )

        ContactMessage.objects.create(name=name, email=email, message=message)
        return JsonResponse({"success": "Message sent successfully!"}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid data sent."}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)