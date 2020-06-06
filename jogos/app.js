var games = {
    tag: 'rpgpt',
    base_url: 'https://rkd.chmuranet.net/tools/rpgportugal/api.php',
    ids: [],
    list: [],
    load_delay: 100,
    correct_layout: false,
    request: function(){
        if(window.localStorage[games.tag + '_games']){ games.list = JSON.parse(window.localStorage[games.tag + '_games']); }
        var url = games.base_url + '?tag=' + games.tag;
        fetch(url).then(function(response){ return response.json(); }).then(function(response){ 
            if(response.success){ 
                games.list = response.result; 
                window.localStorage[games.tag + '_games'] = JSON.stringify([games.list]);
            }
            if(games.list.length > 0){ games.next(); }
        });
    },
    next: function(){
        if(games.list.length == 0){ return false; }
        var data = games.list.shift();
        var game = document.getElementById('template').cloneNode(true);
        game.id = 'game_' + data.id;
        game.dataset.url = data.url;
        game.children[0].src = data.still_cover_url? data.still_cover_url : data.cover_url;
        game.children[0].onload = games.next;
        game.children[1].innerText = data.title;
        game.children[2].innerText = data.short_text? data.short_text : '(sem descrição)';
        game.children[3].innerText = data.user.display_name? data.user.display_name : '(sem nome)';
        game.children[4].src = data.user.cover_url? data.user.cover_url : 'itch_square.png';
        document.getElementById('games').appendChild(game);
    },
    open: function(element){
        window.open(element.dataset.url, '_blank');
    }
};
