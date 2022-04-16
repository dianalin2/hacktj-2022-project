const video = document.getElementById("video");
const output1 = document.getElementById("output-1");

const FPS = 30;

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.log(err);
    });



function onOpenCvLoad() {
    // cv.onRuntimeInitialized = () => {
    // const cap = new cv.VideoCapture(video);
    // const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    // const gray = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    console.log('here')

    fetch('/static/hc/hand.xml').then(res => { console.log(res); return res.blob() }).then(xml => {
        console.log("xml")
        console.log(xml);
        // const data = new Uint8Array(xml);
        // cv.FS_createDataFile('/', 'hand.xml', data, true, false, false);

        // const handCascade = new cv.CascadeClassifier();
        // const hands = new cv.RectVector();

        // // handCascade.load('hand.xml');

        // function processVideo() {
        //     let begin = Date.now();
        //     cap.read(src);
        //     cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

        //     let msize = new cv.Size(0, 0);

        //     // handCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
        //     // console.log(hands);

        //     // for (let i = 0; i < faces.size(); ++i) {
        //     //     let roiGray = gray.roi(faces.get(i));
        //     //     let roiSrc = src.roi(faces.get(i));
        //     //     let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
        //     //     let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
        //     //         faces.get(i).y + faces.get(i).height);
        //     //     cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
        //     //     // detect eyes in face ROI
        //     //     eyeCascade.detectMultiScale(roiGray, eyes);
        //     //     for (let j = 0; j < eyes.size(); ++j) {
        //     //         let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
        //     //         let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width,
        //     //             eyes.get(j).y + eyes.get(j).height);
        //     //         cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255]);
        //     //     }
        //     //     roiGray.delete(); roiSrc.delete();
        //     // }

        //     cv.imshow(output1.id, gray);
        //     // schedule next one.
        //     let delay = 1000 / FPS - (Date.now() - begin);
        //     setTimeout(processVideo, delay);
        // }
        // setTimeout(processVideo, 0);
    }).catch(err => {
        console.log(err);
    });
    // }
}

console.log('here')
