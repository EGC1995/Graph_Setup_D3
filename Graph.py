from flask import Flask, render_template, request, session


app = Flask(__name__, static_folder='static', template_folder='templates')
@app.route('/')
def index():
   return render_template('init.html')


if __name__ == '__main__':
   app.run(debug=True)
