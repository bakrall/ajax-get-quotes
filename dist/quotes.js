!function(){"use strict";const t=$(".quote"),e=$(".quote-author"),o=($(".quote-container"),$(".get-quote-button")),a=($(".image-container"),$(".credits-link")),n=$(".photographer"),r={red:"Annie Spratt",green:"Nate Johnston"};$(".auxiliary").data("json");let s,c,u=!1;function l(t){const e={"&":"&amp;","'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","\\":"&#x5c;","`":"&#x60;",":":"&#58;"};return t.replace(/[&"'<>\\`:]/g,(function(t){return e[t]}))}function d(){return $.ajax({type:"GET",url:"https://gist.githubusercontent.com/bakrall/8c4987127e2f093c93415e29b2a01564/raw/91f7a495dbc0eb35984d8790710fc9c3524d124b/quotes.json",success:function(t){const e=JSON.parse(t),o=Math.floor(3*Math.random());!function(t){localStorage.setItem("quotes",t)}(t),s=l(e[o].text),c=l(e[o].author)},error:function(t){console.log(t.statusText)}})}function i(){g(s,c,1500),$("body").hasClass("red")?$("body").removeClass("red").addClass("green"):$("body").removeClass("green").addClass("red"),function(){const t=$("body").attr("class"),e=r[t];a.fadeOut(2e3,()=>{n.text(e),a.fadeIn(2e3)})}(),localStorage.setItem("quoteStored",s),localStorage.setItem("quoteAuthorStored",c)}function f(){if(!u)if(u=!0,localStorage.getItem("quotes")){const t=JSON.parse(localStorage.getItem("quotes")),e=Math.floor(3*Math.random());s=l(t[e].text),c=l(t[e].author),i()}else{d().done(()=>{i()}).fail(t=>{console.log(t.statusText)})}}function g(o="",a="",n=0){$.each([t,e],(r,s)=>{$(s).fadeOut(n,()=>{t.html(o),e.html(a)}).fadeIn(n,()=>{u=!1})})}!function(){const t=localStorage.getItem("quoteStored"),e=localStorage.getItem("quoteAuthorStored");t&&e?g(t,e):f()}(),o.on("click",f)}();