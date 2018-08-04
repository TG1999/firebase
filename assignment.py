import smtplib
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
userid=sys.argv[2]
username=sys.argv[1]
fromaddr = sys.argv[4]
msg = MIMEMultipart() 
msg['From'] = fromaddr 
msg['To'] = userid
msg['Subject'] = "SET MY TEST"
body = 'Dear ' +username+ ' Welcome to our app'
    
msg.attach(MIMEText(body, 'plain'))
    
s = smtplib.SMTP('smtp.gmail.com', 587)
    
s.starttls()
password=sys.argv[3]

s.login(fromaddr,password)
    
text = msg.as_string()
    
s.sendmail(fromaddr,userid, text)
    
s.quit()
