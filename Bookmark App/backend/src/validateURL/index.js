const AWS = require('aws-sdk');

exports.handler = async message => {
  
  let bookmark = message;
  try {
      //var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      var regex = /[(?:(?:https?|ftp):\/\/)?a-zA-Z0-9@:%._\+~#=]{2,256}.(com|org|edu|mil|gov|net|info)/;
      console.log("bookmark is "+bookmark);
      const bookmarkDetails = JSON.stringify(bookmark);
      console.log("bookmarkDetails are "+bookmarkDetails);
      const bookmarkItem = JSON.parse(bookmarkDetails);
      console.log(bookmarkItem.detail.payload.bookmarkUrl.S);
      if(!regex.test(bookmarkItem.detail.payload.bookmarkUrl.S))
      {
        return "Invalid";
      }
      else
        return "Valid";
    } catch (err) {
     console.log(err);
    }
  };
