var loading = {
    element: document.getElementById('loading'),
    show: function(){ loading.element.style.display = 'grid'; },
    hide: function(){ loading.element.style.display = 'none'; }
};
var invite = {
    service: 'https://rkd.chmuranet.net/tools/rpgportugal/discord/',
    base_url: 'https://discord.gg/',
    get: function(){
        if(!fetch){
            alert('Utiliza um browser actualizado para aceder ao Discord (ex: Microsoft Edge)');
            return false; 
        }
        var request_url = invite.service + '?w=' + window.innerWidth + '&h=' + window.innerHeight;
        if(document.referrer){ request_url += '&r=' + encodeURI(document.referrer); }
        loading.show();
        fetch(request_url).then(function(response){ return response.json(); }).then(function(response){ 
            loading.hide();
            if(response.success && response.code){ 
                var opened = open(invite.base_url + response.code, '_blank');
                if(!opened){//pop-up was blocked
                    window.location.href = invite.base_url + response.code;
                }
            }else{
                alert('Neste momento não há convites disponíveis para entrar no servidor. Podes tentar mais tarde.');
            }
        }).catch(function(error){
            loading.hide();
            alert(error);
        });
    }
};
var lang = {
    element: document.getElementById('lang'),
    translate: function(){//called onload
        var translation_index = lang.currentIndex();
        Object.keys(lang.translations).map(function(id){
            var element = document.getElementById(id);
            if(!element){ return false; }
            element.innerText = lang.translations[id][translation_index];
            element.innerHtml = lang.translations[id][translation_index];
        });
        document.getElementById('rpgs_from_portugal').src = 'jogos/logo' + lang.current() + '.png';
        var next_code = lang.next();
        lang.element.innerText = next_code;
        lang.element.href = '?lang=' + next_code;
    },
    current: function(){
        if(window.location.search){
            var code = window.location.search.replace('?lang=', '');
            if(lang.codes.indexOf(code) == -1){ return lang.codes[0]; }
            else{ return code; }
        }else{ return lang.codes[0]; }
    },
    currentIndex: function(){ return lang.codes.indexOf(lang.current()); },
    next: function(){
        var next_index = lang.codes.indexOf(lang.current()) + 1;
        if(next_index == lang.codes.length){ next_index = 0; }
        return lang.codes[next_index];
    },
    codes: ['pt', 'en'],
    translations:{
        slogan:[
            'Adiciona este servidor ao teu Discord e vem jogar RPGs tabletop com pessoal de Portugal',
            'Add this server to your Discord and find many other tabletop roleplayers in Portugal'
        ],
        call_to_action:[
            'Junta-te a nós',
            'Come and join us'
        ],
        friends_title:[
            'Amigos do RPG Portugal',
            'Friends of RPG Portugal'
        ],
        your_profile_here:[
            'O teu perfil aqui em breve?',
            'Your profile here soon?'
        ],
        want_to_be_our_friend:[
            'Queres ser nosso amigo? Já fazes parte do servidor?',
            'Would you like to help us promote the server?'
        ],
        get_us_a_kofi:[
            'Oferece-nos então um',
            'Buy us a'
        ],
        to_help:[
            'para ajudar a manter o domínio rpgportugal.com',
            'to help maintain the rpgportugal.com domain'
        ],
        rpgportugal_recommends:[
            'O RPG Portugal recomenda: joga os jogos do teu país!',
            'RPG Portugal recommends:'
        ],
        rpgs_published:[
            'RPGs publicados por Portugueses no itch.io',
            'RPGs published by Portuguese designers in itch.io'
        ],
        created_by:[
            'landing-page para o RPG Portugal criada e mantida por',
            'landing page for RPG Portugal created and maintained by'
        ],
        checkbox_1:[
            "Interessam-me os RPGs de mesa e quero encontrar pessoal para jogar.",
            "I'm interested in tabletop RPGs and I'd like to find people I can play with."
        ],
        checkbox_2:[
            "Estou pronto para entrar no Discord com o meu login ou criando uma conta.",
            "I'm ready to go into Discord with my login or by creating an account."
        ],
        checkbox_3:[
            "Vou entrar no servidor, ler o canal de #regras e responder às pessoas na #entrada.",
            "I will go into the server and introduce myself to the people in the #entrada channel."
        ]
    }
};

var friends = [
    {link: 'https://itch.io/profile/ladyentropy'},
    {link: 'https://twitter.com/jogadorsonhador'},
    {link: 'https://twitter.com/jrnmariano'},
    {link: 'https://itch.io/profile/misticspell'},
    {link: 'https://stackoverflow.com/users/757114/cybervitor'},
    {link: 'https://twitter.com/Skrarun1'},
    {link: 'https://twitter.com/jofazepa'},
    {link: 'https://twitter.com/telmomendesleal'},
    {link: 'https://twitter.com/catsjacinto'},
    {link: 'https://twitter.com/Skrarun1'},
    {link: 'https://www.twitch.tv/sanguinia'},
    {link: 'https://twitter.com/ricmadeira'},
    {link: 'https://twitter.com/scumbagDM'},
    {link: 'https://twitter.com/PreciousMinakie'}
];

var app = new Vue({
    el: '#app',
    data: {
        checkboxes:{ 
            loading: false,
            open: false,
            items:[ 
                {labels: [
                "Interessam-me os RPGs de mesa e quero encontrar pessoal para jogar.",
                "I'm interested in tabletop RPGs and I'd like to find people I can play with."
                ], value: false}, 
                {labels: [
                "Estou pronto para entrar no Discord com o meu login ou criando uma conta.",
                "I'm ready to go into Discord with my login or by creating an account."
                ], value: false}, 
                {labels: [
                "Vou seguir o que terei indicado no canal de #regras e responder às pessoas na #entrada.",
                "I will go into the server and introduce myself to the people in the #entrada channel."
                ], value: false}
            ]
        },
        friends_layed_out: false
    },
    methods: {
        t: function(translations){ return translations[lang.currentIndex()]; },
        currentLang: function(){ return lang.current(); },
        nextLang: function(){ return lang.next(); },
        layoutFriends: function(){
            if(this.friends_layed_out){ return friends; }
            friends = friends.map(function(friend, index){
                if(!friend.avatar){ friend.avatar = 'img/friends/' + (index+1) + '.png' }
                return friend;
            });
            if(friends.length % 3 != 0){ 
                if((friends.length+2) % 3 == 0){
                    friends.push({placeholder: true}); 
                    friends.splice((friends.length-1), 0, {your_profile_here: true});
                }
                if((friends.length+1) % 3 == 0){
                    friends.splice((friends.length-1), 0, {your_profile_here: true});
                }
            }else{
                friends.push({placeholder: true}); 
                friends.push({placeholder: true}); 
                friends.splice((friends.length-1), 0, {your_profile_here: true});
            }
            this.friends_layed_out = true;
            return friends;
        },
        openCheckboxes: function(){
            var self = this;
            if(self.checkboxes.loading){ return false; }
            window.scrollTo(0, 0);
            self.checkboxes.loading = true;
            self.checkboxes.items = self.checkboxes.items.map(function(checkbox){ checkbox.value = false; return checkbox; });
            setTimeout(function(){ 
                self.checkboxes.loading = false;
                self.checkboxes.open = true; 
            }, 500);
        },
        checkBoxesReady: function(){
            return this.checkboxes.items.reduce(function(ready, item){ return (ready && item.value); }, true);
        },
        openDiscord: function(){
            if(!this.checkBoxesReady()){ return false; }
            invite.get();
        }
    }
});

