const openButton = document.querySelector("#openMenu");
const dialog = document.querySelector("dialog");

openButton.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener("click", ({ target: dialog }) => {
    if (dialog.nodeName === "DIALOG") {
        dialog.close("dismiss");
    }
});

// btn column 
let columnBtn = document.getElementById('columnBtn');
let main = document.getElementById('main');
let lang = document.getElementById('lang');

let nnn = 0;
columnBtn.addEventListener('click', () => {
    nnn++;

    if (nnn == 1) {
        main.style.display = "flex";
        main.style.justifyContent = "center";
        main.style.alignContent = "center";
        main.style.flexDirection = "column";
        main.style.flexWrap = "none";
    }
    if (nnn == 2) {
        main.style.display = "flex";
        main.style.flexWrap = "none";
        main.style.justifyContent = "center";
        main.style.alignContent = "center";
        main.style.flexDirection = "column";
        main.style.flexWrap = "wrap";
        main.style.flexDirection = "none";
        nnn = 0;
    }

    console.log(nnn);
})

// Function to create a checkbox input element
function createCheckbox(langName, iconSrc) {
    let langElement = document.createElement('div');
    langElement.id = 'lang';

    let nameLang = document.createElement('p');
    nameLang.id = 'nameLang';
    nameLang.textContent = `| ${langName} |`;

    let icon = document.createElement('img');
    icon.src = iconSrc;
    icon.width = 48;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = localStorage.getItem(langName) === 'true'; // Retrieve the state from localStorage

    // Add event listener to save the checkbox state to localStorage when checked/unchecked
    checkbox.addEventListener('change', () => {
        localStorage.setItem(langName, checkbox.checked); // Save state to localStorage
    });

    // Add click event listener to toggle card background color and text color
    checkbox.addEventListener('click', () => {
        // Check if the card is already active
        const isActive = langElement.classList.contains('active');

        if (isActive) {
            langElement.classList.remove('active');
            langElement.style.backgroundColor = '';
            langElement.style.color = '';
            localStorage.removeItem(`${langName}-active`);
        } else {
            langElement.classList.add('active');
            langElement.style.backgroundColor = 'rgba(0, 0, 0, 0.533)';
            langElement.style.color = 'rgb(255, 255, 255)';
            localStorage.setItem(`${langName}-active`, true); // Save the active state

        }
    });

    langElement.appendChild(nameLang);
    langElement.appendChild(icon);
    langElement.appendChild(checkbox);

    // Check if the card is active from localStorage
    if (localStorage.getItem(`${langName}-active`) === 'true') {
        langElement.style.backgroundColor = 'rgba(0, 0, 0, 0.533)';
        langElement.style.color = 'rgb(255, 255, 255)';
        langElement.classList.add('active');
    }

    main.appendChild(langElement);
}

// Call the function with different values
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