!function(){"use strict";const t=$(".quote"),e=$(".quote-author"),o=($(".quote-container"),$(".get-quote-button")),a=($(".image-container"),$(".credits-link")),n=$(".photographer"),s=$("html"),r={red:"Annie Spratt",green:"Nate Johnston"};$(".auxiliary").data("json");let c,l,u=!1;function i(t){const e={"&":"&amp;","'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","\\":"&#x5c;","`":"&#x60;",":":"&#58;"};return t.replace(/[&"'<>\\`:]/g,(function(t){return e[t]}))}function d(){return $.ajax({type:"GET",url:"https://gist.githubusercontent.com/bakrall/8c4987127e2f093c93415e29b2a01564/raw/8f24e6e5a03554ef6341365b734d0f39b961edbf/quotes.json",success:function(t){const e=JSON.parse(t),o=Math.floor(3*Math.random());!function(t){localStorage.setItem("quotes",t)}(t),c=i(e[o].text),l=i(e[o].author)},error:function(t){console.log(t.statusText)}})}function f(){if(!u)if(u=!0,localStorage.getItem("quotes")){const t=JSON.parse(localStorage.getItem("quotes")),e=Math.floor(6*Math.random());c=i(t[e].text),l=i(t[e].author),g(1500,!0)}else{d().done(()=>{g(0,!1)}).fail(t=>{console.log(t.statusText)})}}function g(o,s){!function(o="",a="",n=0){$.each([t,e],(s,r)=>{$(r).fadeOut(n,()=>{t.html(o),e.html(a)}).fadeIn(n,()=>{u=!1})})}(c,l,o),localStorage.setItem("quoteStored",c),localStorage.setItem("quoteAuthorStored",l),s&&(setTimeout(()=>{$("body").hasClass("red")?$("body").removeClass("red").addClass("green"):$("body").removeClass("green").addClass("red")},300),function(){const t=$("body").attr("class"),e=r[t];a.fadeOut(1500,()=>{n.text(e),a.fadeIn(1500)})}())}o.on("click",f),$(window).on("scroll",(function(){const t=s.get(0).clientHeight+"px";s.css("--height",t),console.log("adjustHeight")})),localStorage.clear(),f()}();