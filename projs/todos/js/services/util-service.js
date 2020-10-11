function makeId(length=5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i < length; i++){
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function setTime(){
    var time = new Date();
    return `${time.getDate()}/${time.getMonth()+1}/${
        time.getFullYear()} - ${time.getHours()}:${time.getMinutes < 10 ? '0'+time.getMinutes() : time.getMinutes()}`;
}