const video = document.getElementById("video");
const output1 = document.getElementById("output-1");

const FPS = 30;

let currentCountdown = null;

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.log(err);
    });

function createFileFromUrl(path, url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function (ev) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let data = new Uint8Array(request.response);
                cv.FS_createDataFile('/', path, data, true, false, false);
                callback();
            } else {
                self.printError('Failed to load ' + url + ' status: ' + request.status);
            }
        }
    };
    request.send();
};

function onOpenCvLoad() {
    cv.onRuntimeInitialized = () => {
        const cap = new cv.VideoCapture(video);
        const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        const gray = new cv.Mat(video.height, video.width, cv.CV_8UC1);

        createFileFromUrl('hand.xml', '/static/hc/hand.xml', () => {

            const handCascade = new cv.CascadeClassifier();
            const hands = new cv.RectVector();

            handCascade.load('hand.xml');

            function processVideo() {
                let begin = Date.now();
                cap.read(src);
                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

                let msize = new cv.Size(0, 0);

                handCascade.detectMultiScale(gray, hands, 1.1, 3, 0, msize, msize);

                for (let i = 0; i < hands.size(); ++i) {
                    let point1 = new cv.Point(hands.get(i).x, hands.get(i).y);
                    let point2 = new cv.Point(hands.get(i).x + hands.get(i).width,
                        hands.get(i).y + hands.get(i).height);
                    cv.rectangle(src, point1, point2, [255, 0, 0, 255], 5, cv.LINE_8, 0);
                }

                if (hands.size() > 0 && currentCountdown == null) {
                    setTimeout(setCountdown, 1000);
                }

                cv.imshow(output1.id, src);

                let delay = 1000 / FPS - (Date.now() - begin);
                setTimeout(processVideo, delay);
            }
            setTimeout(processVideo, 0);
        });
    }
}

function setCountdown(time) {
    console.log('Picture taken!');

    currentCountdown = null;
}
