from konlpy.tag import Kkma

if __name__ == "__main__":
    pass

class Ko:
    def __init__(self):
        self.kma = Kkma()

    def Process_KOR(self, string):
        arr = []
        arr = str(string).split('\n')
        diction = {}
        iter = 1
        for i in arr:
            strarr = self.kma.pos(i)
            strarr2 = []
            for j in strarr:
                if (str(j[1]).find('VV') > -1 or str(j[1]).find('VA') > -1) and str(j[0]) !="나":
                    strarr2.append(j[0]+'다')
                elif str(j[1])== 'NP' or str(j[1]) == 'NNG' or str(j[1]) == 'OL'or str(j[1]) == 'NR':
                    strarr2.append(j[0])
            diction[iter] = strarr2
            iter += 1
        return diction
