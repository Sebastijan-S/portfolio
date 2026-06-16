// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const siblings = e.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      let delay = 0;
      siblings.forEach(el => {
        if (el === e.target || el.getBoundingClientRect().top < window.innerHeight) {
          setTimeout(() => el.classList.add('visible'), delay);
          delay += 80;
        }
      });
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.querySelector('.modal-subtitle');
const modalDetails = document.querySelector('.modal-details');
const modalCopy = document.querySelector('.modal-copy');

const cards = document.querySelectorAll('.work-card');
cards.forEach(card => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    const title = card.querySelector('.card-title')?.textContent?.trim() || 'Project title';
    const description = card.querySelector('.card-desc')?.textContent?.trim() || '';
    const detailValues = modalDetails.querySelectorAll('strong');

    modalTitle.textContent = title;
    modalSubtitle.textContent = description;
    if (detailValues.length >= 3) {
      detailValues[0].textContent = 'Product Design, Webflow & Framer Development, AI Integration';
      detailValues[1].textContent = '6–8 weeks';
      detailValues[2].textContent = 'Visual concept, website build, integration setup';
    }
    modalCopy.querySelector('.modal-block:nth-of-type(1) p').textContent = 'The client needed a website with clear messaging, improved conversion, and a stronger editorial experience. The existing workflow created handoff friction and slowed launch timelines.';
    modalCopy.querySelector('.modal-block:nth-of-type(2) p').textContent = 'I used Figma to define the visual system, then built the site in Webflow/Framer while integrating AI-powered content workflows for faster updates and polished interactions.';

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

const closeModal = () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
