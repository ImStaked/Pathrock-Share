# Python script to send an email alert
# Usage python3 email.py

import smtplib 
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.headerregistry import Address
from email.message import EmailMessage

from_email = ""
password = ""
to_email = ''

# The server we use to send emails in our case it will be gmail but every email provider has a different smtp 
# and port is also provided by the email provider.
smtp = "" 
port = 587
# This will start our email server
server = smtplib.SMTP(smtp,port)
# Starting the server
server.starttls()
# Now we need to login
server.login(from_email,password)

# Now we use the MIME module to structure our message.
msg = MIMEMultipart()
msg['From'] = from_email
msg['To'] = to_email
# Make sure you add a new line in the subject
msg['Subject'] = "Alert - Arthera Node\n"
# Make sure you also add new lines to your body
body = "Arthera Node is reporting a problem\n"
# and then attach that body furthermore you can also send html content.
msg.attach(MIMEText(body, 'plain'))

message = msg.as_string()

server.sendmail(from_email,to_email,message)

# lastly quit the server
server.quit()
