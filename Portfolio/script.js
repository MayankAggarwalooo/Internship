// home_screen.html
    const roles = ["Developer & Learner.", "Graphics Designer","Tech Enthusiast.", "Problem Solver."];
    let i = 0;
    const typeElement = document.getElementById("typewriter");

    function typeWriter() {
      let role = roles[i];
      let index = 0;
      typeElement.textContent = "";
      const interval = setInterval(() => {
        if (index < role.length) {
          typeElement.textContent += role.charAt(index);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            i = (i + 1) % roles.length;
            typeWriter();
          }, 1000);
        }
      }, 100);
    }
    typeWriter();

//about_me.html
 const images = document.querySelectorAll('.wave-track img');
  const delays = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2];
  images.forEach((img, index) => {
    const delay = delays[index % delays.length];
    img.style.animationDelay = `${delay}s`;
  });

//project.html
  const thumbs = document.querySelectorAll('.thumb');
    const infoImg = document.getElementById('info-img');
    const infoTitle = document.getElementById('info-title');
    const infoDesc = document.getElementById('info-desc');
    const infoFull = document.getElementById('info-full');
    const infoFeatures = document.getElementById('info-features');
    const infoGoal = document.getElementById('info-goal');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        infoImg.src = thumb.dataset.img;
        infoTitle.textContent = thumb.dataset.title;
        infoDesc.textContent = thumb.dataset.desc;
        infoFull.textContent = thumb.dataset.full;
        infoFeatures.innerHTML = thumb.dataset.features;
        infoGoal.textContent = thumb.dataset.goal;
      });
    });

    const modalImgBox = document.getElementById("imageModal");
    const modalImgContent = document.getElementById("modalImg");
    const close = document.querySelector(".close");

    infoImg.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    }

    close.onclick = function () {
      modal.style.display = "none";
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

//certificates.html
 const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');

    function openModal(src) {
      modal.style.display = 'flex';
      modalImg.src = src;
    }

    function closeModal(event) {
      if (event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
        modalImg.src = '';
      }
    }