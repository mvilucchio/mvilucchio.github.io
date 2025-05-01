---
layout: default
title: Other
permalink: /other/
---

# Other Interests

Beyond my academic work, I have several other interests and projects.

<section id="album-section">
  <h2>Favorite Albums</h2>
  <p>A collection of albums that have been influential to me across various genres. Hover over any album cover to see details.</p>

  <div id="album-container">
    <!-- Albums will be dynamically inserted by JavaScript -->
  </div>
</section>

<script>
  // Store album data for JavaScript access
  window.siteAlbums = [
    {% for album in site.data.albums %}
    {
      title: "{{ album.title }}",
      artist: "{{ album.artist }}",
      year: {{ album.year }},
      cover: "{{ album.coverlink }}",
      {% if album.link %}link: "{{ album.link }}"{% else %}link: null{% endif %}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>

<script src="/assets/js/albums.js?v=3"></script>
