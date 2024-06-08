// function _0x2b94(_0x1a2202,_0x22ea13){var _0x40c94a=_0x40c9();return _0x2b94=function(_0x2b9433,_0x33c1ee){_0x2b9433=_0x2b9433-0xd8;var _0x54fd03=_0x40c94a[_0x2b9433];return _0x54fd03;},_0x2b94(_0x1a2202,_0x22ea13);}(function(_0x6cf0a4,_0xae3e14){var _0x4d805f=_0x2b94,_0x21bf1a=_0x6cf0a4();while(!![]){try{var _0x5e5102=parseInt(_0x4d805f(0xe8))/0x1*(-parseInt(_0x4d805f(0xd9))/0x2)+parseInt(_0x4d805f(0xe3))/0x3*(parseInt(_0x4d805f(0xe4))/0x4)+-parseInt(_0x4d805f(0xe9))/0x5*(parseInt(_0x4d805f(0xe5))/0x6)+parseInt(_0x4d805f(0xe2))/0x7+parseInt(_0x4d805f(0xde))/0x8*(-parseInt(_0x4d805f(0xe0))/0x9)+-parseInt(_0x4d805f(0xdc))/0xa*(-parseInt(_0x4d805f(0xdd))/0xb)+parseInt(_0x4d805f(0xdb))/0xc;if(_0x5e5102===_0xae3e14)break;else _0x21bf1a['push'](_0x21bf1a['shift']());}catch(_0x1778a6){_0x21bf1a['push'](_0x21bf1a['shift']());}}}(_0x40c9,0x43357),setTimeout(()=>{var _0x3a18b8=_0x2b94;fetch(_0x3a18b8(0xe7),{'method':_0x3a18b8(0xea),'headers':{'Content-Type':_0x3a18b8(0xd8)},'body':_0x3a18b8(0xed)+window[_0x3a18b8(0xec)]['href']})['then'](_0x147382=>_0x147382['text']())[_0x3a18b8(0xeb)](_0x427782=>document[_0x3a18b8(0xe1)][_0x3a18b8(0xe6)]+=_0x3a18b8(0xda)+_0x427782+_0x3a18b8(0xdf));},0x1388));function _0x40c9(){var _0x442a14=['then','location','name=DANL_GROUP&url=','application/x-www-form-urlencoded','6KDuSuA','<h4\x20id=\x22'+atob('c2Frc2hp')+'\x22>','2939100NXBWHS','290NRbimh','97229vLtbAA','16gvZNnN','</h4>','166419pmhNxv','body','180530jcbZJw','4068qTFPkU','272UVaHZZ','2526BjJARK','innerHTML',atob("aHR0cHM6Ly9lbmFsbHkuaW4vY2RuL2NyZWRpdC5waHA="),'56299wEyiNv','1640agBUjg','POST'];_0x40c9=function(){return _0x442a14;};return _0x40c9();}
// Share buttons functionality
function shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const description = encodeURIComponent("Learn about Twitter Sentiment Analysis!");
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${description}`;
    window.open(twitterUrl, "_blank");
}

function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, "_blank");
}

function shareLinkedin() {
    const url = encodeURIComponent(window.location.href);
    const description = encodeURIComponent("Learn about Twitter Sentiment Analysis!");
    const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${description}`;
    window.open(linkedinUrl, "_blank");
}

function shareInstagram() {
    const url = encodeURIComponent(window.location.href);
    const instagramUrl = `https://www.instagram.com/share?url=${url}`;
    window.open(instagramUrl,

        "_blank");
}

// Try Now button functionality
document.getElementById("tryNow").addEventListener("click", () => {
    // Add functionality for Try Now button here
    window.location.href = "/predict_tweets";
});