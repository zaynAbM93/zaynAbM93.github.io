/*Typewriter*/

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["طراح سایت", "توسعه‌دهنده وب"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}




/*header active buttons */

function activatedHeaderBtn(section) {
  document.querySelectorAll(".link").forEach(function (btn) {
    btn.classList.remove("active-btn");
  });
  if (section) {
    section.classList.add("active-btn");
  }
} 

document.querySelectorAll(".link").forEach(function (section){
section.addEventListener("click", function() {
  activatedHeaderBtn(section);
})
})




/*Portfolio category menu*/

const projects = [
  {
    title: "Anime Introduction",
    img: "assets/img/project-1.jpg",
    category: "web",
    link: "https://zmotallebi.neocities.org/",
  },
  {
    title: "Education Site",
    img: "assets/img/project-2.png",
    category: "web",
    link:"https://reyaedu.github.io",
  },
  {
    title: "Simple Calculator",
    img: "assets/img/project-3.webp",
    category: "js",
    link: "https://zaynab793.github.io/",
  },
  {
    title: "Driving School",
    img: "assets/img/project-4.jpg",
    category: "web",
    link: "https://chicanomada.neocities.org",
  },
  {
    title: "Restaurant Menu",
    img: "assets/img/project-5.jpeg",
    category: "web",
    link: "https://rcatm.github.io/",
  },
  {
    title: "Portfolio",
    img: "assets/img/Software-1024x683.jpg",
    category:"js",
    link: "https://zaynabm93.github.io/",
  },
  
];

function activateTheButton(project) {
  document.querySelectorAll(".category-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  if (project) {
    project.classList.add("active");
  }
}

function setButtonCategories() {
  const categoryMenu = document.getElementById("category-menu");
  const categories = projects.reduce(
    function (values, project) {
      if (project && project.category && !values.includes(project.category)) {
        values.push(project.category);
      }
      return values;
    },
    ["all"]
  );
  const buttons = categories.map(function (category) {
    const classList = category === "all" ? "category-btn active" : "category-btn";
    return `<button class="${classList}" data-id=${category}>${category}</button>`;
  });
  categoryMenu.innerHTML = buttons.join("");

  document.querySelectorAll(".category-btn").forEach(function (project) {
    const categoryType = project.getAttribute("data-id");
    project.addEventListener("click", function () {
      activateTheButton(project);
      if (categoryType === "all") {
        displayProjects(projects);
        return;
      }
      const filteredMenu = projects.filter(function (project) {
        return project.category === categoryType;
      });
      displayProjects(filteredMenu);
    });
  });
}

function displayProjects(projects) {
  const menuWrapper = document.getElementById("projects-gallery");
  if (projects) {
    menuWrapper.innerHTML = projects
      .map(function (project) {
        return `<div class="col-lg-4 col-md-6 wow animate__animated animate__bounceIn animate__slow 1s project-container">
        <figure class=" project">
          <img src="${project.img}" alt="" />
          <figcaption class="project-details">
            <h4>${project.title}</h4>
            <h5>${project.category}</h5>
            <a href="${project.link}" target="_blank">
              <i class="fa-solid fa-link"></i>
            </a>
          </figcaption>
        </figure>
      </div>`;
      })
      .join("");
  }
}



document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
  // category menu
  setButtonCategories();
  displayProjects(projects);
});
