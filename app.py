from flask import Flask, render_template, request, url_for, jsonify
from konlpy.tag import Kkma
import ko

host_addr = "0.0.0.0"
port_num = "5002"

kkma = ko.Ko()
kkma.Process_KOR('아버지가 방에 들어가셨다')

app = Flask(__name__,static_url_path='/static')

@app.route("/")
def hello():
    return render_template("input.html")

@app.route("/result",methods=['POST','GET'])
def result():
    if request.method == 'POST':
        result = request.form
        return render_template("result.html",result=kkma.Process_KOR(result['str']))

@app.route("/test")
def textAnalysor():
    return render_template("textanalyze.html")

@app.route("/api")
def api():
    return render_template("test.html")

@app.route("/api/json")
def api_json():
    return jsonify(name='apple')

if __name__ == "__main__":
    #app.run(host=host_addr,port=port_num)
    app.run(host=host_addr,port=port_num,debug=True)