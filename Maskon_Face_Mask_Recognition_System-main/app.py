from flask import Flask,render_template,Response
import cv2
from pickle import FALSE
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
import io

credentials = CognitiveServicesCredentials("09b829a6b7d144a8bcccdd69269c7ed9")
client = FaceClient("https://faceapi321.cognitiveservices.azure.com/", credentials)

app=Flask(__name__)
camera=cv2.VideoCapture(0)


def generate_frames():
    while True:
            
        ## read the camera frame
        success,frame=camera.read()
        if not success:
            break
        else:
            
            ret,buffer=cv2.imencode('.jpg',frame)

            stream = io.BytesIO(buffer)

# call the Face API
            detected_faces = client.face.detect_with_stream(
              stream,
              detection_model='detection_03',
              return_face_id=True,
              return_face_attributes=['mask'])

# access the response, example:
            for detected_face in detected_faces:
                if detected_face.face_attributes.mask.type.value == 'faceMask' and detected_face.face_attributes.mask.nose_and_mouth_covered == True:

                    img=cv2.rectangle(frame, (detected_face.face_rectangle.left, detected_face.face_rectangle.top), (detected_face.face_rectangle.left+detected_face.face_rectangle.width, detected_face.face_rectangle.top+detected_face.face_rectangle.height), (0, 255, 0), 2)
                    cv2.putText(img,'MASKED',(detected_face.face_rectangle.left, detected_face.face_rectangle.top-10),cv2.FONT_HERSHEY_SIMPLEX,0.9,(0, 255, 0), 1) 

                elif detected_face.face_attributes.mask.type.value == 'noMask' and detected_face.face_attributes.mask.nose_and_mouth_covered == False:

                    img=cv2.rectangle(frame, (detected_face.face_rectangle.left, detected_face.face_rectangle.top), (detected_face.face_rectangle.left+detected_face.face_rectangle.width, detected_face.face_rectangle.top+detected_face.face_rectangle.height), (0, 0, 255), 1)
                    cv2.putText(img,'NO MASK',(detected_face.face_rectangle.left, detected_face.face_rectangle.top-10),cv2.FONT_HERSHEY_SIMPLEX,0.9,(0, 0, 255), 1)
                else:
                     
                    cv2.rectangle(frame, (detected_face.face_rectangle.left, detected_face.face_rectangle.top), (detected_face.face_rectangle.left+detected_face.face_rectangle.width, detected_face.face_rectangle.top+detected_face.face_rectangle.height), (255,0, 0), 2)
                

            ret,buffer=cv2.imencode('.jpg',frame)
            frame=buffer.tobytes()

        yield(b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    camera.release()
    return render_template('index.html')

@app.route('/home')
def home():
    camera.release()
    return render_template('home.html')

@app.route('/main')
def main():
    camera.release()
    return render_template('main.html')

@app.route('/user')
def user():
    camera.release()
    return render_template('user.html')


@app.route('/login')
def login():
    camera.release()
    return render_template('login.html')

@app.route('/register')
def register():
    camera.release()
    return render_template('register.html')

@app.route('/about')
def about():
    camera.release()
    return render_template('about.html')    

@app.route('/contact')
def contact():
    camera.release()
    return render_template('contact.html')     

@app.route('/mask')
def fm():
    return render_template('mask.html')
@app.route('/video')
def video():
    return Response(generate_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__=="__main__":
    app.run(debug=True)
