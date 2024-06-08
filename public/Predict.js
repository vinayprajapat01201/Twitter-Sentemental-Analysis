document.getElementById('predictButton').addEventListener('click', function(event) {
    event.preventDefault();

    const tweet = document.getElementById('tweet').value;
    if (!tweet.trim()) {
        alert('Please enter a tweet');
        return;
    }

    fetch('/predict_tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'tweet': tweet
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server response not OK');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('predictionResult').innerText = `Prediction: ${data.prediction}`;
            document.getElementById('predictionTime').innerText = `Prediction Time: ${data.prediction_time} seconds`;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('voiceButton').addEventListener('click', function(event) {
    event.preventDefault();

    const recognition = new webkitSpeechRecognition() || SpeechRecognition;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('tweet').value = transcript;
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onstart = function() {
        console.log('Speech recognition started');
        document.getElementById('voiceButton').classList.add('blink');
        document.getElementById('voiceButton').innerHTML = '<i class="fad fa-assistive-listening-systems"></i> Listening...';
    };

    recognition.onend = function() {
        console.log('Speech recognition ended');
        document.getElementById('voiceButton').classList.remove('blink');
        document.getElementById('voiceButton').innerHTML = '<i class="fas fa-microphone-alt"></i> Speak';
    };

    recognition.start();
});



document.addEventListener("DOMContentLoaded", function() {
    const imgSrcList = [
        "https://cdn-icons-png.flaticon.com/512/3938/3938028.png",
        "https://i.pinimg.com/originals/e2/b8/c2/e2b8c2ec9db9647fb8307a44cf3267f5.gif"
    ];

    const imgElement = document.getElementById("logo_img");
    let currentIndex = 0;

    function changeImage() {
        imgElement.src = imgSrcList[currentIndex];
        currentIndex = (currentIndex + 1) % imgSrcList.length; // Loop through images
    }

    // Call the function initially
    changeImage();

    // Change the image every 5 seconds
    setInterval(changeImage, 5000);
});

// tweets sliders
const tweets = document.querySelectorAll('.tweets p');
let index = 0;

function nextTweet() {
    tweets[index].classList.remove('active');
    index = (index + 1) % tweets.length;
    tweets[index].classList.add('active');
}

function prevTweet() {
    tweets[index].classList.remove('active');
    index = (index - 1 + tweets.length) % tweets.length;
    tweets[index].classList.add('active');
}


// Change the tweet every 5 seconds
setInterval(nextTweet, 5000);

function selectedModalName(element) {
    var selectedModalName = element.innerText;
    document.getElementsByName('selectedModalName')[0].value = selectedModalName;

    // Remove 'selected' class from all other modals
    var modals = document.querySelectorAll('.modals .card');
    modals.forEach(function(modal) {
        if (modal !== element) {
            modal.classList.remove('selected');
        }
    });

    // Toggle 'selected' class for the clicked modal
    element.classList.toggle('selected');
}
