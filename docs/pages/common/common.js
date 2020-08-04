//tmplate 转义
function templateEngine(html, data) {
    var re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;
    var match;
    var add = function(line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}
{/* <script type="text/template" id="dialogTpl">
	    <div class="mydialog">
	        <span class="close">×</span>
	        <div class="mydialog-cont">
	            <div class="cont"><% this.content %></div>
	        </div>
	        <div class="footer">
	            <% if(this.cancel){ %>
	            <span class="btn btn-ok"><% this.ok_txt %></span>
	            <span class="btn btn-cancel"><% this.cancel_txt %></span>
	            <% } else{ %>
	            <span class="btn btn-ok" style="width: 100%"><% this.ok_txt %></span>
	            <% } %>
	        </div>
	    </div>
    </script> */}
    

function addScrollEvent(callback){
    window.addEventListener('scroll', function(){
        var clientHeight = document.documentElement.clientHeight;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollHeight = document.body.scrollHeight;
        var proDis = 30;
        if((scrollTop + clientHeight) >= (scrollHeight - proDis)){
            callback && callback();
        }
    })
}
document.body.addEventListener('touchstart',function(){});