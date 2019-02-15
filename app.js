var app = new Vue({
    el: '#app',
    data: {
        editMode: false,
        openMenu: false,
        defaultListElement: {duration: "2020", title: "Tittel...", text: "Info..."},
        savedData: JSON.parse(window.localStorage.getItem("vueCV-savedData")),
        cvLastName: JSON.parse(window.localStorage.getItem("vueCV-lastName")),
        content: {
            name: "Ola Nordmann",
            personInfo: {
                mobile: "12345678",
                email: "email@hotmail.com",
                place: "Oslo",
            },
            intro: "...",
            other: "...",
            lists: {
                experience: [
                    { duration: "2020", title: "Jobb 3", text: "Info..."},
                    { duration: "2016-2019", title: "Jobb 2", text: "Info..."}, 
                    { duration: "2013-2016", title: "Jobb 1", text: "Info..."}],
                education: [
                    { duration: "2010-2013", title: "Studie 1", text: "Info..."}, 
                    { duration: "2009-2010", title: "Studie 2", text: "Info..."}],
            },
            titleStyle: {'background-color': "#f2f2f2"}, 
            mainStyle: {
                'min-height': '100%',
                color: "#000000",
                'background-color': "#ffffff", 
                'font-family': '"Times New Roman", Times, serif',
            },
            fonts: {
                "Georgia": "Georgia, serif",
                "Palatino": '"Palatino Linotype", "Book Antiqua", Palatino, serif',
                "Times New Roman": '"Times New Roman", Times, serif',
                "Arial": '"Arial", Helvetica, sans-serif',
                "Arial Black": '"Arial Black", Gadget, sans-serif',
                "Comic Sans MS": '"Comic Sans MS", cursive, sans-serif',
                "Impact": '"Impact", Charcoal, sans-serif',
                "Lucida Sans": '"Lucida Sans Unicode", "Lucida Grande"',
                "Tahoma": '"Tahoma", Geneva, sans-serif',
                "Trebuchet MS": '"Trebuchet MS", Helvetica, sans-serif',
                "Verdana": '"Verdana", Geneva, sans-serif',
                "Courier New": '"Courier New", Courier, monospace',
                "Lucida Console" : '"Lucida Console", Monaco, monospace',
            }
        }
        
    },
   
    methods: {
        sortListElements: function (a, b) {
            a_from = a.duration.substring(0, 4);
            a_to = (a.duration.length > 8) ? a.duration.substring(5, 9) : a_from;
            b_from = b.duration.substring(0, 4);
            b_to = (b.duration.length > 8) ? b.duration.substring(5, 9) : b_from;
            return (a_to == b_to) ?  b_from - a_from : b_to - a_to
        },

        saveAs: function(){
            var name = prompt("Navn: ", this.cvLastName);
            if(name == null || name.length < 1){
                alert("Navn må inneholde minst ett tegn"); return;
            }
            this.save(name);
        },

        save: function(name){
            this.cvLastName = name;
            var newData = JSON.parse(JSON.stringify(this.content));
            Vue.set(this.savedData, name, newData);
            window.localStorage.setItem(
                "vueCV-savedData", JSON.stringify(this.savedData));
        },

        loadData: function(name){
            this.cvLastName = name;
            this.content = this.savedData[name];
            window.localStorage.setItem(
                "vueCV-lastName", JSON.stringify(this.cvLastName));
        },

        deleteData: function(name){
            Vue.delete(this.savedData, name);      
        },

        deleteAll: function(){
            this.savedData = null;
            window.localStorage.setItem(
                "vueCV-lastName", JSON.stringify(null));
                this.openMenu = false;
        }
    },

    mounted() {
        if(this.cvLastName == null) this.cvLastName = "default";
        if(this.savedData == null) this.savedData = {};
        if(this.savedData[this.cvLastName] == null) this.save(this.cvLastName);
        this.loadData(this.cvLastName);
    }
})


