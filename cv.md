---
layout: default
title: CV
permalink: /cv/
---

<div class="cv-container">
  <h1>Curriculum Vitae</h1>
  
  <!-- Work Experience Section -->
  <section class="cv-section">
    <h2 class="cv-section-title">Work Experience</h2>
    
    {% for job in site.data.cv.work_experience %}
    <div class="cv-entry">
      <div class="cv-entry-content">
        <div class="cv-entry-header">
          <div class="cv-entry-title">{{ job.position }}</div>
          <div class="cv-entry-company">{{ job.company }}, {{ job.location }}</div>
        </div>
        
        <div class="cv-entry-period">
          <span class="cv-date">{{ job.start_date | date: "%b %Y" }}</span> – 
          <span class="cv-date">{% if job.end_date == "Present" %}{{ job.end_date }}{% else %}{{ job.end_date | date: "%b %Y" }}{% endif %}</span>
        </div>
        
        <div class="cv-entry-description">
          {{ job.description }}
        </div>
      </div>
      
      {% if job.image %}
      <div class="cv-entry-image" style="background-color: #ffffff !important;">
        <img src="{{ job.image }}" alt="{{ job.company }} logo" style="background-color: #ffffff !important;">
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </section>
  
  <!-- Education Section -->
  <section class="cv-section">
    <h2 class="cv-section-title">Education</h2>
    
    {% for edu in site.data.cv.education %}
    <div class="cv-entry">
      <div class="cv-entry-content">
        <div class="cv-entry-header">
          <div class="cv-entry-title">{{ edu.degree }}</div>
          <div class="cv-entry-company">{{ edu.institution }}, {{ edu.location }}</div>
        </div>
        
        <div class="cv-entry-period">
          <span class="cv-date">{{ edu.start_date | date: "%b %Y" }}</span> – 
          <span class="cv-date">{% if edu.end_date == "Present" %}{{ edu.end_date }}{% else %}{{ edu.end_date | date: "%b %Y" }}{% endif %}</span>
        </div>
        
        <div class="cv-entry-description">
          {{ edu.description }}
        </div>
      </div>
      
      {% if edu.image %}
      <div class="cv-entry-image" style="background-color: #ffffff !important;">
        <img src="{{ edu.image }}" alt="{{ edu.institution }} logo" style="background-color: #ffffff !important;">
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </section>
  
  <!-- Languages Section -->
  <section class="cv-section">
    <h2 class="cv-section-title">Languages</h2>
    
    <div class="languages-grid">
      {% for language in site.data.cv.languages %}
      <div class="language-item">
        <span class="language-flag">{{ language.flag }}</span>
        <div class="language-details">
          <div class="language-name">{{ language.name }}</div>
          <div class="language-proficiency">{{ language.proficiency }}</div>
        </div>
      </div>
      {% endfor %}
    </div>
  </section>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Ensure CV logo containers have white backgrounds in dark mode
    const setWhiteLogoBackgrounds = function() {
      const logoContainers = document.querySelectorAll('.cv-entry-image');
      logoContainers.forEach(container => {
        container.style.backgroundColor = '#ffffff';
        const logoImg = container.querySelector('img');
        if (logoImg) {
          logoImg.style.backgroundColor = '#ffffff';
        }
      });
    };
    
    // Run on page load
    setWhiteLogoBackgrounds();
    
    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'data-theme') {
          setWhiteLogoBackgrounds();
        }
      });
    });
    
    // Start observing for theme changes
    observer.observe(document.documentElement, { attributes: true });
  });
</script>