var shared = require('./shared');
var router = shared.router;
var moment = require('moment');

module.exports = {
    url: function (name, params) {
        return router.url(name, params);
    },

    fromNow: function(timeStr){
        var time = moment(timeStr, 'YYYY/MM/DD HH:mm:ss ZZ').fromNow(true);

        return time;
    },
    toTime: function(milliseconds){
        var time = '';
        var duration = moment.duration(milliseconds); 
        var hours = duration.hours();
        if(hours){
            time = hours + '.'; 
        }
        duration = duration.subtract(moment.duration(hours, 'h'));
        var minutes = duration.minutes();
        if(minutes){
            time = time + minutes + '.'; 
        }else{
            time = time + '0.'; 
        }
        duration = duration.subtract(moment.duration(minutes, 'm'));
        var seconds = duration.seconds();
        if(seconds){
            time = time + seconds;
        }else{
            time = time + '00';
        }

        return time;
    },

    img: function (src, sizeName) {
        if (src && sizeName) {
            if(src.search('default') != -1){
                src = false; 
            }else{
                src = src.replace('large', sizeName);
            }
        }

        if(!src && sizeName){

            switch(sizeName){
                case 'large':
                    src = '/img/no/no100.png';
                break;
                case 't67x67':
                    src = '/img/no/no67.png';
                break;
                case 'badge':
                    src = '/img/no/no47.png';
                break;
                case 'small':
                    src = '/img/no/no32.png';
                break;
                case 'tiny':
                    src = '/img/no/no20.png';
                break;
                case 'mini':
                    src = '/img/no/no16.png';
                break;
                default:
                    src = '/img/no/no100.png';
                break;
            } 

        }

        return src;
    }
};
