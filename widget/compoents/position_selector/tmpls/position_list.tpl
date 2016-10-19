{% for item in data %}
  {% if item.type == 'all' %}
    <a href="javascript:void(0)" data-text="{{ item.text }}" class="position-item-all" data-id="{{ item.id }}" data-deep="{{ item.deep }}">{{ item.name }}</a>
  {% else %}
    <a href="javascript:void(0)" data-text="{{ item.name }}" class="position-item" data-id="{{ item.id }}" data-deep="{{ deep }}">{{ item.name }}</a>
  {% endif %}
{% endfor %}