---
layout: default
title: All News
permalink: /news/
---

# News & Updates Archive

<div class="news-archive">
  {% assign sorted_news = site.news | sort: 'date' | reverse %}
  
  {% for news_item in sorted_news %}
  <div class="news-item">
    <div class="news-date">
      <div class="news-date-inner">
        <span class="news-month">{{ news_item.date | date: "%b" }}</span>
        <span class="news-day">{{ news_item.date | date: "%-d" }}</span>
        <span class="news-year">{{ news_item.date | date: "%Y" }}</span>
      </div>
    </div>
    <div class="news-content">
      <div class="news-excerpt">{{ news_item.content }}</div>
    </div>
  </div>
  {% endfor %}
</div>