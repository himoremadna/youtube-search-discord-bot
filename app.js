const ytSearch = require( 'yt-search' );
const Discord = require('discord.js');
const client = new Discord.Client();

var r1_data;
var r2_data;
var r3_data;
var r4_data;
var r5_data;

var isListening = false;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('YOUR_TOKEN_GOES_HERE');

client.on('message', msg => {
  if(msg.content === ('.youtube')){
    let specifyEmbed = new Discord.RichEmbed()
			.setColor('#ff0000')
			.setTitle(":raised_back_of_hand: Please specify a search query!");
		return msg.channel.send(specifyEmbed);
  }
  if(!msg.content.startsWith('.youtube')) return;
  var search_query = msg.content.replace('.youtube', '');
  ytSearch(search_query, function ( err, r) {
    if (err) throw err;
    const videos = r.videos;
    r1_data = videos[0];
    r2_data = videos[1];
    r3_data = videos[2];
    r4_data = videos[3];
    r5_data = videos[4];
    let resultsEmbed = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle(":point_right: Here are the found results!")
      .setDescription('Enter the video number to get your video link.')
      .addField(`[1] ${r1_data["title"]}`, `:eye: ${r1_data["views"]}.`, false)
      .addField(`[2] ${r2_data["title"]}`, `:eye: ${r2_data["views"]}.`, false)
      .addField(`[3] ${r3_data["title"]}`, `:eye: ${r3_data["views"]}.`, false)
      .addField(`[4] ${r4_data["title"]}`, `:eye: ${r4_data["views"]}.`, false)
      .addField(`[5] ${r5_data["title"]}`, `:eye: ${r5_data["views"]}.`, false);
    msg.channel.send(resultsEmbed);
    isListening = true;
  })
});
client.on('message', msg => {
  if(isListening){
    switch (msg.content) {
      case '1':
        isListening = false;
        var video_link = "https://www.youtube.com" + r1_data["url"];
    		msg.channel.send(video_link);
        break;
      case '2':
        isListening = false;
        var video_link = "https://www.youtube.com" + r2_data["url"];
      	msg.channel.send(video_link);
        break;
      case '3':
        isListening = false;
        var video_link = "https://www.youtube.com" + r3_data["url"];
      	msg.channel.send(video_link);
        break;
      case '4':
        isListening = false;
        var video_link = "https://www.youtube.com" + r4_data["url"];
      	msg.channel.send(video_link);
        break;
      case '5':
        isListening = false;
        var video_link = "https://www.youtube.com" + r5_data["url"];
      	msg.channel.send(video_link);
        break;
    }
  }
})
