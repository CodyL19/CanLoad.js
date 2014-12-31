function update(e) {
  var o = "";
  if (e.bgColor || e.bgCenter || e.bgLine) {
    var n = e.bgColor ? "\n		color:'" + e.bgColor + "'" : "",
        l = e.bgCenter ? "\n		center:'" + e.bgCenter + "'" : "",
        t = e.bgLine ? "\n		line:'" + e.bgLine + "'" : "";
    o = ",\n	bg:{" + n + l + t + "\n	}"
  }
  e.style = e.style.toLowerCase();
  var i = "";
  "chrome" == e.style ? ($("#len").show(), i = ",\n	length:'" + e.length + "'") : $("#len").hide();
  var r = "canLoad('" + e.style + "', {\n	id:'elm', // Where to place the loader\n	speed:'" + e.speed + "',\n	color:'" + e.color + "',\n	size:'" + e.size + "',\n	line:'" + e.line + "'" + i + o + "\n});";
  $(".code").html(r), Prism.highlightElement($("#code")[0]), canLoad(e.style, {
    id: "loader",
    color: e.color,
    speed: e.speed,
    size: e.size,
    line: e.line,
    length: e.length,
    bg: {
      color: e.bgColor,
      line: e.bgLine,
      center: e.bgCenter
    }
  })
}
canLoad("line", {
  id: "loader"
});
var options = {
  style: "line",
  speed: "medium",
  color: "#333333",
  size: "40",
  line: "2",
  bgColor: "",
  bgCenter: "",
  bgLine: "",
  length: "25"
},
    ob = options;
$(".styles").change(function() {
  ob.style = $(".styles option:selected").val(), update(ob)
}), $(".speed").change(function() {
  ob.speed = $(".speed option:selected").val(), update(ob)
}), $("#size").blur(function() {
  ob.size = $(this).val(), update(ob)
}), $("#spinner-color").change(function() {
  ob.color = $("#spinner-color").val(), update(ob)
}), $("#line").blur(function() {
  ob.line = $("#line").val(), update(ob)
}), $("#bgLine").blur(function() {
  ob.bgLine = $("#bgLine").val(), update(ob)
}), $("#bg-color").change(function() {
  ob.bgColor = $("#bg-color").val(), update(ob)
}), $("#center-color").change(function() {
  ob.bgCenter = $("#center-color").val(), update(ob)
}), $("#length").blur(function() {
  ob.length = $(this).val(), update(ob)
}), $(".preview_bg").change(function() {
  $("#loader_preview").css({
    background: $(this).val()
  })
});