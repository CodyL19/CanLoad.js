function update(e) {
  
  share(e);
  
  $("#loader_preview").css({
    background: $(".preview_bg").val()
  });
  
  var o = "";
  if (e.bgColor || e.bgCenter || e.bgLine) {
    var n = e.bgColor ? "\n		color:<span>'" + e.bgColor + "'</span>" : "",
        l = e.bgCenter ? "\n		center:<span>'" + e.bgCenter + "'</span>" : "",
        t = e.bgLine ? "\n		line:<span>'" + e.bgLine + "'</span>" : "";
    o = ",\n	bg:{" + n + l + t + "\n	}"
  }
  e.style = e.style.toLowerCase();
  var i = "";
  "chrome" == e.style ? ($("#len").show(), i = ",\n	length:<span>'" + e.length + "'</span>") : $("#len").hide();
  var r = "canLoad(<span>'" + e.style + "'</span>, {\n	id:<span>'elm'</span>, <span class='c'>// Where to place the loader</span>\n	speed:<span>'" + e.speed + "'</span>,\n	color:<span>'" + e.color + "'</span>,\n	size:<span>'" + e.size + "'</span>,\n	line:<span>'" + e.line + "'</span>" + i + o + "\n});";
  $(".code").html(r), canLoad(e.style, {
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

// ----------------------------------
// Check url, set values here
// ----------------------------------

// URL format:
// #st=x&c=x,y,z&sp=x&s=x&l=x&len=x&bgc=x,y,z&bgm=x,y,z&bgl=x
// st=style c=color sp=speed s=size l=line len=length bgc=bgcolor bgm=bgcenter bgl=bgline
var hash = window.location.hash.replace('#','');
if(hash) {
  var op = hash.split('&');
  var i=0, options = {};
  while(i < op.length){ var v = op[i].split('='); options[v[0]] = v[1]; i++;}
  
  function rgb(o){if(o){ var color = o.split(','), a = (color[3])?color[3]:1; return "rgba("+color[0]+","+color[1]+","+color[2]+","+a+")";}}
  
  //console.log(options.c,options.bgm,options.bgc);
  
  if(options.st && options.st.toLowerCase() == "line") {$('.styles option:nth-child(1)').attr('selected','selected');}
  else if(options.st && options.st.toLowerCase() == "chrome") {$('.styles option:nth-child(2)').attr('selected','selected');}
  
  if(options.bg){$('.preview_bg').val(rgb(options.bg));}
  
  if(rgb(options.c)) $('#spinner-color').val(rgb(options.c));
  if(rgb(options.bgc)) $('#bg-color').val(rgb(options.bgc));
  if(rgb(options.bgm)) $('#center-color').val(rgb(options.bgm));
  
  if(options.sp && options.sp.toLowerCase() == "fast") {$('.speed option:nth-child(1)').attr('selected','selected');}
  else if(options.sp && options.sp.toLowerCase() == "medium") {$('.speed option:nth-child(2)').attr('selected','selected');}
  else if(options.sp && options.sp.toLowerCase() == "slow") {$('.speed option:nth-child(3)').attr('selected','selected');}
  
  if(options.s) $('#size').val(options.s);
  if(options.l) $('#line').val(options.l);
  if(options.s) $('#length').val(options.len);
  if(options.bgl) $('#bgLine').val(options.bgl);
}

var options = {
  style: $(".styles option:selected").val(),
  speed: $(".speed option:selected").val(),
  color: $("#spinner-color").val(),
  size: $("#size").val(),
  line: $("#line").val(),
  bgColor: $("#bg-color").val(),
  bgCenter: $("#center-color").val(),
  bgLine: $("#bgLine").val(),
  length: $("#length").val(),
  bg: $(".preview_bg").val()
};

var ob = options;

share(ob);

update(ob);

$(".styles").change(function() {
  ob.style = $(".styles option:selected").val(), update(ob)
}), $(".speed").change(function() {
  ob.speed = $(".speed option:selected").val(), update(ob)
}), $("#size").change(function() {
  ob.size = $(this).val(), update(ob)
}), $("#spinner-color").change(function() {
  ob.color = $("#spinner-color").val(), update(ob)
}), $("#line").change(function() {
  ob.line = $("#line").val(), update(ob)
}), $("#bgLine").change(function() {
  ob.bgLine = $("#bgLine").val(), update(ob)
}), $("#bg-color").change(function() {
  ob.bgColor = $("#bg-color").val(), update(ob)
}), $("#center-color").change(function() {
  ob.bgCenter = $("#center-color").val(), update(ob)
}), $("#length").change(function() {
  ob.length = $(this).val(), update(ob)
}), $(".preview_bg").change(function() {
  ob.bg = $(".preview_bg").val(), update(ob)
  $("#loader_preview").css({
    background: $(".preview_bg").val()
  });
});

// URL format:
// #st=x&c=x,y,z&sp=x&s=x&l=x&len=x&bgc=x,y,z&bgm=x,y,z&bgl=x
// st=style c=color sp=speed s=size l=line len=length bgc=bgcolor bgm=bgcenter bgl=bgline


function share(ob){
  var length = (ob.style == "chrome")?"&len="+ob.length:"";
  var bgColor = (ob.bgColor)?"&bgc="+smallRGB(ob.bgColor):"";
  var bgCenter = (ob.bgCenter)?"&bgm="+smallRGB(ob.bgCenter):"";
  var bgLine = (ob.bgLine)?"&bgl="+ob.bgLine:"";
  
  var bg = bgColor+""+bgCenter+""+bgLine; 
  
  var surl = "http://codyl19.github.io/CanLoad.js/#st="+ob.style+"&c="+smallRGB(ob.color)+"&sp="+ob.speed+"&bg="+smallRGB(ob.bg)+"&s="+ob.size+"&l="+ob.line+""+length+""+bg;
  $('#share input').val(surl).focus(function() { $(this).select(); } );
}


function smallRGB(string){
  var str = string.substr(0, 4);
  return string.split(' ').join('')
  .split("rgba(").join('')
  .split('rgb(').join('')
  .split(')').join('');
}