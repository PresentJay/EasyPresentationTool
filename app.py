from flask import Flask, render_template, request, url_for, jsonify
from konlpy.tag import Kkma
import ko

host_addr = "203.241.228.111"
#host_addr = "0.0.0.0"
port_num = "5050"

kkma = ko.Ko()
kkma.Process_KOR('아버지가 방에 들어가셨다')

app = Flask(__name__,static_url_path='/static')

@app.route("/")
def hello():
    return render_template("index.html")
    
@app.route("/result",methods=['POST','GET'])
def result():
    if request.method == 'POST':
        result = request.form
        return render_template("result.html",result=kkma.Process_KOR(result['str']))

if __name__ == "__main__":
    #app.run(host=host_addr,port=port_num)
    app.run(host=host_addr,port=port_num,debug=True)
