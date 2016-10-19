
{%html framework="user:static/lib/third/mod.js"%}
    {%head%}
    <meta charset="UTF-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
    {%require name="user:static/lib/third/jquery.js"%}
    {%require name="user:static/lib/third/jsmod.js"%}
    {%require name="user:static/lib/third/swig.min.js"%}
    {%require name="user:static/lib/third/jsmod.extend.js"%}

    {%require name="user:static/lib/self/widget.js"%}
    {%require name="user:static/lib/self/listener.js"%}
    {%require name="user:static/lib/self/jsmod.self.less"%}

    {%require name="user:static/lib/third/font-awesome/font-awesome.css"%}
    {%require name="user:static/css/common.css"%}

    {%block  name="sub-head"%}
    {%/block%}
    {%/head%}
    {%body%}
        <div class="wrapper">
          {%block name="header"%}
            {%widget name="/widget/header/header.tpl"%}
          {%/block%}
          <div class="body">
            {%block name="main"%}{%/block%}
          </div>
          {%block name="footer"%}
            {%widget name="/widget/footer/footer.tpl"%}
          {%/block%}
        </div>
    {%/body%}
{%/html%}
