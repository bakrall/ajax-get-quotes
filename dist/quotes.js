!function(){"use strict";const t=$(".quote"),e=$(".quote-author"),o=($(".quote-container"),$(".get-quote-button")),n=($(".image-container"),$(".credits-link")),u=$(".photographer"),r={red:"Annie Spratt",green:"Nate Johnston"};let a,c;function s(t){const e={"&":"&amp;","'":"&#39;",'"':"&quot;","<":"&lt;",">":"&gt;","\\":"&#x5c;","`":"&#x60;",":":"&#58;"};return t.replace(/[&"'<>\\`:]/g,(function(t){return e[t]}))}function l(){$.ajax({type:"GET",url:"https://quote-garden.herokuapp.com/api/v2/quotes/random",success:function(t){a=s(t.quote.quoteText),c=s(t.quote.quoteAuthor)},error:function(t){console.log(t)}}).done(()=>{d(a,c,1500),$("body").hasClass("red")?$("body").removeClass("red").addClass("green"):$("body").removeClass("green").addClass("red"),function(){const t=$("body").attr("class"),e=r[t];n.fadeOut(2e3,()=>{u.text(e),n.fadeIn(2e3)})}(),localStorage.setItem("quoteStored",a),localStorage.setItem("quoteAuthorStored",c)}).fail(t=>{console.log(t.statusText)})}function d(o="",n="",u=0){$.each([t,e],(r,a)=>{$(a).fadeOut(u,()=>{t.html(o),e.html(n)}).fadeIn(u)})}!function(){const t=localStorage.getItem("quoteStored"),e=localStorage.getItem("quoteAuthorStored");"undefined"!==t&&"undefined"!==e&&(null!==t&&null!==e)?d(t,e):l()}(),o.on("click",l)}();