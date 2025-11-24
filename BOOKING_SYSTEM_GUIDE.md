# Access Health Booking System - Usage Guide

## Table of Contents
1. [Overview](#overview)
2. [Initial Setup](#initial-setup)
3. [Admin Authentication](#admin-authentication)
4. [Managing Practitioners](#managing-practitioners)
5. [Creating Bookings](#creating-bookings)
6. [Managing Bookings](#managing-bookings)
7. [Email Notifications](#email-notifications)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Access Health Booking System is a medical appointment management platform built with Next.js and Convex. It allows administrators to:

- Manage practitioner profiles and working hours
- Create bookings for patients
- Confirm or reject booking requests
- Automatically generate available time slots
- Send email notifications

**Key Features:**
- ✅ Automatic 30-minute slot generation from working hours
- ✅ Real-time slot availability checking
- ✅ Email notifications via Resend
- ✅ Admin-only access (patients don't need accounts)
- ✅ Clean, modern admin interface

---

## Initial Setup

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Resend Email Service (for notifications)
RESEND_API_KEY=re_your_resend_api_key_here

# Admin Credentials
ADMIN_EMAIL=admin@accesshealth.com
ADMIN_PASSWORD=your_secure_password_here
```

### 2. Convex Setup

1. If you haven't already, initialize Convex:
   ```bash
   npx convex dev
   ```

2. The schema will automatically sync. Wait for the deployment to complete.

3. Copy your Convex deployment URL to `NEXT_PUBLIC_CONVEX_URL` in `.env.local`

### 3. Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Create an API key in your Resend dashboard
3. Add the API key to your `.env.local` file
4. Verify your sending domain (optional but recommended)

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Admin Authentication

### Logging In

1. Navigate to `/admin/login` or click "Book online" from the homepage (you'll be redirected to login if not authenticated)

2. Enter your admin credentials:
   - **Email**: The value set in `ADMIN_EMAIL` environment variable
   - **Password**: The value set in `ADMIN_PASSWORD` environment variable

3. Click "Login"

4. You'll be redirected to the admin dashboard upon successful login

### Logging Out

- Click the "Logout" button in the top-right corner of the dashboard
- You'll be redirected to the login page

---

## Managing Practitioners

### Creating a Practitioner

1. Navigate to **Practitioners** from the dashboard or go to `/admin/practitioners`

2. Click **"Add Practitioner"** button

3. Fill in the practitioner details:
   - **Full Name** (required): The practitioner's full name
   - **Email** (required): Contact email
   - **Phone** (required): Contact phone number
   - **Specialty** (optional): e.g., "General Practitioner", "Cardiologist"

4. Set **Working Hours**:
   - For each day of the week, you can add one or more time ranges
   - Click **"Add time range"** to add multiple shifts per day
   - Use the time pickers to set start and end times
   - Click the **X** button to remove a time range
   - Example: Monday 09:00-12:00 and 13:00-17:00

5. Toggle **Active** checkbox to mark the practitioner as active/inactive

6. Click **"Create Practitioner"**

**Note:** Only active practitioners will appear in booking forms and have slots generated.

### Viewing Practitioners

- Go to `/admin/practitioners` to see all practitioners
- The table shows:
  - Name, Email, Phone, Specialty
  - Status (Active/Inactive)

---

## Creating Bookings

### Step-by-Step Booking Process

1. **Navigate to Create Booking**
   - From the dashboard, click **"New Booking"**
   - Or go directly to `/admin/bookings/create`
   - Or click "Book online" from the homepage (requires login)

2. **Select Practitioner**
   - Choose from the dropdown of active practitioners
   - Only practitioners with working hours will show available slots

3. **Select Date**
   - Use the date picker to choose an appointment date
   - Only future dates are selectable
   - Format: YYYY-MM-DD

4. **Choose Time Slot**
   - Available slots will automatically appear based on:
     - Practitioner's working hours for that day
     - Already confirmed bookings (slots are blocked)
   - Slots are 30 minutes long
   - Click on an available slot to select it
   - Selected slot will be highlighted in green

5. **Enter Patient Information**
   - **Patient Name** (required): Full name of the patient
   - **Patient Phone** (required): Contact phone number
   - **Patient Email** (optional): For sending confirmation emails
   - **Reason for Visit** (required): Brief description of the appointment purpose

6. **Submit Booking**
   - Click **"Create Booking"**
   - The booking will be created with status "pending"
   - You'll be redirected to the dashboard

### How Slot Generation Works

- Slots are automatically generated from practitioner working hours
- Each slot is exactly 30 minutes
- Example: If working hours are 09:00-17:00, you'll get:
  - 09:00-09:30
  - 09:30-10:00
  - 10:00-10:30
  - ... and so on until 16:30-17:00

- Slots are filtered out if:
  - There's already a confirmed booking for that practitioner, date, and time slot
  - The practitioner is inactive
  - The day has no working hours configured

---

## Managing Bookings

### Dashboard Overview

The dashboard (`/admin/dashboard`) shows:

- **Quick Stats Cards:**
  - Pending Bookings count
  - Today's Confirmed Bookings count
  - Active Practitioners count

- **Pending Bookings Table:**
  - List of all bookings awaiting confirmation
  - Shows: Patient name, Practitioner, Date, Time, Reason
  - Quick action buttons: View, Confirm, Reject

### Viewing Booking Details

1. Click **"View"** on any booking in the dashboard
2. Or navigate to `/admin/bookings/[booking-id]`

The booking detail page shows:
- All patient information
- Practitioner details
- Date and time slot
- Current status (with color-coded badge)
- Reason for visit

### Confirming a Booking

1. From the dashboard, click the green **✓** button on a pending booking
2. Or from the booking detail page, click **"Confirm"**

**What happens:**
- Booking status changes to "confirmed"
- The time slot becomes blocked (no longer available for other bookings)
- A confirmation email is sent to the patient (if email was provided)
- The booking appears in "Today's Confirmed" count

**Note:** If the slot was already booked by another confirmed booking, you'll see an error message.

### Rejecting a Booking

1. Click the red **✗** button on a pending booking
2. Or from the booking detail page, click **"Reject"**

**What happens:**
- Booking status changes to "rejected"
- The time slot remains available
- No email is sent

### Editing/Rescheduling a Booking

1. Open the booking detail page
2. Click **"Edit"** button
3. A dialog will open with the booking form
4. Modify any fields:
   - Patient information
   - Practitioner (if needed)
   - Date
   - Time slot (only available slots will show)
   - Reason
5. Click **"Update Booking"**

**Important:** When rescheduling, make sure the new date and time slot are available.

---

## Email Notifications

### How Email Notifications Work

The system uses Resend to send two types of emails:

1. **Admin Notification** (sent when booking is created)
   - Sent to: `ADMIN_EMAIL` environment variable
   - Contains: Patient details, practitioner, date, time, reason
   - Purpose: Alert admin of new booking request

2. **Patient Confirmation** (sent when booking is confirmed)
   - Sent to: Patient email (if provided during booking)
   - Contains: Confirmation details, appointment information
   - Purpose: Confirm appointment with patient

### Email Configuration

- **From Address:** `Access Health <noreply@accesshealth.com>`
- **Subject Format:**
  - Admin: `New Booking Request: [Patient Name]`
  - Patient: `Booking Confirmed: [Date] at [Time]`

### Troubleshooting Emails

- **Emails not sending?**
  - Check `RESEND_API_KEY` is set correctly
  - Verify your Resend account is active
  - Check Resend dashboard for delivery status
  - Ensure patient email is provided for confirmations

- **Patient didn't receive confirmation?**
  - Verify email was entered during booking
  - Check spam/junk folder
  - Confirm Resend domain is verified

---

## Common Workflows

### Daily Workflow

1. **Morning:**
   - Log in to admin dashboard
   - Review pending bookings from overnight
   - Confirm or reject bookings
   - Check today's confirmed appointments

2. **During the Day:**
   - Create new bookings as patients call/walk in
   - Reschedule appointments if needed
   - Update practitioner availability if schedules change

3. **End of Day:**
   - Review all pending bookings
   - Confirm appointments for next day
   - Check for any conflicts or issues

### Setting Up a New Practitioner

1. Create practitioner profile with working hours
2. Mark as "Active"
3. Test by creating a booking for that practitioner
4. Verify slots are generating correctly

### Handling Schedule Changes

1. If a practitioner's schedule changes:
   - Go to Practitioners (edit functionality can be added)
   - Or create a new practitioner with updated hours
   - Existing bookings remain unchanged
   - New bookings will use updated schedule

### Managing Double Bookings

- The system prevents double bookings automatically
- When confirming, if slot is taken, you'll see an error
- Check existing confirmed bookings before confirming
- Use the booking detail page to see all bookings for a date

---

## Troubleshooting

### Common Issues

**Problem: No slots showing for a practitioner**
- ✅ Check practitioner is marked as "Active"
- ✅ Verify working hours are set for that day of the week
- ✅ Ensure the selected date is in the future
- ✅ Check if all slots are already booked (confirmed)

**Problem: Can't confirm a booking**
- ✅ Verify the slot isn't already confirmed for another booking
- ✅ Check the booking status (might already be confirmed/rejected)
- ✅ Ensure you're logged in as admin

**Problem: Slots not generating correctly**
- ✅ Verify working hours format (HH:mm, 24-hour format)
- ✅ Check time ranges don't overlap incorrectly
- ✅ Ensure end time is after start time

**Problem: Email notifications not working**
- ✅ Verify `RESEND_API_KEY` is set
- ✅ Check Resend dashboard for errors
- ✅ Ensure patient email is provided (for confirmations)
- ✅ Check console logs for error messages

**Problem: Can't log in**
- ✅ Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` match
- ✅ Check environment variables are loaded (restart dev server)
- ✅ Clear browser cookies and try again

### Getting Help

- Check Convex dashboard for database state
- Review browser console for client-side errors
- Check server logs for backend errors
- Verify all environment variables are set correctly

---

## Best Practices

1. **Practitioner Management**
   - Keep working hours up to date
   - Mark inactive practitioners as inactive (don't delete)
   - Use clear specialty names

2. **Booking Management**
   - Always confirm bookings promptly
   - Add patient emails when available for confirmations
   - Review pending bookings daily
   - Use clear, descriptive reasons for visits

3. **Slot Management**
   - Set realistic working hours
   - Account for breaks in schedule (use multiple time ranges)
   - Regularly review slot availability

4. **Security**
   - Use strong admin password
   - Keep environment variables secure
   - Don't commit `.env.local` to version control
   - Regularly update dependencies

---

## Technical Details

### Slot Generation Logic

- Slots are generated in 30-minute increments
- Based on practitioner's working hours for the specific day
- Only confirmed bookings block slots (pending/rejected don't)
- Slots are formatted as "HH:mm-HH:mm" (e.g., "09:00-09:30")

### Data Models

**Practitioner:**
- Full name, email, phone, specialty (optional)
- Working hours (7 days, multiple ranges per day)
- Active status

**Booking:**
- Patient name, phone, email (optional)
- Practitioner reference
- Date (YYYY-MM-DD format)
- Time slot (HH:mm-HH:mm format)
- Reason for visit
- Status: pending, confirmed, rejected
- Timestamps: createdAt, confirmedAt

### API Endpoints

- `/api/admin/login` - Admin authentication
- `/api/admin/logout` - End admin session
- `/api/admin/check` - Verify admin session

---

## Next Steps

After setting up the system:

1. ✅ Create your first practitioner
2. ✅ Test booking creation
3. ✅ Verify email notifications
4. ✅ Set up production environment variables
5. ✅ Train staff on using the system

---

**Need Help?** Review the code comments or check the Convex documentation for backend queries and mutations.

