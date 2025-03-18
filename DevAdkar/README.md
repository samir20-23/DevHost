# DevAdkar

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=17&duration=4000&pause=1000&color=6D26BFFF&center=true&vCenter=true&width=482&lines=الأذكار" alt="Typing SVG" />
</div>

<div id="header" align="center">
  <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDIyaTYyOXk4bDVodzljcmY4bnIzeHBzbzdoOG5qcW0xZzd1ejg2aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8GKGUIT5p4aCkpxWVj/giphy.gif" width="480"/>
</div>

## Introduction | المقدمة

**DevAdkar** is a unique mobile and web application designed to help Muslims engage in the daily practice of reciting dhikr (remembrance of Allah). It offers both **Manual Mode** and **Auto Mode**, allowing users to either select dhikr from a pre-populated list or recite a custom dhikr they can add themselves.

### Key Features | الميزات الرئيسية
1. **Manual Mode**:
   - Select a dhikr from a list and mark it off as you recite.
   - Track your progress with a counter that updates each time you mark off a dhikr.
   - Option to add your own custom dhikr to the list.

2. **Auto Mode**:
   - Automatically recite a selected dhikr for a set time.
   - Set the time in seconds for each dhikr cycle.
   - A countdown timer and recitation count will display how many times you have recited the dhikr.
   - Once the timer finishes, the count of recitations is updated.

3. **Persistent Storage**:
   - All progress is saved in **local storage**, ensuring that your recitations persist even if you close or refresh the app.
   - The app will remember your previously selected dhikr, time settings, and counters.

4. **Responsive UI**:
   - The interface is designed to be simple, intuitive, and easy to use.
   - The app is mobile-responsive, making it easy to use on any device.

5. **Custom Dhikr**:
   - You can add your own dhikr to the list and track them just like the predefined ones.
   - The app allows you to enter a dhikr manually in Arabic, making it easy to keep a personal connection with your practice.

---

## App Flow | سير التطبيق

### **Manual Mode**
- In this mode, you will see a list of popular dhikrs, including **سبحان الله**, **الحمد لله**, **الله أكبر**, and many more.
- As you recite each dhikr, you can click a checkbox next to it to mark it as completed.
- The app will keep track of how many times you’ve recited each dhikr.
- You can add any custom dhikr you want to recite by typing it into the input field and clicking "Add Dhikr."

### **Auto Mode**
- In Auto Mode, you can select a dhikr to recite automatically.
- You can choose how many seconds you want the dhikr to repeat automatically, e.g., 10 seconds, 30 seconds, or 1 minute.
- After you click **Start**, the app will recite the selected dhikr and keep track of how many recitations have been completed.
- Once the set time is finished, the app will increment the counter and restart the cycle.

### **Saving Progress**
- The app uses **localStorage** to persist the count of recitations and the dhikr state, so your progress is saved even after the app is closed.
- This allows you to resume your dhikr recitations where you left off.

---

## Technologies Used | التقنيات المستخدمة

The following technologies were used to develop **DevAdkar**:

- **HTML**: The structure of the app, including input fields, buttons, and displays.
- **CSS**: Styling to create a simple, clean, and responsive design.
- **JavaScript**: The core logic behind reciting dhikr, managing the counter, handling the timer, and saving the state using **localStorage**.
- **localStorage**: To store user preferences and recitation progress so that it persists across sessions.

---

## Installation | كيفية التثبيت

1. **Clone the Repository**: First, clone the repository to your local machine using the following command:

```bash
git clone  https://github.com/samir20-23/DevHost.git
cd DevAdkar 
golive main.html
