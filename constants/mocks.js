const channels = [
    {
        id: 'backward',
        name: 'Backward',
        icon: 'ios-skip-backward',
        tags: ['remote'],
        count: 133,
        image: require('../assets/icons/plants.png'),
        cmd: 'PRE 1'
    },
    {
        id: 'forward',
        name: 'Forward',
        icon: 'ios-skip-forward',
        tags: ['remote'],
        count: 112,
        image: require('../assets/icons/seeds.png'),
        cmd: 'NEXT 1'
    },
    {
        id: 'mute',
        name: 'Mute',
        icon: 'ios-volume-off',
        tags: ['remote'],
        count: 143,
        image: require('../assets/icons/flowers.png'),
        cmd: 'MUT 1'
    },

    {
        id: 'unmute',
        name: 'Unmute',
        icon: 'ios-volume-high',
        tags: ['remote'],
        count: 122,
        image: require('../assets/icons/sprayers.png'),
        cmd: 'MUT 0'
    },
    {
        id: 'volp',
        name: 'Vol +',
        icon: 'ios-volume-high',
        tags: ['remote', 'shop'],
        count: 133,
        image: require('../assets/icons/pots.png'),
        cmd: 'VOL 1'
    },
    {
        id: 'volm',
        name: 'Vol -',
        icon: 'ios-volume-low',
        tags: ['remote', 'favourite'],
        count: 133,
        image: require('../assets/icons/fertilizers.png'),
        cmd : 'VOL -1'
    },
    {
        id: 'ch1',
        name: 'News 92',
        icon: 'ios-volume-low',
        tags: ['channels'],
        count: 133,
        image: require('../assets/icons/news-92.png'),
        cmd : 'PLAY http://92news.vdn.dstreamone.net/92newshd/92hd/playlist.m3u8 http://www.journalismpakistan.com/news/92%20News%20Media%20Group%20prepapres%20to%20launch%20newspapers.jpg'
    },
    {
        id: 'ch2',
        name: 'Geo Tez',
        icon: 'ios-volume-low',
        tags: ['channels'],
        count: 133,
        image: require('../assets/icons/geo-tez.png'),
        cmd : 'PLAY http://stream.jeem.tv/geo/geotezz/playlist.m3u8 https://dnd.com.pk/wp-content/uploads/2014/05/BoFzI1nIgAADAka.jpg'
    },
    {
        id: 'ch3',
        name: 'Express News',
        icon: 'ios-volume-low',
        tags: ['channels', 'favourite'],
        count: 133,
        image: require('../assets/icons/express-news.png'),
        cmd : 'PLAY http://expressdigital.flashmediacast.com:1935/expressdigital/livestream/playlist.m3u8 https://pakistani.pk/uploads/reviews/photos/original/45/9d/16/LIVE-EXPRESS-NEWS-30-1457464500.jpg'
    },
    {
        id: 'ch1',
        name: 'PTV News',
        icon: 'ios-volume-low',
        tags: ['channels'],
        count: 133,
        image: require('../assets/icons/ptv-news.jpg'),
        cmd : 'PLAY http://67.231.248.131:1935/live/PTVnews/chunklist_w1281891626.m3u8 http://www.gharana.pk/wp-content/uploads/2017/10/PTV-News-Live-HD-Streaming-24x7-LIVE-HD-GharanaPK.jpg'
    },

];

export {
    channels,
};
