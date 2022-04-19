(function() {
    var address, second, has_alarm, start_date, end_date, embassy_name, email_embassy;
    var Dubay_top_month = 3;
    var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
    chrome.storage.local.get("api_address", function (data) {
            address = data.api_address;
    });
    chrome.storage.local.get("second", function (data) {
            second = data.second;
    });
    chrome.storage.local.get("startdate", function (data) {
            start_date = data.startdate;
    });
    chrome.storage.local.get("enddate", function (data) {
            end_date = data.enddate;
    });
    chrome.storage.local.get("has_alarm", function (data) {
            has_alarm = data.has_alarm;
    });
    chrome.storage.local.get("embassyname", function (data) {
            embassy_name = data.embassyname;
    });
    chrome.storage.local.get("email_embassy", function (data) {
        email_embassy = data.email_embassy;
    });

    setTimeout(function(){ }, 50);

    var parse_date = function(text){
        var d, m, y;
        [d, m, y] = text.split('on ')[1].split(' ');
        y = y.trim('\n');
        m = m.substr(0, 3);
        switch(m){
            case "Jan": m = "01"; break; case "Feb": m = "02"; break; case "Mar": m = "03"; break;
            case "Apr": m = "04"; break; case "May": m = "05"; break; case "Jun": m = "06"; break;
            case "Jul": m = "07"; break; case "Aug": m = "08"; break; case "Sep": m = "09"; break;
            case "Oct": m = "10"; break; case "Nov": m = "11"; break; case "Dec": m = "12"; break;
        }
        return `${y}-${m}-${d}`
    }

    var sendEmail =  function (subject , embassy_name , date) {
        Email.send({
            Host: "smtp.gmail.com",
            Username : "embassy.extention@gmail.com",
            Password : "embassy2022",
            To : email_embassy,
            From : "embassy.extention@gmail.com",
            Subject : subject,
            Body : `<html>
            <head>
                <meta charSet='utf-8'>
                    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                        <style> * {font - family: Iransansdn} .btn-click {-webkit - appearance: none; text-decoration: none; color: #fff; background-color: #00aeff; padding: 10px; display: inline-block; border: 1px solid #0084ff; border-radius: 5px; transition: all 0.5s;} .btn-click:hover {background - color: #0084ff;} .cream {display: inline-block; padding: 40px; width: auto; height: auto; background-color: #f3ecaa; border: 1px solid khaki; border-radius: 10px;} .center {height: 100%; display: flex; align-items: center; justify-content: center;} </style>
            </head>
            <body dir="rtl">
            <div className="center">
                <center class="cream">بسم الله ارحمن الرحیم <h3>خیلی صبر کردی درسته</h3> <p>در تاریخ ${date} سفارت
                    ${embassy_name} باز است</p> <p>برای اطلاعات بیشتر می توانید روی لینک پایین کلیک کنید</p> <br> <a
                    target="_blank" className="btn-click" href="https://ais.usvisa-info.com/en-ir?visa_type=niv">کلیک
                    کن</a></center>
            </div>
            </body>
            </html>`
        });
    }

    var has_time = function(text){
        return ((!(text.includes('no'))) || (/\d/.test(text)));
    }

    var goto_button_page = function(){
        window.location.href = "https://ais.usvisa-info.com/en-ir?visa_type=niv";
    }

    var play_sound = function(){
        var base64 = "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA9AAiAZ89DGttiAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksD/gAAAASwAAAAAAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksD/gAAAASwAAAAAAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksD/gAAAASwAAAAAAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAA";
        var snd = new Audio("data:audio/wav;base64," + base64);
        snd.play();
    }

    var play_alarm = function(the_date, location){
        if (location == embassy_name){
            if (!start_date) start_date = "2000-1-1";
            if (!end_date) end_date = "3000-1-1";
            var srt_date = new Date(start_date);
            var stp_date = new Date(end_date);
            var cur_date = new Date(the_date);
            if ((srt_date <= cur_date) && (stp_date >= cur_date)){
                if (has_alarm) {
                    var context = new AudioContext();
                    var o = context.createOscillator();
                    o.type = "square";
                    o.start(0);
                    o.connect(context.destination);
                    alert ("Get up man!\nAn appointment of "+the_date+" appeared for "+embassy_name+"!");
                    o.disconnect();
                }
                else{
                    play_sound();
                    setTimeout(function(){alert ("Get up man!\nAn appointment of "+the_date+" appeared for "+embassy_name+"!");}, 100);
                }
            }
        }
    }

    var check = function(){

        if (window.location.href == "https://ais.usvisa-info.com/en-ir?visa_type=niv"){

            var commitButton = document.evaluate('//*[@id="contentContainer"]/div[2]/div[2]/div/form/input[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if(typeof(commitButton) != 'undefined' && commitButton != null){
                var _id = setInterval(function(){
                    var minute = new Date().getMinutes();
                    var _second = new Date().getSeconds();
                    if (_second == second){
                        window.scrollTo(0, Math.ceil(Math.random()*100+1500));
                        commitButton.click();
                    }
                }, 990);
            }
            else{
                goto_button_page();
            }
        }
        else if (window.location.href.includes("ir_availability")){
            var dubaiTextElement = document.evaluate('//*[@id="contentContainer"]/div[2]/div/div[1]/ul/li[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var armeniaTextElement = document.evaluate('//*[@id="contentContainer"]/div[2]/div/div[2]/ul/li[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var ankaraTextElement = document.evaluate('//*[@id="contentContainer"]/div[2]/div/div[3]/ul/li[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var textElement = [armeniaTextElement,dubaiTextElement,ankaraTextElement];
            var embassy_str = ['armenia', 'dubai', 'turkey'];
            for (let i = 0; i < 3; i++) {
                if (typeof(textElement[i]) != 'undefined' && textElement[i] != null){
                    var thetext = textElement[i].innerHTML;
                    if (has_time(thetext)){
                        var date = parse_date(thetext);
                        var current_date_time = new Date().toLocaleString('ir-fa', {timeZone: 'Asia/Tehran' });
                        flag = true;
                        if (i == 1){
                            var cur_date = new Date(date);
                            var Dubai_top_date = new Date();
                            Dubai_top_date.setMonth(Dubai_top_date.getMonth() + Dubay_top_month);
                            if(Dubai_top_date <= cur_date) flag = false;
                        }
                        if(flag){
                            var ajax = new XMLHttpRequest();
                            ajax.open("POST", address, true);
                            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            ajax.setRequestHeader("Access-Control-Allow-Origin", "*");
                            ajax.onreadystatechange = function() {
                                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                    console.log(this.response);
                                }
                                ajax.send(`country=${embassy_str[i]}&date=${date}&currentDateTime=${current_date_time}`);
                            }
                        }
                        sendEmail(`${embassy_str[i]} embassy` , embassy_str[i] , date)

                        play_alarm(date,embassy_str[i]);
                    }
                }
            }
            goto_button_page();
        }
        else{
            goto_button_page();
        }
    };

    setTimeout(function(){
        check();
        }, 200);
})();
