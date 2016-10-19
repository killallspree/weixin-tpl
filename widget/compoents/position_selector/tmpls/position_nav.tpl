{% for i,item in data %}
  <a class="position-nav-item" data-idx="{{ i }}" data-id="{{ item.id }}" data-deep="item.deep" href="javascript:void(0)">
    {{ item.name }}<i class="fa fa-times" aria-hidden="true"></i>
  </a>
{% endfor %}