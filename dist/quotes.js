!function(){"use strict";const t=$(".quote"),e=$(".quote-author"),o=($(".quote-container"),$(".get-quote-button"),$(".image-container"),$(".credits-link")),a=$(".photographer"),n={red:"Annie Spratt",green:"Nate Johnston"};$(".auxiliary").data("json");let r,s,u=!1;function c(t){const e={"&":"&amp;","'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","\\":"&#x5c;","`":"&#x60;",":":"&#58;"};return t.replace(/[&"'<>\\`:]/g,(function(t){return e[t]}))}function l(){return $.ajax({type:"GET",url:"https://gist.githubusercontent.com/bakrall/8c4987127e2f093c93415e29b2a01564/raw/8f24e6e5a03554ef6341365b734d0f39b961edbf/quotes.json",success:function(t){const e=JSON.parse(t),o=Math.floor(3*Math.random());!function(t){localStorage.setItem("quotes",t)}(t),r=c(e[o].text),s=c(e[o].author)},error:function(t){console.log(t.statusText)}})}function d(c,l){!function(o="",a="",n=0){$.each([t,e],(r,s)=>{$(s).fadeOut(n,()=>{t.html(o),e.html(a)}).fadeIn(n,()=>{u=!1})})}(r,s,c),localStorage.setItem("quoteStored",r),localStorage.setItem("quoteAuthorStored",s),l&&($("body").hasClass("red")?$("body").removeClass("red").addClass("green"):$("body").removeClass("green").addClass("red"),function(){const t=$("body").attr("class"),e=n[t];o.fadeOut(2e3,()=>{a.text(e),o.fadeIn(2e3)})}())}localStorage.clear(),function(){if(!u)if(u=!0,localStorage.getItem("quotes")){const t=JSON.parse(localStorage.getItem("quotes")),e=Math.floor(6*Math.random());r=c(t[e].text),s=c(t[e].author),d(1500,!0)}else l().done(()=>{d(0,!1)}).fail(t=>{console.log(t.statusText)})}()}();