---
layout: default
title: Publications
permalink: /publications/
---

# Publications and Research

{% assign all_pubs = site.data.publications | sort: 'year' | reverse %}
{% assign papers = all_pubs | where: "type", "publication" %}
{% assign preprints = all_pubs | where: "type", "preprint" %}

<div class="section-tabs">
  <button class="section-tab active" data-section="publications-section">Publications</button>
  <button class="section-tab" data-section="preprints-section">Preprints</button>
</div>

<section id="publications-section" class="publication-section active">
  <h2 class="section-title">Publications</h2>
  
  {% assign pub_years = papers | map: 'year' | uniq %}
  {% for year in pub_years %}
    <div class="year-section">
      <h3 class="year">{{ year }}</h3>
      
      {% for pub in papers %}
        {% if pub.year == year %}
          <div class="publication">
            <div class="publication-title">
              {{ pub.title }}
            </div>
            
            <div class="publication-authors">
              {{ pub.authors }}
            </div>
            
            <div class="publication-venue">
              <em>{{ pub.venue }}</em>, {{ pub.year }}
            </div>
            
            <div class="publication-links">
              {% if pub.abstract %}
                <a class="abstract-toggle" data-pub-id="pub-{{ forloop.index }}">Abstract</a>
                <div class="abstract-content" id="abstract-pub-{{ forloop.index }}" style="display: none;">
                  {{ pub.abstract }}
                </div>
              {% endif %}
              
              {% if pub.bibtex %}
                <a class="bibtex-toggle" data-pub-id="pub-{{ forloop.index }}">BibTeX</a>
                <div class="bibtex-content" id="bibtex-pub-{{ forloop.index }}" style="display: none;">
                  <pre><code>{{ pub.bibtex }}</code></pre>
                  <button class="copy-bibtex" data-bibtex-id="pub-{{ forloop.index }}">Copy to clipboard</button>
                </div>
              {% endif %}
              
              {% if pub.doi %}
                <a href="{{ pub.doi }}" target="_blank">DOI</a>
              {% endif %}
              
              {% if pub.pdf %}
                <a href="{{ pub.pdf }}" target="_blank" class="pdf-link">PDF</a>
              {% endif %}
              
              {% if pub.code %}
                <a href="{{ pub.code }}" target="_blank">Code</a>
              {% endif %}
              
              {% if pub.slides %}
                <a href="{{ pub.slides }}" target="_blank">Slides</a>
              {% endif %}
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  {% endfor %}
</section>

<section id="preprints-section" class="publication-section">
  <h2 class="section-title">Preprints</h2>
  
  {% assign preprint_years = preprints | map: 'year' | uniq %}
  {% for year in preprint_years %}
    <div class="year-section">
      <h3 class="year">{{ year }}</h3>
      
      {% for pub in preprints %}
        {% if pub.year == year %}
          <div class="publication">
            <div class="publication-title">
              {{ pub.title }}
            </div>
            
            <div class="publication-authors">
              {{ pub.authors }}
            </div>
            
            <div class="publication-venue">
              <em>{{ pub.venue }}</em>, {{ pub.year }}
            </div>
            
            <div class="publication-links">
              {% if pub.abstract %}
                <a class="abstract-toggle" data-pub-id="pre-{{ forloop.index }}">Abstract</a>
                <div class="abstract-content" id="abstract-pre-{{ forloop.index }}" style="display: none;">
                  {{ pub.abstract }}
                </div>
              {% endif %}
              
              {% if pub.bibtex %}
                <a class="bibtex-toggle" data-pub-id="pre-{{ forloop.index }}">BibTeX</a>
                <div class="bibtex-content" id="bibtex-pre-{{ forloop.index }}" style="display: none;">
                  <pre><code>{{ pub.bibtex }}</code></pre>
                  <button class="copy-bibtex" data-bibtex-id="pre-{{ forloop.index }}">Copy to clipboard</button>
                </div>
              {% endif %}
              
              {% if pub.arxiv %}
                <a href="https://arxiv.org/abs/{{ pub.arxiv }}" target="_blank">arXiv</a>
              {% endif %}
              
              {% if pub.doi %}
                <a href="{{ pub.doi }}" target="_blank">DOI</a>
              {% endif %}
              
              {% if pub.pdf %}
                <a href="{{ pub.pdf }}" target="_blank" class="pdf-link">PDF</a>
              {% endif %}
              
              {% if pub.code %}
                <a href="{{ pub.code }}" target="_blank">Code</a>
              {% endif %}
              
              {% if pub.slides %}
                <a href="{{ pub.slides }}" target="_blank">Slides</a>
              {% endif %}
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  {% endfor %}
</section>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Section tabs functionality
    const sectionTabs = document.querySelectorAll('.section-tab');
    const sections = document.querySelectorAll('.publication-section');
    
    sectionTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and sections
        sectionTabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding section
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
      });
    });
    
    // Add click handlers for abstract toggles
    const abstractToggles = document.querySelectorAll('.abstract-toggle');
    abstractToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const pubId = this.getAttribute('data-pub-id');
        const abstract = document.getElementById('abstract-' + pubId);
        
        if (abstract.style.display === 'none') {
          abstract.style.display = 'block';
          this.textContent = 'Hide Abstract';
        } else {
          abstract.style.display = 'none';
          this.textContent = 'Abstract';
        }
      });
    });
    
    // Add click handlers for bibtex toggles
    const bibtexToggles = document.querySelectorAll('.bibtex-toggle');
    bibtexToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const pubId = this.getAttribute('data-pub-id');
        const bibtex = document.getElementById('bibtex-' + pubId);
        
        if (bibtex.style.display === 'none') {
          bibtex.style.display = 'block';
          this.textContent = 'Hide BibTeX';
        } else {
          bibtex.style.display = 'none';
          this.textContent = 'BibTeX';
        }
      });
    });
    
    // Add click handlers for copy buttons
    const copyButtons = document.querySelectorAll('.copy-bibtex');
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const bibtexId = this.getAttribute('data-bibtex-id');
        const bibtexContent = document.querySelector(`#bibtex-${bibtexId} pre code`).textContent;
        
        navigator.clipboard.writeText(bibtexContent).then(() => {
          // Show copied feedback
          const originalText = this.textContent;
          this.textContent = 'Copied!';
          
          // Reset button text after 2 seconds
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      });
    });
  });
</script>