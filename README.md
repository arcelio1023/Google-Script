# GMAIL Trash Removal -- Google-Script
# Gmail Trash removal  

Gmail makes it impossible to remove unwanted emails from the trash container until 30 days has expired.  
# Overview  
This Google Apps Script automates the process of permanently deleting emails from the Gmail Trash folder. The script utilizes the Gmail API to interact with email threads and messages, allowing for the removal of specified emails.
# Features
    Configuration: Easily customize the script behavior through variables at the beginning of the script:
       mymail: Your Gmail email address.
       mylabel: LABEL_TRASH, // The label to target (e.g., "trash")
       permanentlyRemoveMyLabel: Set to true if you want to permanently remove the label; otherwise, set to false.
    Logging: The script logs detailed information during execution, providing insights into the processed threads and any encountered errors.
# Problem
The only time Gmail automatically deletes an email is when it’s been labeled as Trash for 30 days. Gmail manages emails with a system of labels applied to each message. Inbox is a label, and so is Trash.
# Solution
This script solves this problem by allowing you to set the trigger on Google Apps Scripts to auto delete everything without having to wait 30 days. For example, you can set the script to auto delete every hour.
# Instructions
    Open the script in the Google Apps Script Editor.  
    Copy and paste the script.  
    Customize the config object with your Gmail account information and desired settings:  
  
    const config = {
      mymail: "your_email@gmail.com", // Your Gmail email address
      mylabel: LABEL_TRASH, // The label to target (e.g., "trash")
      permanentlyRemoveMyLabel: true, // Set to true for permanent removal, false otherwise
    };
# Important Notes
  If you run the script as-is, it will error out. Follow the provided instructions to set up the Gmail API and triggers.
  
  Setup Gmail API and Triggers
  
    Locate Services and click +Add a service.  
    Scroll down to Gmail API and click Add to turn it on.  
    Go back to your script screen and click on the menu Triggers.  
    Navigate to Current project's triggers and click on + Add Trigger  
    Set a trigger to run the script at a desired time interval (e.g., every minute/hour) for automated trash emptying.  
# Important Notes
You can delete from IN:TRASH, IN:SPAM, or any other label you want. The deletion is final, and you cannot recover any of the emails.

# Contribution
Any feedback is appreciated. Any projects I could help with let me know.




