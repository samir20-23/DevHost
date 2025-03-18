
    // Default app data
    var defaultData = {
        adhkarData: { all: [] },
        tasbihCount: 0,
        totalTasbihCount: 0,
        autoRecitations: 0,
        streak: 0,
        lastCompletedDate: null,
        darkMode: false,
        morningNotification: true,
        eveningNotification: true,
        showTranslation: true,
        autoReset: true,
        contributions: {},
        hadithData: [
          { title: "حديث 1", content: "من أعظم الأعمال الصلاة على النبي صلى الله عليه وسلم." },
          { title: "حديث 2", content: "إنما الأعمال بالنيات." },
          { title: "حديث 3", content: "خير الناس أنفعهم للناس." }
        ],
        duaData: [
          { title: "دعاء الصباح", content: "اللهم بك أصبحنا وبك أمسينا، وبك نحيا وبك نموت وإليك النشور." },
          { title: "دعاء المساء", content: "اللهم بك أمسينا وبك أصبحنا، وبك نحيا وبك نموت وإليك المصير." },
          { title: "دعاء آخر", content: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار." }
        ],
        currentTasbihDhikr: "سبحان الله"
      };
  
      // Load saved data and merge with defaults
      var savedData = JSON.parse(localStorage.getItem("adhkarAppData")) || {};
      var appData = Object.assign({}, defaultData, savedData);
  
      var currentTab = "daily";
      var autoInterval = null;
      var autoTimeRemaining = 0;
      var autoCycleTime = 0; // in seconds
  
      // DOM Elements
      var adhkarList = document.getElementById("adhkarList");
      var progressFill = document.querySelector(".progress-fill");
      var progressPercent = document.getElementById("progressPercent");
      var tasbihCounter = document.getElementById("tasbihCounter");
      var tasbihIncrement = document.getElementById("tasbihIncrement");
      var tasbihReset = document.getElementById("tasbihReset");
      var currentTasbihDhikrEl = document.getElementById("currentTasbihDhikr");
      var tasbihPresets = document.getElementById("tasbihPresets");
      var completedAdhkar = document.getElementById("completedAdhkar");
      var streakDays = document.getElementById("streakDays");
      var totalTasbih = document.getElementById("totalTasbih");
      var completionRate = document.getElementById("completionRate");
      var adhkarCalendar = document.getElementById("adhkarCalendar");
      var themeToggle = document.getElementById("themeToggle");
      var darkModeToggle = document.getElementById("darkModeToggle");
      var resetDataBtn = document.getElementById("resetDataBtn");
      var tabs = document.querySelectorAll(".tab, .nav-item");
      var tabContents = document.querySelectorAll(".tab-content");
      var morningNotification = document.getElementById("morningNotification");
      var eveningNotification = document.getElementById("eveningNotification");
      var showTranslation = document.getElementById("showTranslation");
      var autoReset = document.getElementById("autoReset");
      var addCustomAdhkarBtn = document.getElementById("addCustomAdhkar");
      var customAdhkarInput = document.getElementById("customAdhkarInput");
      var contributionsGrid = document.getElementById("contributionsGrid");
      var hadithList = document.getElementById("hadithList");
      var duaList = document.getElementById("duaList");
      // Daily Auto Mode elements
      var autoDhikrSelect = document.getElementById("autoDhikrSelect");
      var autoTimeInput = document.getElementById("autoTimeInput");
      var startAutoAdkar = document.getElementById("startAutoAdkar");
      var stopAutoAdkar = document.getElementById("stopAutoAdkar");
      var autoCountdownDisplay = document.getElementById("autoCountdownDisplay");
      var autoCounterDisplay = document.getElementById("autoCounterDisplay");
  
      // Save data to localStorage
      function saveData(){
        var data = {
          adhkarData: appData.adhkarData,
          tasbihCount: appData.tasbihCount,
          totalTasbihCount: appData.totalTasbihCount,
          autoRecitations: appData.autoRecitations,
          streak: appData.streak,
          lastCompletedDate: appData.lastCompletedDate,
          darkMode: darkModeToggle.checked,
          morningNotification: morningNotification.checked,
          eveningNotification: eveningNotification.checked,
          showTranslation: showTranslation.checked,
          autoReset: autoReset.checked,
          contributions: appData.contributions,
          hadithData: appData.hadithData,
          duaData: appData.duaData,
          currentTasbihDhikr: appData.currentTasbihDhikr
        };
        localStorage.setItem("adhkarAppData", JSON.stringify(data));
      }
      // Update UI elements
      function updateUI(){
        updateAdhkarList();
        updateProgress();
        updateTasbihCounter();
        updateStats();
        updateCalendar();
        updateContributions();
        updateDashboard();
        updateChallenges();
        updateAutoModeDisplay();
        updateCurrentTasbihDhikr();
        saveData();
      }
      // Update manual adhkar list (for daily tab)
      function updateAdhkarList(){
        adhkarList.innerHTML = "";
        if(appData.adhkarData.all){
          appData.adhkarData.all.forEach(function(adhkar, index){
            var item = document.createElement("div");
            item.className = "adhkar-item";
            item.innerHTML = '<input type="checkbox" id="adhkar-'+index+'" '+(adhkar.completed?"checked":"")+'><label for="adhkar-'+index+'">'+adhkar.text+'</label>';
            item.querySelector("input").addEventListener("change", function(){
              appData.adhkarData.all[index].completed = this.checked;
              var today = new Date().toISOString().split("T")[0];
              appData.contributions[today] = appData.contributions[today] || 0;
              if(this.checked){
                appData.contributions[today]++;
              } else {
                appData.contributions[today]--;
              }
              updateUI();
            });
            adhkarList.appendChild(item);
          });
        }
      }
      // Update progress bar (using manual check-off count)
      function updateProgress(){
        var total = appData.adhkarData.all ? appData.adhkarData.all.length : 0;
        var completed = appData.adhkarData.all ? appData.adhkarData.all.filter(function(a){ return a.completed; }).length : 0;
        var percent = total ? (completed/total)*100 : 0;
        progressFill.style.width = percent + "%";
        progressPercent.textContent = Math.round(percent) + "%";
      }
      // Update tasbih counter display
      function updateTasbihCounter(){
        tasbihCounter.textContent = appData.tasbihCount;
        totalTasbih.textContent = appData.totalTasbihCount;
      }
      // Update stats (for manual adhkar)
      function updateStats(){
        var comp = appData.adhkarData.all ? appData.adhkarData.all.filter(function(a){ return a.completed; }).length : 0;
        completedAdhkar.textContent = comp;
        streakDays.textContent = appData.streak;
        completionRate.textContent = appData.adhkarData.all ? Math.round((comp/appData.adhkarData.all.length)*100) + "%" : "0%";
      }
      // Update calendar view
      function updateCalendar(){
        adhkarCalendar.innerHTML = "";
        var today = new Date();
        var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        var lastDay = new Date(today.getFullYear(), today.getMonth()+1, 0);
        var startDay = firstDay.getDay();
        var daysInMonth = lastDay.getDate();
        for(var i=0;i<startDay;i++){
          var empty = document.createElement("div");
          empty.className = "calendar-day empty";
          adhkarCalendar.appendChild(empty);
        }
        for(var i=1;i<=daysInMonth;i++){
          var day = document.createElement("div");
          day.className = "calendar-day";
          day.textContent = i;
          if(i===today.getDate()){
            day.classList.add("today");
          }
          adhkarCalendar.appendChild(day);
        }
      }
      // Update contributions grid (like GitHub contributions)
      function updateContributions(){
        contributionsGrid.innerHTML = "";
        var today = new Date();
        for(var i=0;i<42;i++){
          var d = new Date();
          d.setDate(today.getDate()-i);
          var dateStr = d.toISOString().split("T")[0];
          var box = document.createElement("div");
          box.className = "calendar-day";
          if(appData.contributions[dateStr] && appData.contributions[dateStr] > 0){
            box.classList.add("filled");
          }
          contributionsGrid.appendChild(box);
        }
      }
      // Update Dashboard (Hadith & Dua)
      function updateDashboard(){
        hadithList.innerHTML = "";
        appData.hadithData.forEach(function(item){
          var div = document.createElement("div");
          div.className = "list-item";
          div.innerHTML = "<h4>" + item.title + "</h4><p>" + item.content + "</p>";
          hadithList.appendChild(div);
        });
        duaList.innerHTML = "";
        appData.duaData.forEach(function(item){
          var div = document.createElement("div");
          div.className = "list-item";
          div.innerHTML = "<h4>" + item.title + "</h4><p>" + item.content + "</p>";
          duaList.appendChild(div);
        });
      }
      // Update Challenges section in Stats tab
      function updateChallenges(){
        var challengeList = document.getElementById("challengeList");
        if(!challengeList) return;
        challengeList.innerHTML = "";
        var totalAdhkar = appData.adhkarData.all ? appData.adhkarData.all.length : 0;
        var completedCount = appData.adhkarData.all ? appData.adhkarData.all.filter(function(a){ return a.completed; }).length : 0;
        var c1 = document.createElement("div");
        c1.className = "challenge-item";
        c1.textContent = "تحدي الإكمال اليومي: " + completedCount + "/" + totalAdhkar;
        challengeList.appendChild(c1);
        var c2 = document.createElement("div");
        c2.className = "challenge-item";
        c2.textContent = "تحدي التلاوة التلقائية: " + appData.autoRecitations + "/10";
        challengeList.appendChild(c2);
        var c3 = document.createElement("div");
        c3.className = "challenge-item";
        c3.textContent = "تحدي التسبيح: " + appData.totalTasbihCount + "/100";
        challengeList.appendChild(c3);
        var c4 = document.createElement("div");
        c4.className = "challenge-item";
        c4.textContent = "تحدي الاستمرارية: " + appData.streak + "/7 أيام";
        challengeList.appendChild(c4);
      }
      // ------------------ Daily Auto Mode Functions ------------------
      function updateAutoModeDisplay(){
        if(autoCountdownDisplay){
          autoCountdownDisplay.textContent = "الوقت المتبقي: " + autoTimeRemaining + " ثانية";
        }
        if(autoCounterDisplay){
          autoCounterDisplay.textContent = appData.autoRecitations;
        }
      }
      function startAutoMode(){
        if(!(appData.adhkarData.all && appData.adhkarData.all.length)) return;
        // Get the fixed dhikr from the select
        var selectedDhikr = autoDhikrSelect.value;
        // Parse time in seconds; if invalid, default to 10
        var timeValue = parseInt(autoTimeInput.value);
        if(isNaN(timeValue) || timeValue <= 0){
          timeValue = 10;
          autoTimeInput.value = 10;
        }
        autoCycleTime = timeValue;
        autoTimeRemaining = timeValue;
        startAutoAdkar.style.display = "none";
        stopAutoAdkar.style.display = "inline-block";
        autoCountdownDisplay.textContent = "الوقت المتبقي: " + autoTimeRemaining + " ثانية";
        autoInterval = setInterval(function(){
          autoTimeRemaining--;
          updateAutoModeDisplay();
          if(autoTimeRemaining <= 0){
            appData.autoRecitations++;
            autoTimeRemaining = autoCycleTime;
            updateChallenges();
            saveData();
          }
        }, 1000);
      }
      function stopAutoMode(){
        if(autoInterval){
          clearInterval(autoInterval);
          autoInterval = null;
        }
        startAutoAdkar.style.display = "inline-block";
        stopAutoAdkar.style.display = "none";
      }
      // ------------------ Tasbih (السبحة) Functions ------------------
      function updateCurrentTasbihDhikr(){
        currentTasbihDhikrEl.textContent = appData.currentTasbihDhikr;
      }
      // ------------------ Data Initialization ------------------
      function fetchAdkar(){
        fetch("./adkar.json")
          .then(function(response){ return response.json(); })
          .then(function(data){
            // Populate the "all" category only if empty
            if(!appData.adhkarData.all || appData.adhkarData.all.length === 0){
              appData.adhkarData.all = data.adkar.map(function(item){
                return { text: item, completed: false };
              });
            }
            // Also populate the auto dhikr select options
            populateAutoDhikrSelect();
            updateUI();
          });
      }
      function populateAutoDhikrSelect(){
        autoDhikrSelect.innerHTML = "";
        if(appData.adhkarData.all){
          appData.adhkarData.all.forEach(function(adhkar){
            var option = document.createElement("option");
            option.value = adhkar.text;
            option.textContent = adhkar.text;
            autoDhikrSelect.appendChild(option);
          });
        }
      }
       function resetDailyAdhkarIfNeeded(){
        var today = new Date().toISOString().split("T")[0];
        if(appData.lastCompletedDate !== today && autoReset.checked){
          if(appData.adhkarData.all){
            appData.adhkarData.all.forEach(function(adhkar){
              adhkar.completed = false;
            });
          }
          appData.lastCompletedDate = today;
          saveData();
          updateUI();
        }
      }
      // ------------------ Event Listeners ------------------
      // Navigation tabs
      tabs.forEach(function(tab){
        tab.addEventListener("click", function(){
          tabs.forEach(function(t){ t.classList.remove("active"); });
          tab.classList.add("active");
          currentTab = tab.getAttribute("data-tab");
          tabContents.forEach(function(content){ content.classList.remove("active"); });
          document.getElementById(currentTab + "Tab").classList.add("active");
          if(currentTab === "daily"){
            updateAdhkarList();
          }
          if(currentTab === "stats"){
            updateDashboard();
            updateContributions();
            updateChallenges();
          }
        });
      });
      // Tasbih increment/reset
      tasbihIncrement.addEventListener("click", function(){
        appData.tasbihCount++;
        appData.totalTasbihCount++;
        updateUI();
      });
      tasbihReset.addEventListener("click", function(){
        appData.tasbihCount = 0;
        updateUI();
      });
      // When a tasbih preset is clicked, update the current dhikr for tasbih
      tasbihPresets.addEventListener("click", function(e){
        if(e.target && e.target.classList.contains("tasbih-preset")){
          var chosen = e.target.getAttribute("data-dhikr");
          appData.currentTasbihDhikr = chosen;
          updateCurrentTasbihDhikr();
          saveData();
        }
      });
      // Theme toggle
      themeToggle.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
        saveData();
      });
      darkModeToggle.addEventListener("change", function(){
        document.body.classList.toggle("dark-mode", darkModeToggle.checked);
        saveData();
      });
      morningNotification.addEventListener("change", function(){ saveData(); });
      eveningNotification.addEventListener("change", function(){ saveData(); });
      showTranslation.addEventListener("change", function(){ saveData(); });
      autoReset.addEventListener("change", function(){ saveData(); });
      resetDataBtn.addEventListener("click", function(){
        localStorage.removeItem("adhkarAppData");
        location.reload();
      });
      addCustomAdhkarBtn.addEventListener("click", function(){
        var text = customAdhkarInput.value.trim();
        if(text){
          appData.adhkarData.all.push({ text: text, completed: false });
          customAdhkarInput.value = "";
          updateUI();
        }
      });
      // Auto mode start/stop for daily adhkar
      startAutoAdkar.addEventListener("click", startAutoMode);
      stopAutoAdkar.addEventListener("click", stopAutoMode);
      autoTimeInput.addEventListener("input", function(){
        if(autoInterval){
          stopAutoMode();
          startAutoMode();
        }
      });
      // Language switching
      document.querySelectorAll(".language-btn").forEach(function(btn){
        btn.addEventListener("click", function(){
          document.querySelectorAll(".language-btn").forEach(function(b){ b.classList.remove("active"); });
          btn.classList.add("active");
          var lang = btn.getAttribute("data-lang");
          if(lang === "en"){
            document.getElementById("headerTitle").textContent = "Islamic Adhkar & Dua Tracker – A Complete Spiritual Companion";
            document.querySelector('[data-tab="daily"]').textContent = "Daily Adhkar";
            document.querySelector('[data-tab="tasbih"]').textContent = "Tasbih";
            document.querySelector('[data-tab="stats"]').textContent = "Statistics";
            document.querySelector('[data-tab="settings"]').textContent = "Settings";
            document.getElementById("progressTitle").textContent = "Daily Adhkar Progress";
            document.getElementById("tasbihTitle").textContent = "Electronic Tasbih";
            document.getElementById("completedLabel").textContent = "Completed Adhkar";
            document.getElementById("streakLabel").textContent = "Streak Days";
            document.getElementById("tasbihLabel").textContent = "Total Tasbih";
            document.getElementById("completionRateLabel").textContent = "Completion Rate";
            document.getElementById("calendarTitle").textContent = "Monthly Adhkar Log";
            document.getElementById("hadithTitle").textContent = "Hadith";
            document.getElementById("duaTitle").textContent = "Dua";
            document.getElementById("notificationTitle").textContent = "Notifications";
            document.getElementById("morningNotifText").textContent = "Morning Adhkar Reminder";
            document.getElementById("eveningNotifText").textContent = "Evening Adhkar Reminder";
            document.getElementById("appearanceTitle").textContent = "Appearance";
            document.getElementById("darkModeText").textContent = "Dark Mode";
            document.getElementById("showTranslationText").textContent = "Show Translation";
            document.getElementById("optionsTitle").textContent = "Options";
            document.getElementById("autoResetText").textContent = "Auto Reset at Midnight";
            document.getElementById("navDaily").textContent = "Adhkar";
            document.getElementById("navTasbih").textContent = "Tasbih";
            document.getElementById("navStats").textContent = "Stats";
            document.getElementById("navSettings").textContent = "Settings";
          } else {
            document.getElementById("headerTitle").textContent = "تطبيق الأذكار والأدعية الإسلامية";
            document.querySelector('[data-tab="daily"]').textContent = "الأذكار اليومية";
            document.querySelector('[data-tab="tasbih"]').textContent = "السبحة";
            document.querySelector('[data-tab="stats"]').textContent = "الإحصائيات";
            document.querySelector('[data-tab="settings"]').textContent = "الإعدادات";
            document.getElementById("progressTitle").textContent = "تقدم الأذكار اليومية";
            document.getElementById("tasbihTitle").textContent = "السبحة الإلكترونية";
            document.getElementById("completedLabel").textContent = "أذكار مكتملة";
            document.getElementById("streakLabel").textContent = "أيام متتالية";
            document.getElementById("tasbihLabel").textContent = "إجمالي التسبيح";
            document.getElementById("completionRateLabel").textContent = "معدل الإكمال";
            document.getElementById("calendarTitle").textContent = "سجل الأذكار الشهري";
            document.getElementById("hadithTitle").textContent = "الأحاديث";
            document.getElementById("duaTitle").textContent = "الأدعية";
            document.getElementById("notificationTitle").textContent = "الإشعارات";
            document.getElementById("morningNotifText").textContent = "تذكير بأذكار الصباح";
            document.getElementById("eveningNotifText").textContent = "تذكير بأذكار المساء";
            document.getElementById("appearanceTitle").textContent = "المظهر";
            document.getElementById("darkModeText").textContent = "الوضع المظلم";
            document.getElementById("showTranslationText").textContent = "عرض الترجمة";
            document.getElementById("optionsTitle").textContent = "الخيارات";
            document.getElementById("autoResetText").textContent = "إعادة تعيين الأذكار تلقائيًا عند منتصف الليل";
            document.getElementById("navDaily").textContent = "الأذكار";
            document.getElementById("navTasbih").textContent = "السبحة";
            document.getElementById("navStats").textContent = "الإحصائيات";
            document.getElementById("navSettings").textContent = "الإعدادات";
          }
          saveData();
        });
      });
      // ------------------ Initialization ------------------
      fetchAdkar();
      resetDailyAdhkarIfNeeded();
      updateUI();
    