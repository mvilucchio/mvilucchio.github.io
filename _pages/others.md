---
layout: page
permalink: /others/
title: others...
description: 
nav: true
nav_order: 10
---

# Favorite Albums

<div class="grid-library">
    {% for album in site.data.albums %}
        <div class="library-element">
            <img src="{{ album.coverlink }}" alt="{{ album.title }}">
            <div class="library-content">
                <div class="library-title">{{ album.title }}</div>
                <div class="library-artist">{{ album.artist }}</div>
                <div class="library-year">{{ album.year }}</div>
            </div>
        </div>
    {% endfor%}
</div>
