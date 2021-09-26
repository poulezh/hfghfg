class WidgetCho extends BaseWidget {
    constructor() {
        super();
        this.loadSimple();
        this.htmlElement.style.width = '100vw'
        this.htmlElement.style.height = '100vh'
    }

    loadSimple(id = "613ade0371ef3e13c8fd942f") {
        const loaded = function (result) {
            console.log(result.cursor.firstBatch[0]);
            this.result = result.cursor.firstBatch[0];
        }
        APP.dbWorker.responseDOLMongoRequest = loaded.bind(this);
        const request = '{"_id" : {"$oid" : "' + id + '"}}';
        console.log(request);
        APP.dbWorker.sendBaseRCRequest("DOLMongoRequest", "objects", request);
    }

    onCreate() {
        this.addClassName("WidgetCho");
        this.htmlElement.classList.add('app')
        this.cho = this.htmlElement
        this.data
        this.index_question = 0


        this.create_btn = document.createElement('button')
        this.create_btn.classList.add('btn_create')
        this.create_btn.textContent = ('Создать')
        this.htmlElement.append(this.create_btn)

        this.name_ru_string = ''
        this.id_n = ''
        this.lang_length = ''
        this.length_arr = ''
        this.length_ost = ''
        this.length_on = ''
        this.name_en = ''
        this.name_ru = ''
        this.word_data = ''
        this.w_right = ''
        this.accepted = 0
        this.discarded = 0
        this.counter = 0
        this.arr_accept = []
        this.arr_refuce = []
        this.elem
        this.key
        this.value
        this.lange
        this.clicker_accept = false
        this.clicker_refuce = false
        this.btn_q = false
        this.word_en = ''
        this.wiki = ''

        this.user_val
        this.iframe = ''



        this.open = true
        this.btn_create = true
        this.htmlElement.addEventListener("click", e => {
            if (e.target == this.create_btn) {
                this.createTable(e);
            }
        });
    }

    render() {

        const widget = this.props.widgets[this.id];

        let eventAttributes = {};

        for (let eventName in widget.events) {
            eventAttributes[eventName] = (event) => this.eventHandler(eventName, event);
        }
    }

    createTable(e) {
        if (this.open) {
            e.preventDefault()

            this.create_btn.classList.add('hide')

            //главный апп
            let app = document.createElement('div')
            this.cho.append(app)

            // верхняя таблица
            let top_table = document.createElement('div')

            //блок вики и два элемента в нем
            this.wiki = document.createElement('div')
            this.wiki.classList.add('wiki')

            let w_left = document.createElement('div')
            
            w_left.classList.add('q')
            w_left.append(this.wiki)
            // w_left.style.borderRight = '1px solid #252525'


            this.w_right = document.createElement('div')
            this.w_right.classList.add('q_2')

            let ert = document.createElement('div')
            ert.classList.add('word_en')
            this.word_en = document.createElement('p')
            // this.word_en.classList.add('wodr_en')
            ert.append(this.word_en)
            this.w_right.append(ert)

            this.name_en = document.createElement('p')
            this.name_en.classList.add('name')
            w_left.append(this.name_en)

            this.name_ru = document.createElement('a')
            this.name_ru.classList.add('name_ru')

            this.w_right.append(this.name_ru)



            // блок id
            let id_data = document.createElement('div')
            id_data.textContent = 'ID: '
            id_data.classList.add('id')
            this.id_n = document.createElement('p')
            this.id_n.classList.add('id_no')
            id_data.append(this.id_n)
            w_left.append(id_data)

            // блок словаря
            let word = document.createElement('div')
            word.classList.add('q_3')
            // word.style.borderLeft = '1px solid #252525'
            this.word_data = document.createElement('p')
            this.word_data.classList.add('name')
            word.append(this.word_data)

            // iframe открываем вики в окне q_3
            this.iframe = document.createElement('iframe')
            this.iframe.classList.add('q_3')

            this.iframe.src = ''
            word.append(this.iframe)

            // имя пользователя
            let name_user_block = document.createElement('div')            
            let input_user = document.createElement('input')
            input_user.placeholder = 'введите имя'
            input_user.classList.add('name_user_block')
            this.user_val = input_user.value 
            name_user_block.append(input_user)
            

            //обьединяем в один верхний блок
            top_table.append(w_left)
            top_table.append(this.w_right)
            top_table.append(word)
            top_table.classList.add('top_table')
            top_table.style.display = 'flex'
            top_table.style.border = '1px solid #252525'
            top_table.append(name_user_block)

            // добавляем на экран
            app.append(top_table)

            // bottom_table

            let bottom_table = document.createElement('div')
            bottom_table.classList.add('bottom')

            let b_left = document.createElement('div')
            b_left.classList.add('q_btm')
            let b_right = document.createElement('div')
            b_right.classList.add('q_btm')

            bottom_table.append(b_left)
            bottom_table.append(b_right)

            bottom_table.style.display = 'flex'

            this.createButton('btn_l', 'Принять Обьект', b_left)
            this.createButton('btn_arrow_back', 'возврат', b_left)
            this.createButton('btn_r', 'Отказать Обьекту', b_right)
            this.createButton('btn_q', 'Продолжить Работу с', b_right )

            


            let statistics = document.createElement('div')
            statistics.classList.add('statistics')
            bottom_table.append(statistics)


            //первые данные статичные

            
            // статичный id
            this.data = this.result.object.array
            this.id_n.textContent = this.data[this.index_question].number_id
            if (this.id_n.textContent === "no  number_id") {
                this.id_n.textContent = ' нет'
            }

            // русское значение из словаря
            let jsonString = JSON.stringify(this.data[this.index_question].translation_ru, null);
            let wert = jsonString.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/Makarov/g, '')
            wert = wert.split('_:')[1]

            this.name_en.textContent = wert
            // статичное имя на англ
            // this.word_data.textContent = `${this.data[this.index_question].name}`
            this.word_en.textContent = `${this.data[this.index_question].name}`
            this.word_en.style.border = '1px solid #252525'


            // no lang типа ниже выводим все языки из парсера на вики. пока не нужны
            this.name_ru_string = JSON.stringify(this.data[this.index_question].lang, null);
            this.name_ru_string = this.name_ru_string.replace(/{/g, '').replace(/}/g, '')
            // console.log(this.name_ru_string);
            // this.name_ru.textContent = this.name_ru_string

            // статичная ссылка на англ вики
            this.iframe.src =`https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`
    
            let a_link = `https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`
            this.name_ru.href = a_link
            this.name_ru.textContent = `ссылки на ${this.data[this.index_question].name}`

            // количество языков на которые переведено слово
            this.createStatistic('link', b_left, 'количество ссылок на языки', '25px')
            this.createStatistic('link_lenght', b_left, '0', '20px')

            this.length_ost = this.addLenghtArr() - 1
            this.length_on = 100 + '%'
            this.accepted
            this.discarded

            //тут ничего не меняем
            this.createStatistic('text', statistics, `'счетчик' : ${this.addLenghtArr()}`, '10px')
            this.createStatistic('text', statistics, 'принято', '50px')
            this.createStatistic('text', statistics, 'отброшено', '90px')
            this.createStatistic('text', statistics, 'осталось', '130px')

            // данные в числовом
            this.createStatistic('stats-1', statistics, this.counter, '10px')
            this.createStatistic('stats-2', statistics, this.accepted, '50px')
            this.createStatistic('stats-3', statistics, this.discarded, '90px')
            this.createStatistic('stats-4', statistics, this.addLenghtArr(), '130px')

            // данные в процентах
            this.createStatistic('percent-1', statistics, this.counter + '%', '10px')
            this.createStatistic('percent-2', statistics, this.accepted + '%', '50px')
            this.createStatistic('percent-3', statistics, this.discarded + '%', '90px')
            this.createStatistic('percent-4', statistics, this.length_on, '130px')

            app.append(bottom_table)
            // this.handlerArray()

            // подключаем обработчики 'принять','отказать'
            let btn_handler = document.querySelector('.btn_l')
            let btn_refuse = document.querySelector('.btn_r')
            let btn_q = document.querySelector('.btn_q')
            let input = document.createElement('input')
            let btn_s = document.createElement('button')
            btn_s.textContent = 'сброс'
            btn_s.classList.add('btn_s')
            
            input.classList.add('input_btn_q')
            // input.placeholder = 'число'
            btn_q.append(input)
            btn_q.append(btn_s)
            btn_handler.classList.add('click')
            btn_refuse.classList.add('click')
            btn_handler.addEventListener('click', (e) => {
                this.acceptObject()
                this.processor()
            })
            // возврат
            let btn_back = document.querySelector('.btn_arrow_back')
            btn_back.addEventListener('click', (e) => {

                this.objectReturn()
            })

            // открываем таблицу с кнопками для обработки данных
            this.htmlElement.addEventListener('click', (e) => {
                if(e.target == btn_handler || e.target == btn_refuse){
                    if (btn_handler.classList.contains('click') && btn_refuse.classList.contains('click')) {
   
                            this.createBlockTwo()
                            this.processor()
                            btn_handler.classList.remove('click')
                            btn_refuse.classList.remove('click')   
                    }
                }
            })

            btn_refuse.addEventListener('click', (e) =>{
                this.refuseObject()
            })
            btn_q.addEventListener('click', (e)=>{
                this.addBtn_q()

            })

            this.htmlElement.addEventListener('input', (e)=>{
                if(e.target == input_user){
                    if(!input_user.value == '' && input_user.value.length >= 5 ){
                        this.createButton('name_user_btn', 'подтвердить', word )
                        let user = document.querySelector('.name_user_btn')
                        this.authUser(input_user.value,word, user)
                        
                    }
                }
            })
            this.htmlElement.addEventListener('click', (e)=>{
                let user = document.querySelector('.name_user_btn')
                if(e.target == user){
                    console.log(123);
                }
            })

        }
    }
    authUser(input, parent,user){

        // console.log(user);

        
    }
    addUserInArray(){
    }

    createButton(class_btn, val_btn, parent) {
        if (this.btn_create) {
            let btn = document.createElement('button')
            btn.classList.add(class_btn)
            btn.textContent = val_btn
            parent.append(btn)
        }
    }
    createStatistic(class_stat, parent, data_value, top) {
        let elem = document.createElement('div')
        elem.classList.add(class_stat)
        elem.textContent = data_value
        elem.style.top = top
        parent.append(elem)
    }
    lineProcessing(){
        let jsonString = JSON.stringify(this.data[this.index_question-1].translation_ru, null);
        let wert = jsonString.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/Makarov/g, '')
        wert = wert.split('_:')[1]
        return wert

    }

    acceptObject() {
        
        this.creatGeneralParameters()
        this.clicker_accept = true
        if(this.clicker_accept = true){
            let name_ru_s = JSON.stringify(this.data[this.index_question-1].lang);
            name_ru_s = name_ru_s.split(',')
            this.name_ru_string = JSON.stringify(this.data[this.index_question].lang, null);
        
            let item_one = `'name:' ${this.data[this.index_question-1].name}`
            let item_two = `'id_wiki': ${this.data[this.index_question-1].number_id}`
            let item_three = `'translation_ru': ${this.lineProcessing()}`
            let item_four = `'link': https://en.wikipedia.org/wiki/${this.data[this.index_question-1].name}`
            let item_five = `'lang': ${name_ru_s}`
            this.arr = [item_one, item_two, item_three, item_four,item_five]

            // let data_res = this.arr_accept.length
            let data_res = document.querySelector('.stats-2')
            data_res.textContent = `${this.arr_accept.length+1}`
            let percent_res = document.querySelector('.percent-2')
            
            let count_data = Object.keys(this.data)
            count_data = count_data.length
            
            percent_res.textContent = `${Math.ceil((this.arr_accept.length/count_data) * 100)}%`

            this.arr_accept.push(this.arr)
   
        }

    }
    objectReturn() {
        
        this.index_question--;
        
        // console.log(this.data[this.index_question].name);
        this.word_en.textContent = `${this.data[this.index_question].name}`

        // динамические изменение id
        if (this.id_n) {
            this.id_n.textContent = ' нет'
            
        }
        this.id_n.textContent = this.data[this.index_question].number_id

        // no lang типа ниже выводим все языки из парсера на вики. пока не нужны
        this.name_ru_string = JSON.stringify(this.data[this.index_question].lang, null);
        this.name_ru_string = this.name_ru_string.replace(/{/g, '').replace(/}/g, '').replace(':', '').replace(/Makarov/g, '');
        // this.name_ru.textContent = `https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`

        // динамическaя ссылка на рус
        let jsonString = JSON.stringify(this.data[this.index_question].translation_ru, null);
        let wert = jsonString.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/Makarov/g, '')
        wert = wert.split('_:')[1]

        // ifame
        this.iframe.src =`https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`
        
        // this.word_data.textContent = wert
        if (this.name_en.textContent == 'no lang') {
            this.name_en.textContent = 'нет перевода'
        }
        else{
            this.name_en.textContent = wert
        }
        
        // this.name_ru.textContent = this.name_ru_string
        // ссылка на английскую вики
        let a_link = `https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`
        this.name_ru.href = a_link
        this.name_ru.textContent = `ссылки на ${this.data[this.index_question].name}`

        // добавляем ссылку на вики ру
        let ru_link = `https://ru.wikipedia.org/wiki/${this.data[this.index_question].name}`
        // this.wiki.textContent =ru_link

        // ссылки на языки
        let link = this.htmlElement.querySelector('.link_lenght')
        let res = Object.keys(this.data[this.index_question].lang)
        if (res.length === 7) {
            res.length = '0'
        }
        let r = res.length
        link.textContent = r
        let remainder = this.htmlElement.querySelector('.stats-4')
        let count_data = Object.keys(this.data)
        count_data = count_data.length
        let index = this.index_question
        let count_res = count_data - index
        remainder.textContent = `${count_res-1}`
        console.log(count_res);
        let count = this.htmlElement.querySelector('.stats-1')
        count.textContent = `${this.index_question}`
        let percent = this.htmlElement.querySelector('.percent-1')
        let percent_res = Math.ceil((count_data / 100) * index)
        percent.textContent = `${percent_res}` + '%'
        console.log(percent_res);
        let percent_four = this.htmlElement.querySelector('.percent-4')
        percent_four.textContent = `${Math.ceil((100 / count_data) * (count_data - index))}` + '%'

        // удаляем из массивов последние
        if(this.clicker_accept == true){
            this.arr_accept.pop(this.data[this.index_question]-1)
            // let data_res = document.querySelector('.stats-2')
            // data_res.textContent = `${this.arr_accept.length}`
            // let percent_res = document.querySelector('.percent-2')
            
            // let count_data = Object.keys(this.data)
            // count_data = count_data.length       
            // percent_res.textContent = `${Math.ceil((this.arr_accept.length/count_data) * 100)}%`

        }
        if(this.clicker_refuce == true){
            this.arr_refuce.pop(this.data[this.index_question]-1)
            // let data_res = document.querySelector('.stats-3')
            // data_res.textContent = `${this.arr_refuce.length}`
            // let percent_res = document.querySelector('.percent-3')
            
            // let count_data = Object.keys(this.data)
            // count_data = count_data.length
            // percent_res.textContent = `${Math.floor((this.arr_refuce.length/count_data) * 100)}%`
            
        }
    }

    addLenghtArr() {
        this.length_arr = this.result.object.array.length;
        return this.length_arr;

    }


    creatGeneralParameters(){
        try {
            this.index_question++
            this.clicker_refuce = true
            if(this.clicker_refuce = true){
                // динамическое изменение имени на англ
                // this.name_en.textContent = this.data[this.index_question].name
                // this.word_data.textContent = `${this.data[this.index_question].name}`
                this.word_en.textContent = `${this.data[this.index_question].name}`

                // динамические изменение id
                if (this.id_n) {
                    this.id_n.textContent = ' нет'
                    
                }
                this.id_n.textContent = this.data[this.index_question].number_id
   

                // no lang типа ниже выводим все языки из парсера на вики. пока не нужны
                this.name_ru_string = JSON.stringify(this.data[this.index_question].lang, null);
                this.name_ru_string = this.name_ru_string.replace(/{/g, '').replace(/}/g, '').replace(':', '').replace(/Makarov/g, '');
                // this.name_ru.textContent = `https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`

                // динамическaя ссылка на рус
                let jsonString = JSON.stringify(this.data[this.index_question].translation_ru, null);
                let wert = jsonString.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/Makarov/g, '')
                wert = wert.split('_:')[1]
                
                // this.word_data.textContent = wert
                if (this.name_en.textContent == 'no lang') {
                    this.name_en.textContent = 'нет перевода'
                }
                else{
                    this.name_en.textContent = wert
                }
                
                // ifame
                this.iframe.src =`https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`


                // this.name_ru.textContent = this.name_ru_string
                // ссылка на английскую вики
                let a_link = `https://en.wikipedia.org/wiki/${this.data[this.index_question].name}`
                this.name_ru.href = a_link
                this.name_ru.textContent = `ссылки на ${this.data[this.index_question].name}`

                // ссылки на языки
                let link = this.htmlElement.querySelector('.link_lenght')
                let res = Object.keys(this.data[this.index_question].lang)
                if (res.length === 7) {
                    res.length = '0'
                }
                let r = res.length
                link.textContent = r
                let remainder = this.htmlElement.querySelector('.stats-4')
                let count_data = Object.keys(this.data)
                count_data = count_data.length
                let index = this.index_question
                let count_res = count_data - index
                remainder.textContent = `${count_res}`
                let count = this.htmlElement.querySelector('.stats-1')
                count.textContent = `${this.index_question}`
                let percent = this.htmlElement.querySelector('.percent-1')
                let percent_res = Math.ceil((count_data / 100) * index)

                percent.textContent = `${percent_res}` + '%'
                let percent_four = this.htmlElement.querySelector('.percent-4')
                percent_four.textContent = `${Math.ceil((100 / count_data) * (count_data - index))}` + '%'
            }

        } catch (error) {
            if(this.index_question === 0){
                this.createButton('btn_end', 'Завершить', b_left)
            }
        }

    }
    refuseObject(){
        this.creatGeneralParameters()
        this.arr_refuce.push(this.data[this.index_question-1])
        let data_res = document.querySelector('.stats-3')
        data_res.textContent = `${this.arr_refuce.length}`
        let percent_res = document.querySelector('.percent-3')
        
        let count_data = Object.keys(this.data)
        count_data = count_data.length
        percent_res.textContent = `${Math.floor((this.arr_refuce.length/count_data) * 100)}%`

        // this.arr_accept.push(this.arr)
    }
    createBlockTwo() {
        let table = document.createElement('div')
        table.style.position = 'relative'
        table.style.width = '100vw'
        table.style.minHeight = '100px'
        table.style.border = '1px solid #252525'
        table.style.display = 'flex'
        this.htmlElement.append(table)
        let table_r = document.createElement('div')
        let table_l = document.createElement('div')
        table_r.style.width = '50%'
        table_r.style.height = '100px'
        table_r.style.borderLeft = '1px solid #252525'
        table_r.style.position = 'relative'
        table_l.style.width = '50%'
        table_l.style.height = '100px'
        table_l.style.position = 'relative'
        table.append(table_l)
        table.append(table_r)

        let name_table_r = document.createElement('p')
        name_table_r.textContent = 'список созданных обьектов'
        name_table_r.style.padding = '20px 0 0 20px'

        let name_table_l = document.createElement('p')
        name_table_l.textContent = 'список удаленных обьектов'
        name_table_l.style.padding = '20px 0 0 20px'
        this.createStatistic('table_l', table_l, '', '10px')
        this.createStatistic('table_r', table_r, '', '10px')
        this.createStatistic('table_info_l', table_l, 'количество обьектов', '10px')
        this.createStatistic('table_info_r', table_r, 'количество обьектов', '10px')

        table_l.append(name_table_l)
        table_r.append(name_table_r)
        this.createButton('table_btn_1', 'Открыть', table_l)
        this.createButton('table_btn_2', 'Открыть', table_r)

        this.data = this.result.object.array
        // console.log(this.data);

        // static
        table_l.textContent = `${this.arr_refuce.length}`
        table_r.textContent = `${this.arr_accept.length}`
    }

    processor(){
        let dataset = this.arr_accept
        console.log(dataset);
    }
    addBtn_q(){

        this.btn_q = true
        if(this.btn_q == true){
            this.index_question++
            let dataset = this.data

            let count_data = Object.keys(dataset)
            count_data = count_data.length
            let index = this.index_question
            let count_res = count_data - index
            // console.log(count_res);

        }
    }
}
