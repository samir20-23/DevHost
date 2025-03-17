

// mouse move

const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  const x = e.pageX; // Use pageX instead of clientX
  const y = e.pageY; // Use pageY instead of clientY

  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;

  // Particle effect
  const particle = document.createElement("div");
  particle.classList.add("particle");
  document.body.appendChild(particle);
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  setTimeout(() => {
    particle.remove();
  }, 500);
});



document.addEventListener("DOMContentLoaded", () => {
  // Dummy translation function. Replace or remove if you have a real implementation.
  function t(input) {
    return input;
  }

  // Dialog Open/Close
  const openButton = document.querySelector("#openMenu");
  const dialog = document.querySelector("dialog");

  openButton.addEventListener("click", () => dialog.showModal());

  dialog.addEventListener("click", ({ target }) => {
    if (target.nodeName === "DIALOG") target.close("dismiss");
  });

  // Toggle column layout
  let columnBtn = document.getElementById("columnBtn");
  let main = document.getElementById("main");
  let wrap = 0;
  columnBtn.addEventListener("click", () => {
    wrap = (wrap + 1) % 2;
    main.style.display = "flex";
    main.style.justifyContent = "center";
    main.style.alignContent = "center";
    main.style.flexDirection = wrap ? "column" : "inherit";
    main.style.flexWrap = wrap ? "nowrap" : "wrap";
  });

  // Function to create a language item with checkboxes and description functionality
  function createCheckbox(langName, iconSrc) {
    // Create the main language container.
    // NOTE: We keep the id "lang" per your CSS requirements.
    let langElement = document.createElement("div");
    langElement.classList.add("lang-item");
    langElement.id = "lang";
    langElement.setAttribute("data-lang", langName);

    // Create language name element.
    let nameLang = document.createElement("p");
    nameLang.classList.add("nameLang");
    nameLang.id = 'nameLang';
    nameLang.textContent = ` ${langName} `;

    // --- New: Copy the name text automatically when clicked ---
    nameLang.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering other events on the language element.
      navigator.clipboard.writeText(nameLang.textContent)
        .then(() => {
          console.log(`${langName} copied to clipboard`);
          // Optionally, you can add a visual cue here.
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });

    // Create icon element.
    let icon = document.createElement("img");
    icon.src = iconSrc;
    icon.width = 48;
    icon.classList.add("iconLang");

    // Create 3 checkboxes and load/save their state.
    let checkboxes = [];
    for (let i = 0; i < 3; i++) {
      let checkbox = document.createElement("input");
      // Added as requested:
      t("input");
      checkbox.type = "checkbox";
      checkbox.id = "checkbox";
      checkbox.classList.add("checkbox");
      checkbox.checked = localStorage.getItem(`${langName}-checkbox${i}`) === "true";
      checkbox.addEventListener("change", () => {
        localStorage.setItem(`${langName}-checkbox${i}`, checkbox.checked);
        updateLangActiveState(langElement, checkboxes);
      });
      checkboxes.push(checkbox);
    }

    // Create the Description button (always labeled "Description").
    let descButton = document.createElement("i"); 
    descButton.classList = "fas fa-file-alt";
    descButton.addEventListener("click", (e) => {
      e.stopPropagation();
      showDescriptionModal(langName);
    }); 
    // Append name, icon, checkboxes, and description button to the language element.
    langElement.append(nameLang, icon, ...checkboxes, descButton);

    // Toggle checkboxes when clicking on the language element (except on inputs, buttons, etc.).
    //   langElement.addEventListener("click", (e) => {
    //     if (
    //       e.target.tagName !== "INPUT" &&
    //       !e.target.closest(".desc-modal") &&
    //       e.target.tagName !== "BUTTON" &&
    //       e.target.tagName !== "TEXTAREA"
    //     ) {
    //       checkboxes.forEach((cb, i) => {
    //         cb.checked = !cb.checked;
    //         localStorage.setItem(`${langName}-checkbox${i}`, cb.checked);
    //       });
    //       updateLangActiveState(langElement, checkboxes);
    //     }
    //   });

    // Set initial active state based on the first checkbox.
    if (checkboxes[0].checked) {
      langElement.classList.add("active");
      langElement.style.backgroundColor = "rgba(0, 0, 0, 0.533)";
      langElement.style.color = "rgb(255, 255, 255)";
    }

    main.appendChild(langElement);
  }

  // Helper function to update the visual active state of the language element.
  function updateLangActiveState(langElement, checkboxes) {
    if (checkboxes[0].checked) {
      langElement.classList.add("active");
      langElement.style.backgroundColor = "rgba(0, 0, 0, 0.533)";
      langElement.style.color = "rgb(255, 255, 255)";
    } else {
      langElement.classList.remove("active");
      langElement.style.backgroundColor = "";
      langElement.style.color = "";
    }
  }

  // Function to show the description modal for a given language.
  function showDescriptionModal(langName) {
    // Create modal overlay.
    let modal = document.createElement("div");
    modal.classList.add("desc-modal");

    // Create modal content container.
    let modalContent = document.createElement("div");
    modalContent.classList.add("desc-modal-content");

    // Add header.
    let header = document.createElement("h2");
    header.textContent = `Description for ${langName}`;
    header.style.color='black';
    modalContent.appendChild(header);

    // Check if a description exists in localStorage.
    let savedDescription = localStorage.getItem(`${langName}-description`);

    if (savedDescription) {
      // Read-only view: display the saved description and buttons for editing or closing.
      let descriptionPara = document.createElement("p");
      descriptionPara.textContent = savedDescription;
      descriptionPara.id = "descriptionPara";
      descriptionPara.style.color='black';
      modalContent.appendChild(descriptionPara);

      let btnContainer = document.createElement("div");

      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        // Switch to editing mode.
        modalContent.innerHTML = "";
        modalContent.appendChild(header);
        let textarea = document.createElement("textarea");
        textarea.value = savedDescription;
        modalContent.appendChild(textarea);

        let btnContainerEdit = document.createElement("div");
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {
          let newDesc = textarea.value;
          localStorage.setItem(`${langName}-description`, newDesc);
          modal.remove();
        });
        let cancelButton = document.createElement("button");
        cancelButton.textContent = "Close";
        cancelButton.addEventListener("click", () => {
          modal.remove();
        });
        btnContainerEdit.appendChild(saveButton);
        btnContainerEdit.appendChild(cancelButton);
        modalContent.appendChild(btnContainerEdit);
      });

      let closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", () => {
        modal.remove();
      });

      btnContainer.appendChild(editButton);
      btnContainer.appendChild(closeButton);
      modalContent.appendChild(btnContainer);
    } else {
      // No saved description: show an editable textarea with Create and Close buttons.
      let textarea = document.createElement("textarea");
      textarea.placeholder = "Enter your description here...";
      modalContent.appendChild(textarea);

      let btnContainer = document.createElement("div");
      let createButton = document.createElement("button");
      createButton.textContent = "Create";
      createButton.addEventListener("click", () => {
        let newDesc = textarea.value;
        localStorage.setItem(`${langName}-description`, newDesc);
        modal.remove();
      });
      let closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", () => {
        modal.remove();
      });
      btnContainer.appendChild(createButton);
      btnContainer.appendChild(closeButton);
      modalContent.appendChild(btnContainer);
    }

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  // Dark mode toggle.
  const modeButton = document.createElement("button");
  modeButton.textContent = "Toggle Mode";
  document.getElementById("btns").appendChild(modeButton);

  modeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "mode",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });

  if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark-mode");
  }


  //import   xxxxxxxxxxxxxx
  document.getElementById('importButton').addEventListener('click', async () => {
    if (confirm("Are you sure you want to import descriptions.json?")) {
      try {
        const response = await fetch('./descriptions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch the file');
        }

        const jsonData = await response.json();

        Object.keys(jsonData).forEach(lang => {
          jsonData[lang].checkboxes.forEach((value, index) => {
            localStorage.setItem(`${lang}-checkbox${index}`, value ? "true" : "false");
          });
          localStorage.setItem(`${lang}-description`, jsonData[lang].description || "");

          const langElement = document.querySelector(`.lang-item[data-lang="${lang}"]`);
          if (langElement) {
            const checkboxes = langElement.querySelectorAll(".checkbox");
            checkboxes.forEach((checkbox, index) => {
              checkbox.checked = jsonData[lang].checkboxes[index];
            });
          }
        });

        alert("Data imported successfully!");
      } catch (error) {
        console.error("Error importing file:", error);
        alert("Failed to import file.");
      }
    } else {
      alert("Import canceled.");
    }
  });

  // backup xxxxxxxxxx
  document.getElementById('backup').addEventListener('click', async () => {
    if (confirm("Are you sure you want to back up and import  descriptions.json?")) {
      if (confirm(" ⚠⚠⚠ warning this is mean delete the data and import the backup Are you sure ? ⚠⚠⚠")) {
        try {
          const response = await fetch('./backUp.json');
          if (!response.ok) {
            throw new Error('Failed to fetch the file');
          }

          const jsonData = await response.json();

          Object.keys(jsonData).forEach(lang => {
            jsonData[lang].checkboxes.forEach((value, index) => {
              localStorage.setItem(`${lang}-checkbox${index}`, value ? "true" : "false");
            });
            localStorage.setItem(`${lang}-description`, jsonData[lang].description || "");

            const langElement = document.querySelector(`.lang-item[data-lang="${lang}"]`);
            if (langElement) {
              const checkboxes = langElement.querySelectorAll(".checkbox");
              checkboxes.forEach((checkbox, index) => {
                checkbox.checked = jsonData[lang].checkboxes[index];
              });
            }
          });
          window.location.reload();
          alert("Data imported successfully!");
         
        } catch (error) {
          console.error("Error importing file:", error);
          alert("Failed to import file.");
        }


      } else {
        alert("Import canceled.");
      }
    } else {
      alert("Import canceled.");
    }
  });

  //export   xxxxxxxxxxxxxx
  document.getElementById('exportButton').addEventListener('click', async () => {
    const saveChoice = confirm("Do you want to choose a folder to save the file? Click 'Cancel' to save in Downloads.");

    const langData = {};
    const languages = document.querySelectorAll('.lang-item');

    languages.forEach(langElement => {
      const langName = langElement.getAttribute('data-lang');
      langData[langName] = {
        checkboxes: [0, 1, 2].map(i => localStorage.getItem(`${langName}-checkbox${i}`) === 'true'),
        description: localStorage.getItem(`${langName}-description`) || ''
      };
    });

    const updatedJson = JSON.stringify(langData, null, 2);

    if (saveChoice && window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: "descriptions.json",
          types: [{ description: "JSON Files", accept: { "application/json": [".json"] } }]
        });

        const writable = await handle.createWritable();
        await writable.write(updatedJson);
        await writable.close();

        alert("File saved successfully!");
      } catch (error) {
        console.error("Error saving file:", error);
        alert("Failed to save the file.");
      }
    } else {
      const blob = new Blob([updatedJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "descriptions.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  });



  // Create language items. 

  createCheckbox('ableton', './icons/Ableton-Dark.svg');
  createCheckbox('activitypub', './icons/ActivityPub-Dark.svg');
  createCheckbox('actix', './icons/Actix-Dark.svg');
  createCheckbox('adonis', './icons/Adonis.svg');
  createCheckbox('ae', './icons/AfterEffects.svg');
  createCheckbox('aiscript', './icons/AiScript-Dark.svg');
  createCheckbox('alpinejs', './icons/AlpineJS-Dark.svg');
  createCheckbox('anaconda', './icons/Anaconda-Dark.svg');
  createCheckbox('androidstudio', './icons/AndroidStudio-Dark.svg');
  createCheckbox('angular', './icons/Angular-Dark.svg');
  createCheckbox('ansible', './icons/Ansible.svg');
  createCheckbox('apollo', './icons/Apollo.svg');
  createCheckbox('appwrite', './icons/Appwrite.svg');
  createCheckbox('arch', './icons/Arch-Dark.svg');
  createCheckbox('arduino', './icons/Arduino.svg');
  createCheckbox('astro', './icons/Astro.svg');
  createCheckbox('atom', './icons/Atom.svg');
  createCheckbox('au', './icons/Audition.svg');
  createCheckbox('autocad', './icons/AutoCAD-Dark.svg');
  createCheckbox('aws', './icons/AWS-Dark.svg');
  createCheckbox('azul', './icons/Azul.svg');
  createCheckbox('azure', './icons/Azure-Dark.svg');
  createCheckbox('babel', './icons/Babel.svg');
  createCheckbox('bash', './icons/Bash-Dark.svg');
  createCheckbox('bevy', './icons/Bevy-Dark.svg');
  createCheckbox('bitbucket', './icons/BitBucket-Dark.svg');
  createCheckbox('blender', './icons/Blender-Dark.svg');
  createCheckbox('bootstrap', './icons/Bootstrap.svg');
  createCheckbox('bsd', './icons/BSD-Dark.svg');
  createCheckbox('bun', './icons/Bun-Dark.svg');
  createCheckbox('c', './icons/C.svg');
  createCheckbox('cs', './icons/CS.svg');
  createCheckbox('cpp', './icons/CPP.svg');
  createCheckbox('crystal', './icons/Crystal-Dark.svg');
  createCheckbox('cassandra', './icons/Cassandra-Dark.svg');
  createCheckbox('clion', './icons/CLion-Dark.svg');
  createCheckbox('clojure', './icons/Clojure-Dark.svg');
  createCheckbox('cloudflare', './icons/Cloudflare-Dark.svg');
  createCheckbox('cmake', './icons/CMake-Dark.svg');
  createCheckbox('codepen', './icons/CodePen-Dark.svg');
  createCheckbox('coffeescript', './icons/CoffeeScript-Dark.svg');
  createCheckbox('css', './icons/CSS.svg');
  createCheckbox('cypress', './icons/Cypress-Dark.svg');
  createCheckbox('d3', './icons/D3-Dark.svg');
  createCheckbox('dart', './icons/Dart-Dark.svg');
  createCheckbox('debian', './icons/Debian-Dark.svg');
  createCheckbox('deno', './icons/DENO-Dark.svg');
  createCheckbox('devto', './icons/DevTo-Dark.svg');
  createCheckbox('discord', './icons/Discord.svg');
  createCheckbox('bots', './icons/DiscordBots.svg');
  createCheckbox('django', './icons/Django.svg');
  createCheckbox('docker', './icons/Docker.svg');
  createCheckbox('dotnet', './icons/DotNet.svg');
  createCheckbox('dynamodb', './icons/DynamoDB-Dark.svg');
  createCheckbox('eclipse', './icons/Eclipse-Dark.svg');
  createCheckbox('elasticsearch', './icons/Elasticsearch-Dark.svg');
  createCheckbox('electron', './icons/Electron.svg');
  createCheckbox('elixir', './icons/Elixir-Dark.svg');
  createCheckbox('elysia', './icons/Elysia-Dark.svg');
  createCheckbox('emacs', './icons/Emacs.svg');
  createCheckbox('ember', './icons/Ember.svg');
  createCheckbox('emotion', './icons/Emotion-Dark.svg');
  createCheckbox('express', './icons/ExpressJS-Dark.svg');
  createCheckbox('fastapi', './icons/FastAPI.svg');
  createCheckbox('fediverse', './icons/Fediverse-Dark.svg');
  createCheckbox('figma', './icons/Figma-Dark.svg');
  createCheckbox('firebase', './icons/Firebase-Dark.svg');
  createCheckbox('flask', './icons/Flask-Dark.svg');
  createCheckbox('flutter', './icons/Flutter-Dark.svg');
  createCheckbox('forth', './icons/Forth.svg');
  createCheckbox('fortran', './icons/Fortran.svg');
  createCheckbox('gamemakerstudio', './icons/GameMakerStudio.svg');
  createCheckbox('gatsby', './icons/Gatsby.svg');
  createCheckbox('gcp', './icons/GCP-Dark.svg');
  createCheckbox('git', './icons/Git.svg');
  createCheckbox('github', './icons/Github-Dark.svg');
  createCheckbox('githubactions', './icons/GithubActions-Dark.svg');
  createCheckbox('gitlab', './icons/GitLab-Dark.svg');
  createCheckbox('gmail', './icons/Gmail-Dark.svg');
  createCheckbox('gherkin', './icons/Gherkin-Dark.svg');
  createCheckbox('go', './icons/GoLang.svg');
  createCheckbox('gradle', './icons/Gradle-Dark.svg');
  createCheckbox('godot', './icons/Godot-Dark.svg');
  createCheckbox('grafana', './icons/Grafana-Dark.svg');
  createCheckbox('graphql', './icons/GraphQL-Dark.svg');
  createCheckbox('gtk', './icons/GTK-Dark.svg');
  createCheckbox('gulp', './icons/Gulp.svg');
  createCheckbox('haskell', './icons/Haskell-Dark.svg');
  createCheckbox('haxe', './icons/Haxe-Dark.svg');
  createCheckbox('haxeflixel', './icons/HaxeFlixel-Dark.svg');
  createCheckbox('heroku', './icons/Heroku.svg');
  createCheckbox('hibernate', './icons/Hibernate-Dark.svg');
  createCheckbox('html', './icons/HTML.svg');
  createCheckbox('htmx', './icons/Htmx-Dark.svg');
  createCheckbox('idea', './icons/Idea-Dark.svg');
  createCheckbox('ai', './icons/Illustrator.svg');
  createCheckbox('instagram', './icons/Instagram.svg');
  createCheckbox('ipfs', './icons/IPFS-Dark.svg');
  createCheckbox('java', './icons/Java-Dark.svg');
  createCheckbox('js', './icons/JavaScript.svg');
  createCheckbox('jenkins', './icons/Jenkins-Dark.svg');
  createCheckbox('jest', './icons/Jest.svg');
  createCheckbox('jquery', './icons/JQuery.svg');
  createCheckbox('kafka', './icons/Kafka.svg');
  createCheckbox('kali', './icons/Kali-Dark.svg');
  createCheckbox('kotlin', './icons/Kotlin-Dark.svg');
  createCheckbox('ktor', './icons/Ktor-Dark.svg');
  createCheckbox('kubernetes', './icons/Kubernetes.svg');
  createCheckbox('laravel', './icons/Laravel-Dark.svg');
  createCheckbox('latex', './icons/LaTeX-Dark.svg');
  createCheckbox('less', './icons/Less-Dark.svg');
  createCheckbox('linkedin', './icons/LinkedIn.svg');
  createCheckbox('linux', './icons/Linux-Dark.svg');
  createCheckbox('lit', './icons/Lit-Dark.svg');
  createCheckbox('lua', './icons/Lua-Dark.svg');
  createCheckbox('md', './icons/Markdown-Dark.svg');
  createCheckbox('mastodon', './icons/Mastodon-Dark.svg');
  createCheckbox('materialui', './icons/MaterialUI-Dark.svg');
  createCheckbox('matlab', './icons/Matlab-Dark.svg');
  createCheckbox('maven', './icons/Maven-Dark.svg');
  createCheckbox('mint', './icons/Mint-Dark.svg');
  createCheckbox('misskey', './icons/Misskey-Dark.svg');
  createCheckbox('mongodb', './icons/MongoDB.svg');
  createCheckbox('mysql', './icons/MySQL-Dark.svg');
  createCheckbox('neovim', './icons/NeoVim-Dark.svg');
  createCheckbox('nestjs', './icons/NestJS-Dark.svg');
  createCheckbox('netlify', './icons/Netlify-Dark.svg');
  createCheckbox('nextjs', './icons/NextJS-Dark.svg');
  createCheckbox('nginx', './icons/Nginx.svg');
  createCheckbox('nim', './icons/Nim-Dark.svg');
  createCheckbox('nix', './icons/Nix-Dark.svg');
  createCheckbox('nodejs', './icons/NodeJS-Dark.svg');
  createCheckbox('notion', './icons/Notion-Dark.svg');
  createCheckbox('npm', './icons/Npm-Dark.svg');
  createCheckbox('nuxtjs', './icons/NuxtJS-Dark.svg');
  createCheckbox('obsidian', './icons/Obsidian-Dark.svg');
  createCheckbox('ocaml', './icons/OCaml.svg');
  createCheckbox('octave', './icons/Octave-Dark.svg');
  createCheckbox('opencv', './icons/OpenCV-Dark.svg');
  createCheckbox('openshift', './icons/OpenShift.svg');
  createCheckbox('openstack', './icons/OpenStack-Dark.svg');
  createCheckbox('p5js', './icons/p5js.svg');
  createCheckbox('perl', './icons/Perl.svg');
  createCheckbox('ps', './icons/Photoshop.svg');
  createCheckbox('php', './icons/PHP-Dark.svg');
  createCheckbox('phpstorm', './icons/PhpStorm-Dark.svg');
  createCheckbox('pinia', './icons/Pinia-Dark.svg');
  createCheckbox('pkl', './icons/Pkl-Dark.svg');
  createCheckbox('plan9', './icons/Plan9-Dark.svg');
  createCheckbox('planetscale', './icons/PlanetScale-Dark.svg');
  createCheckbox('pnpm', './icons/Pnpm-Dark.svg');
  createCheckbox('postgres', './icons/PostgreSQL-Dark.svg');
  createCheckbox('postman', './icons/Postman.svg');
  createCheckbox('powershell', './icons/Powershell-Dark.svg');
  createCheckbox('pr', './icons/Premiere.svg');
  createCheckbox('prisma', './icons/Prisma.svg');
  createCheckbox('processing', './icons/Processing-Dark.svg');
  createCheckbox('prometheus', './icons/Prometheus.svg');
  createCheckbox('pug', './icons/Pug-Dark.svg');
  createCheckbox('pycharm', './icons/PyCharm-Dark.svg');
  createCheckbox('py', './icons/Python-Dark.svg');
  createCheckbox('pytorch', './icons/PyTorch-Dark.svg');
  createCheckbox('qt', './icons/QT-Dark.svg');
  createCheckbox('r', './icons/R-Dark.svg');
  createCheckbox('rabbitmq', './icons/RabbitMQ-Dark.svg');
  createCheckbox('rails', './icons/Rails.svg');
  createCheckbox('raspberrypi', './icons/RaspberryPi-Dark.svg');
  createCheckbox('react', './icons/React-Dark.svg');
  createCheckbox('reactivex', './icons/ReactiveX-Dark.svg');
  createCheckbox('redhat', './icons/RedHat-Dark.svg');
  createCheckbox('redis', './icons/Redis-Dark.svg');
  createCheckbox('redux', './icons/Redux.svg');
  createCheckbox('regex', './icons/Regex-Dark.svg');
  createCheckbox('remix', './icons/Remix-Dark.svg');
  createCheckbox('replit', './icons/Replit-Dark.svg');
  createCheckbox('rider', './icons/Rider-Dark.svg');
  createCheckbox('robloxstudio', './icons/RobloxStudio.svg');
  createCheckbox('rocket', './icons/Rocket.svg');
  createCheckbox('rollupjs', './icons/RollupJS-Dark.svg');
  createCheckbox('ros', './icons/ROS-Dark.svg');
  createCheckbox('ruby', './icons/Ruby.svg');
  createCheckbox('rust', './icons/Rust.svg');
  createCheckbox('sass', './icons/Sass.svg');
  createCheckbox('spring', './icons/Spring-Dark.svg');
  createCheckbox('sqlite', './icons/SQLite.svg');
  createCheckbox('stackoverflow', './icons/StackOverflow-Dark.svg');
  createCheckbox('styledcomponents', './icons/StyledComponents.svg');
  createCheckbox('sublime', './icons/Sublime-Dark.svg');
  createCheckbox('supabase', './icons/Supabase-Dark.svg');
  createCheckbox('scala', './icons/Scala-Dark.svg');
  createCheckbox('sklearn', './icons/ScikitLearn-Dark.svg');
  createCheckbox('selenium', './icons/Selenium.svg');
  createCheckbox('sentry', './icons/Sentry.svg');
  createCheckbox('sequelize', './icons/Sequelize-Dark.svg');
  createCheckbox('sketchup', './icons/Sketchup-Dark.svg');
  createCheckbox('solidity', './icons/Solidity.svg');
  createCheckbox('solidjs', './icons/SolidJS-Dark.svg');
  createCheckbox('svelte', './icons/Svelte.svg');
  createCheckbox('svg', './icons/SVG-Dark.svg');
  createCheckbox('swift', './icons/Swift.svg');
  createCheckbox('symfony', './icons/Symfony-Dark.svg');
  createCheckbox('tailwind', './icons/TailwindCSS-Dark.svg');
  createCheckbox('tauri', './icons/Tauri-Dark.svg');
  createCheckbox('tensorflow', './icons/TensorFlow-Dark.svg');
  createCheckbox('terraform', './icons/Terraform-Dark.svg');
  createCheckbox('threejs', './icons/ThreeJS-Dark.svg');
  createCheckbox('twitter', './icons/Twitter.svg');
  createCheckbox('ts', './icons/TypeScript.svg');
  createCheckbox('ubuntu', './icons/Ubuntu-Dark.svg');
  createCheckbox('unity', './icons/Unity-Dark.svg');
  createCheckbox('unreal', './icons/UnrealEngine.svg');
  createCheckbox('v', './icons/V-Dark.svg');
  createCheckbox('vala', './icons/Vala.svg');
  createCheckbox('vercel', './icons/Vercel-Dark.svg');
  createCheckbox('vim', './icons/VIM-Dark.svg');
  createCheckbox('visualstudio', './icons/VisualStudio-Dark.svg');
  createCheckbox('vite', './icons/Vite-Dark.svg');
  createCheckbox('vitest', './icons/Vitest-Dark.svg');
  createCheckbox('vscode', './icons/VSCode-Dark.svg');
  createCheckbox('vscodium', './icons/VSCodium-Dark.svg');
  createCheckbox('vue', './icons/VueJS-Dark.svg');
  createCheckbox('vuetify', './icons/Vuetify-Dark.svg');
  createCheckbox('wasm', './icons/WebAssembly.svg');
  createCheckbox('webflow', './icons/Webflow.svg');
  createCheckbox('webpack', './icons/Webpack-Dark.svg');
  createCheckbox('webstorm', './icons/WebStorm-Dark.svg');
  createCheckbox('windicss', './icons/WindiCSS-Dark.svg');
  createCheckbox('windows', './icons/Windows-Dark.svg');
  createCheckbox('wordpress', './icons/Wordpress.svg');
  createCheckbox('workers', './icons/Workers-Dark.svg');
  createCheckbox('xd', './icons/XD.svg');
  createCheckbox('yarn', './icons/Yarn-Dark.svg');
  createCheckbox('yew', './icons/Yew-Dark.svg');
  createCheckbox('zig', './icons/Zig-Dark.svg');
});