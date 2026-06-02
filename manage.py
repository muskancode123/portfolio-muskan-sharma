#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()


#    <script>
#   const BASE_URL = 'http://localhost:8000/contact/api';


#   async function add_details() {
#     const formData = {
#       name: document.getElementById('name').value,
#       email: document.getElementById('email').value,
#       message: document.getElementById('message').value
#     };

#     console.log("Sending form data:", formData);

#     try {
#       const response = await fetch(`${BASE_URL}/`, {
#         method: 'POST',
#         headers: { 'Content-Type': 'application/json' },
#         body: JSON.stringify(formData)
#       });

#       if (!response.ok) throw new Error("Failed to add contact");

#       alert("Thank You!");
#     } catch (error) {
#       alert("Error adding contact: " + error.message);
#     }
#   }
# </script>