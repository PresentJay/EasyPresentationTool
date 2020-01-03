from konlpy.tag import Kkma

if __name__ == "__main__":
                pass

class Ko:
        def __init__(self):
                self.kma = Kkma()
        def Process_KOR(self, string):
                arr = []
                #사용자가 입력한 문장 혹은 단어들을 받아오는 리스트를 선언한다.
                arr = str(string).splitlines()
                #우선 받아온 문자열을 줄별로 슬라이싱 해준다.

                #빈 줄의 경우 리스트에서 삭제하기 위한 반복문이다.
                while '' in arr:
                        arr.remove('')
                        #remove문을 이용하여 빈 줄의 인덱스를 삭제한다.
                        
                #대본 분석기에 전처리과정을 통한 단어들을 출력하기 위한 딕셔너리를 선언한다.
                diction = {}
                #문장 단위로 슬라이드를 만들어 내기 위해 선언한 슬라이드 번호이다.
                iter = 1

                #문장 개수 만큼 반복하기 위한 반복문이다.
                for i in arr:
                        #문장을 konlpy의 kkma태그를 이용하여 문장성분 별로 구분한다. 이때 [[단어 , 문장태그],[...]]식으로 이중리스트 구조로 출력을 해준다.
                        strarr = self.kma.pos(i)
                        #한문장에서 우리가 필요한 성분만을 담을 리스트 선언이다.
                        strarr2 = []

                        #위의 문장성분으로 분해한 이중 리스트 내에서 필요한 문장성분만을 담기위해 실행한 반복문이다.
                        for j in strarr:
                                #이 조건문은 보통 동사와 형용사를 사전형식 ((예) : 이쁜 -> 이쁘다.)형식으로 바꿔 저장하기 위해 선언 되었다.
                                if (str(j[1]).find('VV') > -1 or str(j[1]).find('VA') > -1) and str(j[0]) !="나":
                                        #단어에 + '다'를 하는 형식으로 리스트 strarr2에 추가하게 하였다.
                                        strarr2.append(j[0]+'다')
                                elif str(j[1]) == 'NNG' or str(j[1]) == 'OL'or str(j[1]) == 'NR' or str(j[1]) == 'NP'or str(j[1]) == 'NNM'or str(j[1]) == 'SW':
                                        #보통명사, 외국어, 수사, 대명사,특수 문자에서 처리하기 위한 조건문이다.
                                        if str(j[1]) == 'NNG' or str(j[1]) == 'NNM' or str(j[1]) == 'SW':
                                                #보통명사, 의존명사, 특수문자의 경우에 처리해야할 부분을 정의한 조건문이다.
                                                if not strarr2:
                                                        # 우선 리스트에 아무것도 없을 경우 그냥 추가하는 형식이다.
                                                        strarr2.append(j[0])
                                                else: #만약 리스트에 요소가 추가 되어 있을 경우 맨 마지막 부분을 pop시켜 그 단어의 형태소를 확인후 어떻게 처리할것인지를 처리한다.
                                                        word = strarr2.pop()
                                                        classified = self.kma.pos(word)
                                                        #pop한 단어의 형태소가 수사 혹은 외국어 인경우
                                                        if classified[len(classified)-1][1] == 'NR':
                                                                strarr2.append(word  + j[0])
                                                        elif classified[len(classified)-1][1] == 'OL':
                                                                #pop한 단어의 형태소가 수사 혹은 외국어 인경우
                                                                strarr2.append(word  + j[0])
                                                        else:
                                                                strarr2.append(word)
                                                                strarr2.append(j[0])
                                        else:
                                                strarr2.append(j[0])   
                        #유효한 문장 성분이 있어 리스트 내 요소가 있는 경우 딕셔너리에 추가 후  iter를 추가하는 조건문이다.
                        if  strarr2:
                                diction[iter] = strarr2
                                iter += 1
                # 함수가 최종적으로 dction를 출력하는 것을 의미한다.
                return diction
