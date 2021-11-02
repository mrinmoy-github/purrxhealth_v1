function closeQuickCartModal() {
   jQuery.modal.close()
}

function do_qv() {
   var f = 80,
      e = 26,
      n = document.getElementsByTagName("img"),
      o = n.length,
      t, r = "";
   for (xx = 0; xx < o; xx++)
      if (t = n[xx], t.id.indexOf("qv_") != -1) {
         var u = t.id.replace("qv_", ""),
            s = findPosX(n[xx]) + Math.floor((n[xx].width - f) / 2),
            h = findPosY(n[xx]) + n[xx].height - e - 5,
            i = "qv_img_" + u;
         r += '<div id="' + i + '" style="z-index:999;top:' + h + "px;left:" + s + 'px;visibility:hidden;position:absolute"><a class="qv" href="javascript:void();" onclick="open_product(\'product.asp?lt_c=1&itemid=' + u + '&qv=1&\');"><img src="assets/images/default/quickshop.png" border="0" onmouseout="qv_hidden(\'' + i + "')\" onmouseover=\"qv_visible('" + i + "')\"><\/a><\/div>", n[xx].onmouseover = function() {
            var n = this.id.replace("qv_", "");
            a = "qv_img_" + n, document.getElementById(a).style.visibility = "visible"
         }, n[xx].onmouseout = function() {
            var n = this.id.replace("qv_", "");
            a = "qv_img_" + n, document.getElementById(a).style.visibility = "hidden"
         }
      }
   document.getElementById("qv_buttons").innerHTML = r
}

function qv_visible(n) {
   document.getElementById(n).style.visibility = "visible"
}

function qv_hidden(n) {
   document.getElementById(n).style.visibility = "hidden"
}

function findPosX(n) {
   var t = 0;
   if (n.offsetParent)
      for (;;) {
         if (t += n.offsetLeft, !n.offsetParent) break;
         n = n.offsetParent
      } else n.x && (t += n.x);
   return t
}

function findPosY(n) {
   var t = 0;
   if (n.offsetParent)
      for (;;) {
         if (t += n.offsetTop, !n.offsetParent) break;
         n = n.offsetParent
      } else n.y && (t += n.y);
   return t
}

jQuery(document).ready(function() {
   window.location.search.indexOf("quickcart") != -1 && jQuery.magnificPopup.open({
      items: {
        src: 'productview.html'
      },
      type: 'iframe',
      mainClass: 'mfp-viewCartQuick'
   }), jQuery("<div id='qv_buttons'><\/div>").appendTo("body")
})/*, jQuery(window).load(function() {
   var n = setTimeout("do_qv();", 10)
}), jQuery(window).resize(function() {
   var n = setTimeout("do_qv();", 10)
})
*/

