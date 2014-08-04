var channel;
var players = new Array(), myPlayer = null, enemy = null;
var myIndex = -1;
var turn;
var gameOver = false;
var bornpoint1 = { "i": 2, "j": 1 };
var bornpoint2 = { "i": 14, "j": 15 };
var hp = 5;
var row = 16;
var col = 20;
var viewrange = 4;
var test;
var Map_base = [];
var Map_mask = [];
var weapon_power = 3;
var butShoot = $('a.#p2').bind("click", function () {
    $(this).css('display', 'none');
    $('div#player_02').children().eq(-1).empty();
    make_shoot(0, 0);

});
var butWait = $('a.wait').bind("click", function () { make_wait(); });


//test players
function testenviro() {
    players.push(
    {
        "name": "myPlayer",
        "i": bornpoint1.i,
        "j": bornpoint1.j,
        "hp": hp,
        "weapon": "default",
        "cover": 0,
        "userid": 11111,
        "belongto": "Force A",
        "alive": true,
        "waiting": false,
        "hiding": false,
        "remainmove": 2
    });
    players.push(
    {
        "name": "enemy",
        "i": bornpoint2.i,
        "j": bornpoint2.j,
        "hp": hp,
        "weapon": "default",
        "cover": 0,
        "userid": 22222,
        "belongto": "Force B",
        "alive": true,
        "waiting": false,
        "hiding": false,
        "remainmove": 2
    });
    myPlayer = players[0];
    enemy = players[1];
    myIndex = 0;
    turn = 0;
}
function reset_mask() {
    Map_mask[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[11] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[12] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[13] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[14] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_mask[15] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function toggle_wait_icon(status) {
    if (status) {
        butWait.show();
    }
    else {
        butWait.hide();
    }
}

function toggle_shoot_icon(status) {
    if (status) {
        butShoot.show();
    }
    else {
        butShoot.hide();
    }
}
// remap jQuery to $
(function ($) { })(window.jQuery);

function find_playerbyid(id) {
    if (myPlayer != null && myPlayer.userid == id)
        return myPlayer;
    else if (enemy != null && enemy.userid == id)
        return enemy;
    else
        return null;
}

function setup_next_turn() {
    on_log("Round" + turn);
    if (turn % 2 === myIndex) {
        on_log("Your turn. HP:" + myPlayer.hp);
        reset_mask();
        spirit_rander_area(myPlayer.i, myPlayer.j, true);
        spirit_rander_area(myPlayer.i, myPlayer.j, false);
    }
    else {
        test.init();
    }
    for (var index = 0; index < players.length; index++) {
        players[index].remainmove = 2;
    }
}

function isinarray(result, i, j) {
    for (var n = 0; n < result.length; n++) {
        if (result[n].i == i && result[n].j == j)
            return true;
    }
    return false;
}

function addmatrix(result, i, j) {
    if (!isinarray(result, i, j))
        result.push({ "i": i, "j": j });
    return result;
}

//return the visible area, shoot=true for shooting and false from movement
function spirit_getvision(i, j, sight, shoot) {
    var valve = shoot ? 2 : 1;
    if (i >= row || j >= col || i < 0 || j < 0)
        return null;
    var result = new Array();
    var border = new Array();
    addmatrix(result, i, j);
    var min_count = 0;
    var max_count = result.length;
    for (var n = 0; n < sight; n++) {
        for (var index = min_count; index < max_count; index++) {
            var block_i = parseInt(result[index].i);
            var block_j = parseInt(result[index].j);
            if (block_i > 0) {
                if (Map_base[block_i - 1][block_j] < valve && (shoot || spirit_getenemy(block_i - 1, block_j) == null)) {
                    addmatrix(result, parseInt(block_i) - 1, parseInt(block_j));
                }
                else if (shoot) {
                    addmatrix(border, parseInt(block_i) - 1, parseInt(block_j));
                }
            }
            if (block_i < row - 1) {
                if (Map_base[block_i + 1][block_j] < valve && (shoot || spirit_getenemy(block_i + 1, block_j) == null)) {
                    addmatrix(result, parseInt(block_i) + 1, parseInt(block_j));
                }
                else if (shoot) {
                    addmatrix(border, parseInt(block_i) + 1, parseInt(block_j));
                }
            }
            if (block_j > 0) {
                if (Map_base[block_i][block_j - 1] < valve && (shoot || spirit_getenemy(block_i, block_j - 1) == null)) {
                    addmatrix(result, parseInt(block_i), parseInt(block_j) - 1);
                }
                else if (shoot) {
                    addmatrix(border, parseInt(block_i), parseInt(block_j) - 1);
                }
            }
            if (block_j < col - 1) {
                if (Map_base[block_i][block_j + 1] < valve && (shoot || spirit_getenemy(block_i, block_j + 1) == null)) {
                    addmatrix(result, parseInt(block_i), parseInt(block_j) + 1);
                }
                else if (shoot) {
                    addmatrix(border, parseInt(block_i), parseInt(block_j) + 1);
                }
            }
        }
        //detect new elements
        if (max_count == result.length)
            return result;
        else {
            min_count = max_count;
            max_count = result.length;
        }
    }

    if (shoot) {
        for (var index = 0; index < border.length; index++) {
            addmatrix(result, border[index].i, border[index].j);
        }
    }
    else {
        result.splice(0, 1);
    }
    return result;
}

function spirit_can_see(i, j) {
    if (isinarray(spirit_getvision(myPlayer.i, myPlayer.j, viewrange, true), i, j))
        return true;
    else
        return false;
}

function spirit_rander_area(i, j, shoot) {
    var result = spirit_getvision(i, j, viewrange, shoot);
    for (var index = 0; index < result.length; index++) {
        Map_mask[parseInt(result[index].i)][parseInt(result[index].j)] = (shoot == true ? 1 : 2);
    }
    test.init();
}

function spirit_can_move(i, j) {
    if (isinarray(spirit_getvision(myPlayer.i, myPlayer.j, viewrange, false), i, j) && (i != myPlayer.i || j != myPlayer.j))
        return true;
    else
        return false;
}

function make_move(i, j) {
    // Check if a valid move was made.
    if ((!gameOver) && (turn % 2 === myIndex) && (myPlayer.remainmove > 0) && (spirit_can_move(i, j))) {
        channel.event_queue("moves", {
            "object": {
                "movetype": "move",
                "moveto_i": i,
                "moveto_j": j,
                "origin": myPlayer.userid,
                "target": myPlayer.userid,
                "killed": false,
                "damage": 0
            }
        });
    }
}


function spirit_getenemy(i, j) {
    if (enemy.i == i && enemy.j == j)
        return enemy;
    else
        return null;
}

function spirit_detectcover(i, j) {
    i = parseInt(i);
    j = parseInt(j);
    return Math.max(
        i - 1 < 0 ? 0 : Map_base[i - 1][j],
        i + 1 >= row ? 0 : Map_base[i + 1][j],
        j - 1 < 0 ? 0 : Map_base[i][j - 1],
        j + 1 >= col ? 0 : Map_base[i][j + 1]);
}

function spirit_calculate_damage(target) {
    if (spirit_can_see(target.i, target.j)) {
        return weapon_power - spirit_detectcover(target.i, target.j) - target.hiding + Math.round(2 * Math.random());
    }
    else
        return 0;
}

function spirit_moveto(warrior, i, j) {
    warrior.i = parseInt(i);
    warrior.j = parseInt(j);
    warrior.waiting = false;
    warrior.hiding = false;
    warrior.cover = spirit_detectcover(i, j);
    warrior.remainmove -= 1;
    if (warrior.remainmove == 0) {
        reset_mask();
        spirit_rander_area(warrior.i, warrior.j, true);
        turn++;
        setup_next_turn();
    }
    else {
        if (warrior == myPlayer) {
            reset_mask();
            spirit_rander_area(warrior.i, warrior.j, true);
            spirit_rander_area(warrior.i, warrior.j, false);
        }
        test.init();
    }
    //TODO: additional animation movements
}

function spirit_shootat(warrior, target, damage, killed) {
    if (warrior != null && target != null) {
        if (target == myPlayer)
            var hpbar = "div#player_01";
        else
            var hpbar = "div#player_02";
        $(hpbar).children(0).removeClass('stage' + target.hp);
        target.hp -= damage;
        on_log(warrior.name + " did " + damage + " damage to " + target.name);
        $(hpbar).children(0).addClass('stage' + target.hp);
        target.alive = !killed;
        if (killed) {
            //TODO:animation
            gameOver = true;
            if (target == myPlayer) {
                on_log("You lose");
                $('div.frame').css({
                    background: 'url("_/images/game_lose.png")',
                    'z-index': 99999
                });
                // $('a.again').css('display', 'block');
            }
            else {
                on_log("You won");
                $('div.frame').css({
                    background: 'url("_/images/game_win.png")',
                    'z-index': 99999
                });
                // $('a.again').css('display', 'block');
            }
        }
        else {
            target.remainmove = 0;
            turn++;
            setup_next_turn();
        }
    }
}

function make_shoot(i, j) {
    // Check if a valid move was made.
    var target = spirit_getenemy(i, j);
    if (target == null)
        target = spirit_can_see(enemy.i, enemy.j) ? enemy : null;
    if ((!gameOver) && (turn % 2 === myIndex) && (myPlayer.remainmove > 0) && (target != null) && (spirit_can_see(target.i, target.j))) {
        var damage = spirit_calculate_damage(target);
        if (damage >= 3)
            $('<div></div>').addClass('shot').appendTo($('div#player_02').children().eq(-1)).delay(400).hide(0.00001);
        else
            $('<div></div>').addClass('miss').appendTo($('div#player_02').children().eq(-1)).delay(250).hide(0.00001);

        var killed = damage >= target.hp ? true : false;
        channel.event_queue("moves", {
            "object": {
                "movetype": "shoot",
                "moveto_i": i,
                "moveto_j": j,
                "origin": myPlayer.userid,
                "target": target.userid,
                "killed": killed,
                "damage": damage
            }
        });
    }
}

function spirit_hide(warrior) {
    if (warrior != null) {
        warrior.hiding = true;
        warrior.remainmove = 0;
        turn++;
        reset_mask();
        spirit_rander_area(warrior.i, warrior.j, true);
        test.init();
        setup_next_turn();
    }
}

function spirit_wait(warrior) {
    if (warrior != -1) {
        warrior.waiting = true;
        warrior.remainmove = 0;
        turn++;
        setup_next_turn();
    }
}

function make_wait() {
    // Check if a valid move was made.
    if ((!gameOver) && (turn % 2 === myIndex) && (myPlayer.remainmove > 0)) {
        channel.event_queue("moves", {
            "object": {
                "movetype": "wait",
                "moveto_i": 0,
                "moveto_j": 0,
                "origin": myPlayer.userid,
                "target": myPlayer.userid,
                "killed": false,
                "damage": 0
            }
        });
    }
}

function make_hide() {
    // Check if a valid move was made.
    if ((!gameOver) && (turn % 2 === myIndex) && (myPlayer.remainmove > 0)) {
        channel.event_queue("moves", {
            "object": {
                "movetype": "hide",
                "moveto_i": 0,
                "moveto_j": 0,
                "origin": myPlayer.userid,
                "target": myPlayer.userid,
                "killed": false,
                "damage": 0
            }
        });
    }
}

function on_make_move(movement) {

    var i = parseInt(movement.moveto_i);
    var j = parseInt(movement.moveto_j);
    var origin = myPlayer.userid == movement.origin ? myPlayer : enemy;
    var target = myPlayer.userid == movement.target ? myPlayer : enemy;
    var killed = movement.killed;
    var damage = movement.damage;
    switch (movement.movetype) {
        case "move":
            spirit_moveto(origin, i, j);
            break;
        case "shoot":
            spirit_shootat(origin, target, damage, killed);
            break;
        case "hide":
            spirit_hide(origin);
            break;
        case "wait":
            spirit_wait(origin);
            break;
    }

}

function on_chat(message) {
    var username;
    var user = find_playerbyid(message.setter);
    if (user != null)
        username = user.name;
    else
        username = "Anonymous";
    $('<p><span class="username">' + username + ': </span>' + message.object.message + '</p>').prependTo($('#log'));
}

function on_log(msg) {
    $('<p><span class="username">System: </span>' + msg + '</p>').prependTo($('#log'));
}

function on_send_message(event) {
    // Check if any message has been entered.
    if ($("#content").val() !== "") {
        // Send the message to all users.
        channel.event_queue(
                "chat",
                { "object": { "message": $("#content").val() } }
            );
        // Reset the message input box.
        $("#content").val("");
        $("#content").focus();
    }
    // Prevent the page from auto-refreshing.
    event.preventDefault();
    return false;
};

function connect() {
    var client =
    {
        connect: function () {
            channel.subscribe([
                    //{"type": "event_queue", "name": "players"},
                    { "type": "event_queue", "name": "chat" },
                    { "type": "event_queue", "name": "moves" },
                    { "type": "event_queue", "name": "imo.clients" }],
                    0
                );
            // Let everyone know this player has joined.
            //channel.event_queue("players", { });
        },

        subscribe_done: function () {
            // Check if an opponent has yet to join.
            console.log("subscribe_done,players:" + players.length);
            if (players.length < 2) {
                //TODO
                on_log("Please wait for an opponent.");
            }
        },

        event_queue: function (name, event) {
            console.log("name: " + name + " stamp: " + event.stamp);
            if (name == "moves") {
                on_make_move(event.object);
            }
            else if (name == "chat") {
                on_chat(event);
            }
            else if (name == "imo.clients" && event.object.action == "join" && (find_playerbyid(event.setter) == null) && (players.length < 2)) {
                if (event.setter == channel.get_public_client_id()) {
                    myname = event.object.first_name + " " + event.object.last_name;
                    myPlayer = {
                        "name": myname,
                        "i": event.stamp == 0 ? bornpoint1.i : bornpoint2.i,
                        "j": event.stamp == 0 ? bornpoint1.j : bornpoint2.j,
                        "hp": hp,
                        "weapon": "default",
                        "cover": 0,
                        "userid": event.setter,
                        "belongto": "Force A",
                        "alive": true,
                        "waiting": false,
                        "hiding": false,
                        "remainmove": 2
                    };
                    players.push(myPlayer);
                    //event.object.icon_url;                   
                }
                else {
                    enemyname = event.object.first_name + " " + event.object.last_name;
                    enemy = {
                        "name": enemyname,
                        "i": event.stamp == 0 ? bornpoint1.i : bornpoint2.i,
                        "j": event.stamp == 0 ? bornpoint1.j : bornpoint2.j,
                        "hp": hp,
                        "weapon": "default",
                        "cover": 0,
                        "userid": event.setter,
                        "belongto": "Force B",
                        "alive": true,
                        "waiting": false,
                        "hiding": false,
                        "remainmove": 2
                    };
                    players.push(enemy);
                }
                // Check if two players are now in the game.
                if (players.length == 2) {
                    console.log("players:" + players.length + " Game starts!");
                    on_log("Player joined! Game starts!")
                    // Get the user's player index (observer represented by -1).
                    myPlayer = find_playerbyid(channel.get_public_client_id());
                    myIndex = players.indexOf(myPlayer);
                    // Set up the first turn.
                    turn = 0;
                    setup_next_turn();
                }
            }
        }
    };
    return new IMO.Channel(client);
};

/* trigger when page is ready */
$(document).ready(function () {

    Map_base[0] = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    Map_base[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_base[2] = [0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_base[3] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 1, 1, 2, 1, 2, 0];
    Map_base[4] = [0, 2, 2, 1, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0];
    Map_base[5] = [0, 2, 0, 0, 1, 2, 0, 1, 1, 0, 0, 2, 0, 2, 1, 0, 0, 0, 2, 0];
    Map_base[6] = [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0];
    Map_base[7] = [0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 1, 2, 0, 2, 0, 0, 2, 0, 2, 0];
    Map_base[8] = [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 0];
    Map_base[9] = [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0];
    Map_base[10] = [0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0];
    Map_base[11] = [0, 0, 0, 2, 0, 0, 2, 2, 1, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 0];
    Map_base[12] = [0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0];
    Map_base[13] = [0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0];
    Map_base[14] = [0, 0, 0, 2, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0];
    Map_base[15] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var Map_view = [];
    Map_view[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[1] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0];
    Map_view[3] = [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0];
    Map_view[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[6] = [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    Map_view[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
    Map_view[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[9] = [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[10] = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0];
    Map_view[11] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[12] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
    Map_view[13] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
    Map_view[14] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Map_view[15] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



    test = {

        init: function () {
            this.map = $('div#map');
            this.mask = $('div#mask');
            this.butMove = $('div#move');

            if (myPlayer != null) {
                $('div#player_01').css({
                    top: (myPlayer.i - 1) * 32 + 'px',
                    left: myPlayer.j * 32 + 'px',
                    'z-index': (myPlayer.i + 1) * 2
                });
                $('div#player_01').show();
            }
            else {
                $('div#player_01').hide();
            }

            if (enemy != null) {
                $('div#player_02').css({
                    top: (enemy.i - 1) * 32 + 'px',
                    left: enemy.j * 32 + 'px',
                    'z-index': (enemy.i + 1) * 2
                });
                $('div#player_02').show();
            }
            else {
                $('div#player_02').hide();
            }


            if (enemy != null && myPlayer != null && turn % 2 == myIndex && spirit_can_see(enemy.i, enemy.j)) {
                butShoot.css({
                    top: (enemy.i * 32 + 7) + 'px',
                    left: (enemy.j * 32 - 4) + 'px',
                });
                toggle_shoot_icon(true);
            }
            else {
                toggle_shoot_icon(false);
            }

            if (myPlayer != null && turn % 2 == myIndex && myPlayer.remainmove > 0) {
                butWait = $('a.wait');
                toggle_wait_icon(true);
                butWait.css({
                    top: (myPlayer.i * 32 + 7) + 'px',
                    left: (myPlayer.j * 32 - 3) + 'px',
                });
            }
            else {
                toggle_wait_icon(false);
            }

            $('<div></div>').attr({
                class: 'tile'
            }).css({
                top: '32px'
            }).appendTo(this.map);

            for (i = 0 ; i < 16 ; i++) {
                for (j = 0 ; j < 20 ; j++) {

                    $('<div></div>').attr({
                        class: 'tile'
                    }).css({
                        top: i * 32 + 'px',
                        left: j * 32 + 'px',
                        'background-position': (j * -32) + 'px ' + (i * -32) + 'px',
                        'z-index': (i + Map_view[i][j]) * 2 + 1
                    }).appendTo(this.map);

                    $('<div></div>').css({
                        top: (i * 32) + 'px',
                        left: (j * 32) + 'px'
                    }).appendTo(this.mask);
                }
            };

            this.butMove.empty();

            for (i = 0 ; i < 16 ; i++) {
                for (j = 0 ; j < 20 ; j++) {
                    if (Map_mask[i][j] == 0) {
                        this.mask.children().eq(i * 20 + j).removeAttr('class').attr('class', 'hide');
                    } else if (Map_mask[i][j] == 2) {
                        this.mask.children().eq(i * 20 + j).removeAttr('class').attr('class', 'move');
                        $('<a></a>').attr({
                            href: '#',
                            'data-i': i,
                            'data-j': j
                        }).css({
                            top: (i * 32) + 'px',
                            left: (j * 32) + 'px'
                        }).appendTo(this.butMove);
                    } else {
                        this.mask.children().eq(i * 20 + j).removeAttr('class');
                    };
                }
            };

            this.butMove.children().click(function () {
                var i = $(this).data('i'),
					j = $(this).data('j');
                make_move(i, j);
            });



        }

    };

    $("#send").click(on_send_message);

    reset_mask();
    //testenviro();
    test.init();
    channel = connect();
});
