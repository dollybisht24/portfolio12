# 🚀 EmailJS Setup - Get Your Contact Form Working in 5 Minutes!

## ⚠️ Current Status
Your contact form shows **"Public Key is invalid"** because EmailJS credentials haven't been configured yet.

Follow these steps to fix it:

---

## 📋 STEP-BY-STEP SETUP GUIDE

### **STEP 1: Create EmailJS Account** (2 minutes)

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up Free"**
3. Sign up using your **Gmail account**
4. **Verify your email** (check inbox/spam)

✅ You'll be redirected to the EmailJS Dashboard

---

### **STEP 2: Connect Gmail Service** (1 minute)

1. In the dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"** from the list
4. Click **"Connect Account"**
5. Sign in with your Gmail and **allow access**
6. ✅ **COPY the Service ID** (looks like: `service_abc123`)

**📝 Save this:** Service ID = `service_abc123`

---

### **STEP 3: Create Email Template** (2 minutes)

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Fill in the template:

**Template Name:**
```
Portfolio Contact Form
```

**Subject Line:**
```
New Message from {{from_name}} - {{subject}}
```

**Email Body (Content):**
```
You have a new message from your portfolio website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM: {{from_name}}
EMAIL: {{from_email}}
SUBJECT: {{subject}}

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to: {{from_email}}

This message was sent from your portfolio contact form.
```

4. **Set "To Email"** to **YOUR Gmail address** (where you want to receive messages)
5. Click **"Save"**
6. ✅ **COPY the Template ID** (looks like: `template_xyz789`)

**📝 Save this:** Template ID = `template_xyz789`

---

### **STEP 4: Get Your Public Key** (30 seconds)

1. Click **"Account"** (left sidebar)
2. Click **"General"** tab
3. Find the **"Public Key"** section
4. ✅ **COPY the Public Key** (looks like: `user_AbCdEfGhIjKlMnOp`)

**📝 Save this:** Public Key = `user_AbCdEfGhIjKlMnOp`

---

### **STEP 5: Update Your Code** (1 minute)

Open the file: **`script-new.js`**

Find **lines 233-237** and replace:

**BEFORE:**
```javascript
this.emailConfig = {
    publicKey: 'YOUR_PUBLIC_KEY',      
    serviceID: 'YOUR_SERVICE_ID',       
    templateID: 'YOUR_TEMPLATE_ID'      
};
```

**AFTER:** (Use your actual credentials)
```javascript
this.emailConfig = {
    publicKey: 'user_AbCdEfGhIjKlMnOp',      // Your Public Key
    serviceID: 'service_abc123',              // Your Service ID
    templateID: 'template_xyz789'             // Your Template ID
};
```

✅ Save the file!

---

### **STEP 6: Deploy to Production** (1 minute)

Run these commands in your terminal:

```bash
git add script-new.js
git commit -m "Configure EmailJS credentials"
git push origin main
```

**Wait 1-2 minutes** for Netlify to deploy.

---

### **STEP 7: Test Your Form!** 🎉

1. Visit: **https://portfiolo122.netlify.app/#contact**
2. Fill out the form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Subject:** Testing Contact Form
   - **Message:** This is a test message from my portfolio!

3. Click **"Send Message"**
4. You should see: **"✅ Message sent successfully!"**
5. **Check your Gmail inbox** - you'll receive the email within seconds!

---

## ✅ What You Get

### **Form Validation:**
- ✅ All fields required
- ✅ Email format validation
- ✅ Minimum length checks (Name: 2, Subject: 3, Message: 10)
- ✅ Real-time error messages

### **User Experience:**
- ✅ "Sending..." loading state with spinner
- ✅ Success message after sending
- ✅ Form auto-clears after success
- ✅ Detailed error messages if something fails
- ✅ No page reload on submit

### **Professional UI:**
- ✅ Red borders for invalid fields
- ✅ Green borders for valid fields
- ✅ Error messages below each field
- ✅ Smooth animations

### **Production Ready:**
- ✅ Works on live website (not just localhost)
- ✅ No backend server needed
- ✅ Free: 200 emails/month
- ✅ Reliable Gmail delivery

---

## 🔍 Example Configuration

Here's what your configuration should look like (with real values):

```javascript
this.emailConfig = {
    publicKey: 'JKh8Xw9mN2pLqR4s',        // From Account → General
    serviceID: 'service_portfolio_gmail',  // From Email Services
    templateID: 'template_contact_form'    // From Email Templates
};
```

---

## 🐛 Troubleshooting

### Error: "Public Key is invalid"
**Solution:**
- ✓ Make sure you copied the **Public Key** (not Private Key)
- ✓ Check for extra spaces or quotes
- ✓ Verify it's from: Account → General → Public Key

### Error: "Service ID is invalid"
**Solution:**
- ✓ Go to Dashboard → Email Services
- ✓ Copy the exact Service ID
- ✓ Make sure Gmail is connected and active

### Error: "Template ID is invalid"
**Solution:**
- ✓ Go to Dashboard → Email Templates
- ✓ Make sure template is saved
- ✓ Copy the exact Template ID

### Not receiving emails
**Solution:**
- ✓ Check Gmail spam folder
- ✓ Verify "To Email" in template is your Gmail
- ✓ Check EmailJS Dashboard → Email Logs

### Form shows warning about configuration
**Solution:**
- ✓ You haven't replaced the placeholder values yet
- ✓ Follow Step 5 above to update the credentials

---

## 📊 Monitor Your Emails

### View All Form Submissions:
1. Go to: **https://dashboard.emailjs.com/**
2. Click **"Email Logs"**
3. See all sent emails, delivery status, timestamps

### Email Quota:
- **Free Plan:** 200 emails/month
- View current usage in Dashboard

---

## 🎯 Quick Reference Card

**EmailJS Dashboard:** https://dashboard.emailjs.com/

**What You Need:**
1. ✅ Public Key (from Account → General)
2. ✅ Service ID (from Email Services)
3. ✅ Template ID (from Email Templates)

**Where to Update:**
- File: `script-new.js`
- Lines: 233-237

**Template Variables:**
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message

---

## 💡 Pro Tips

1. **Test First:** Use a test email before going live
2. **Check Spam:** First email might go to spam
3. **Save Logs:** EmailJS keeps logs for 30 days
4. **Backup Plan:** Add your email in the error message for direct contact

---

## 🎉 You're Done!

After completing these steps, your contact form will:
- ✅ Send emails directly to your Gmail
- ✅ Show professional validation
- ✅ Work perfectly in production
- ✅ Handle 200 messages/month for free

**Need help?** Check the console (F12) for detailed error messages.

---

**Last Updated:** December 24, 2025
**Status:** Ready for Production ✅
