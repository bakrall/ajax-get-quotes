!function(){"use strict";const t=$(".quote"),e=$(".quote-author"),o=($(".quote-container"),$(".get-quote-button")),n=($(".image-container"),$(".credits-link")),a=$(".photographer"),r={red:"Annie Spratt",green:"Nate Johnston"};$(".auxiliary").data("json");let u,s;function c(t){const e={"&":"&amp;","'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","\\":"&#x5c;","`":"&#x60;",":":"&#58;"};return t.replace(/[&"'<>\\`:]/g,(function(t){return e[t]}))}function l(){return $.ajax({type:"GET",url:"https://gist.githubusercontent.com/bakrall/8c4987127e2f093c93415e29b2a01564/raw/91f7a495dbc0eb35984d8790710fc9c3524d124b/quotes.json",success:function(t){const e=JSON.parse(t),o=Math.floor(3*Math.random());!function(t){localStorage.setItem("quotes",t)}(t),u=c(e[o].text),s=c(e[o].author)},error:function(t){console.log(t.statusText)}})}function d(){f(u,s,1500),$("body").hasClass("red")?$("body").removeClass("red").addClass("green"):$("body").removeClass("green").addClass("red"),function(){const t=$("body").attr("class"),e=r[t];n.fadeOut(2e3,()=>{a.text(e),n.fadeIn(2e3)})}(),localStorage.setItem("quoteStored",u),localStorage.setItem("quoteAuthorStored",s)}function i(){if(localStorage.getItem("quotes")){const t=JSON.parse(localStorage.getItem("quotes")),e=Math.floor(3*Math.random());u=c(t[e].text),s=c(t[e].author),d()}else{l().done(()=>{d()}).fail(t=>{console.log(t.statusText)})}}function f(o="",n="",a=0){$.each([t,e],(r,u)=>{$(u).fadeOut(a,()=>{t.html(o),e.html(n)}).fadeIn(a)})}!function(){const t=localStorage.getItem("quoteStored"),e=localStorage.getItem("quoteAuthorStored");"undefined"!==t&&"undefined"!==e&&(null!==t&&null!==e)?f(t,e):i()}(),o.on("click",i)}();